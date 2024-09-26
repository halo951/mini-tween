import type { EasingFunctionGroup } from '../types'

export const Exponential = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return amount === 0 ? 0 : Math.pow(1024, amount - 1)
    },
    Out(amount: number): number {
        return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount)
    },
    InOut(amount: number): number {
        if (amount === 0) {
            return 0
        }

        if (amount === 1) {
            return 1
        }

        if ((amount *= 2) < 1) {
            return 0.5 * Math.pow(1024, amount - 1)
        }

        return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2)
    }
})
