const Factorial: (n: number) => number = (() => {
    const a: Array<number> = [1]

    return (n: number): number => {
        let s = 1

        if (a[n]) {
            return a[n]
        }

        for (let i = n; i > 1; i--) {
            s *= i
        }

        a[n] = s
        return s
    }
})()

const Bernstein = (n: number, i: number): number => {
    return Factorial(n) / Factorial(i) / Factorial(n - i)
}

export const Bezier = (v: number[], k: number): number => {
    let b: number = 0
    const n: number = v.length - 1
    const pw = Math.pow

    for (let i: number = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * Bernstein(n, i)
    }

    return b
}
