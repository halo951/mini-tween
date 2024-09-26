import type { EasingFunctionGroup } from '../types'

export const Sinusoidal = Object.freeze(<EasingFunctionGroup>{
    In(amount: number): number {
        return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2)
    },
    Out(amount: number): number {
        return Math.sin((amount * Math.PI) / 2)
    },
    InOut(amount: number): number {
        return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)))
    }
})
