type EasingFunction = (amount: number) => number;
type EasingFunctionGroup = {
    In: EasingFunction;
    Out: EasingFunction;
    InOut: EasingFunction;
};
type UnknownProps = Record<string, any>;
/**
 *
 */
type InterpolationFunction = (v: number[], k: number) => number;

export type { EasingFunctionGroup as E, InterpolationFunction as I, UnknownProps as U, EasingFunction as a };
