import type { EasingFunctionGroup } from '../types'

/** 缓动函数: 弹跳 */
export const Bounce = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return 1 - Bounce.Out(1 - amount)
    },
    Out(amount: number): number {
        if (amount < 1 / 2.75) {
            return 7.5625 * amount * amount
        } else if (amount < 2 / 2.75) {
            return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75
        } else if (amount < 2.5 / 2.75) {
            return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375
        } else {
            return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375
        }
    },
    InOut(amount: number): number {
        if (amount < 0.5) {
            return Bounce.In(amount * 2) * 0.5
        }
        return Bounce.Out(amount * 2 - 1) * 0.5 + 0.5
    }
})
