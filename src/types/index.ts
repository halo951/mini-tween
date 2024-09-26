export type EasingFunction = (amount: number) => number

export type EasingFunctionGroup = {
    In: EasingFunction
    Out: EasingFunction
    InOut: EasingFunction
}

export type UnknownProps = Record<string, any>

/**
 *
 */
export type InterpolationFunction = (v: number[], k: number) => number
