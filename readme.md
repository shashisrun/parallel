
# Parallel

Recently while browsing through the web, I came across a linux command line utility called Parallel (https://github.com/martinda/gnu-parallel) and I fell in love with the concept writting your code to perform the best in single thread and allowing parallel to run it parallely with their arguments passed as an array.

So being web dveloper, I know we have Web Worker (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), but not every one is familiar with and to be frank setting up worker is little tricky for new comers and therefore I thought to replicate the concept of parallel but in browser, let me show how easy it has become to run your code parallely now ;)

```
<script type="module">
    <!--  Our first task is to import parallel in our code base -->
    import loadParallel from './src/index.js'

    <!-- The function which is going to runn parallely -->
    const fn  = (arg) => {
        return arg * arg
    }
    <!-- Onload of Parallel it checks the browser compatibility
        and loads few scrips in the broswer -->
    const parallel = loadParallel()

    <!--  The above returned function takes two parameters
            fn -> the function as argument and time -> as second argument
            this is to ensure never this threads can only run till this time
            and the function return our function in paralleled version -->
    const paralleledFunction = parallel(fn, 500)

    <!-- paralleledFunction run as normal function but intead
        of result it returns a promise!  -->
    paralleledFunction([1,2,3,4,5]).then((result) => {

        <!-- In the then block it will have all results in sequential
            manner as the array provided -->
        console.log(result)

    }).catch((err) => {
        
        <!-- Or may be the time has catched up! -->
        console.log(err)
    });

</script>

```

Contribution of ideas and code are welcomed!.