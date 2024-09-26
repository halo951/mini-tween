import type { EasingFunction, EasingFunctionGroup } from '../types'

export const Linear = Object.freeze<EasingFunctionGroup & { None: EasingFunction }>({
    None(amount: number): number {
        return amount
    },
    In(amount: number): number {
        return amount
    },
    Out(amount: number): number {
        return amount
    },
    InOut(amount: number): number {
        return amount
    }
})
