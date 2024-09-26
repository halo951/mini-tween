import type { EasingFunctionGroup } from '../types'

export const Cubic = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return amount * amount * amount
    },
    Out(amount: number): number {
        return --amount * amount * amount + 1
    },
    InOut(amount: number): number {
        if ((amount *= 2) < 1) {
            return 0.5 * amount * amount * amount
        }
        return 0.5 * ((amount -= 2) * amount * amount + 2)
    }
})
