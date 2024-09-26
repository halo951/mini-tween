import type { EasingFunctionGroup } from '../types'

export const Quadratic = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return amount * amount
    },
    Out(amount: number): number {
        return amount * (2 - amount)
    },
    InOut(amount: number): number {
        if ((amount *= 2) < 1) {
            return 0.5 * amount * amount
        }

        return -0.5 * (--amount * (amount - 2) - 1)
    }
})
