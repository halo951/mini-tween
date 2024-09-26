import type { EasingFunctionGroup } from '../types'

export const Back = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        const s = 1.70158
        return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s)
    },
    Out(amount: number): number {
        const s = 1.70158
        return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1
    },
    InOut(amount: number): number {
        const s = 1.70158 * 1.525
        if ((amount *= 2) < 1) {
            return 0.5 * (amount * amount * ((s + 1) * amount - s))
        }
        return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2)
    }
})
