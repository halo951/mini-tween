import type { EasingFunctionGroup } from '../types'

export const Quartic = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return amount * amount * amount * amount
    },
    Out(amount: number): number {
        return 1 - --amount * amount * amount * amount
    },
    InOut(amount: number): number {
        if ((amount *= 2) < 1) {
            return 0.5 * amount * amount * amount * amount
        }

        return -0.5 * ((amount -= 2) * amount * amount * amount - 2)
    }
})
