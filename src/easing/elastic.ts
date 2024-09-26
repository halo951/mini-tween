import type { EasingFunctionGroup } from '../types'

export const Elastic = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        if (amount === 0) {
            return 0
        }

        if (amount === 1) {
            return 1
        }

        return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI)
    },
    Out(amount: number): number {
        if (amount === 0) {
            return 0
        }

        if (amount === 1) {
            return 1
        }
        return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1
    },
    InOut(amount: number): number {
        if (amount === 0) {
            return 0
        }

        if (amount === 1) {
            return 1
        }

        amount *= 2

        if (amount < 1) {
            return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI)
        }

        return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1
    }
})
