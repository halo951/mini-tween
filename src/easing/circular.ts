import type { EasingFunctionGroup } from '../types'

export const Circular = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return 1 - Math.sqrt(1 - amount * amount)
    },
    Out(amount: number): number {
        return Math.sqrt(1 - --amount * amount)
    },
    InOut(amount: number): number {
        if ((amount *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - amount * amount) - 1)
        }
        return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1)
    }
})
