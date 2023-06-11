
export default function loadParallel() {
    if (!window.Worker) throw new Error('Parallel is not supported in this browser')
    const workerScript = `
        onmessage = (event) => {
            const fn =  eval(event.data.func)
            postMessage(fn(event.data.arg))
        }`
    try {
        var bb = new Blob([workerScript], {type: "mimeString"});
    } catch (e) {
        console.log(e)
        // The BlobBuilder API has been deprecated in favour of Blob, but older
        // browsers don't know about the Blob constructor
        // IE10 also supports BlobBuilder, but since the `Blob` constructor
        //  also works, there's no need to add `MSBlobBuilder`.
        var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(workerScript);
        bb = bb.getBlob()
    }
    const workerUrl = window.webkitURL || window.URL;
    return (fn, time) => {
        return (argArray) => {
            const result = []
            let count = 0
            return new Promise((res, rej) => {
                setTimeout(() => rej('Time Limit Exceeded'), time)
                for (let index = 0; index < argArray.length; index++) {
                    const worker = new Worker(workerUrl.createObjectURL(bb));
                    worker.postMessage({ func: fn.toString(), arg: argArray[index], index: index })
                    worker.onmessage = (event) => {
                        result[index] = event.data;
                        count++
                        if (count === argArray.length) {
                            res(result)
                        }
                    }
                }
        

            })
        }
    }
}