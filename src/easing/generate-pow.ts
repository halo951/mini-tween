import type { EasingFunctionGroup } from '../types'

/** 该函数返回一个包含三个缓动函数的对象，这些函数用于实现指数缓动效果 */
export const generatePow = (power: number = 4): EasingFunctionGroup => {
    power = power < Number.EPSILON ? Number.EPSILON : power
    power = power > 10000 ? 10000 : power
    return {
        In(amount: number): number {
            return amount ** power
        },
        Out(amount: number): number {
            return 1 - (1 - amount) ** power
        },
        InOut(amount: number): number {
            if (amount < 0.5) {
                return (amount * 2) ** power / 2
            }
            return (1 - (2 - amount * 2) ** power) / 2 + 0.5
        }
    }
}
