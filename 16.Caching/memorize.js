const memoFib = memoize((n) => {
    if (n < 2) {
        return n
    }
    return memoFib(n - 1) + memoFib(n - 2)
})

function memoize(fn) {
    const cache = {}
    return (n) => {
        if (cache[n] === undefined) {
                cache[n] = fn(n)
        }
        return cache[n]
    }
}
console.log(memoFib(6))