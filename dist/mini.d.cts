/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
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
declare class Tween<T extends UnknownProps = any> {
    private _isPaused;
    private _pauseStart;
    private _valuesStart;
    private _valuesEnd;
    private _valuesStartRepeat;
    private _duration;
    private _isDynamic;
    private _initialRepeat;
    private _repeat;
    private _repeatDelayTime?;
    private _yoyo;
    private _isPlaying;
    private _reversed;
    private _delayTime;
    private _startTime;
    private _easingFunction;
    private _interpolationFunction;
    private _chainedTweens;
    private _onStartCallback?;
    private _onStartCallbackFired;
    private _onEveryStartCallback?;
    private _onEveryStartCallbackFired;
    private _onUpdateCallback?;
    private _onRepeatCallback?;
    private _onCompleteCallback?;
    private _onStopCallback?;
    private _isChainStopped;
    private _propertiesAreSetUp;
    private _object;
    /**
     * @param object - The object whose properties this Tween will animate.
     */
    constructor(object: T);
    isPlaying(): boolean;
    isPaused(): boolean;
    getDuration(): number;
    to(target: UnknownProps, duration?: number): this;
    duration(duration?: number): this;
    dynamic(dynamic?: boolean): this;
    start(time?: number, overrideStartingValues?: boolean): this;
    startFromCurrentValues(time?: number): this;
    private _setupProperties;
    stop(): this;
    end(): this;
    pause(time?: number): this;
    /** 恢复 */
    resume(time?: number): this;
    stopChainedTweens(): this;
    delay(amount?: number): this;
    repeat(times?: number): this;
    repeatDelay(amount?: number): this;
    yoyo(yoyo?: boolean): this;
    easing(easingFunction?: EasingFunction): this;
    interpolation(interpolationFunction?: InterpolationFunction): this;
    chain(...tweens: Array<Tween<any>>): this;
    onStart(callback?: (object: T) => void): this;
    onEveryStart(callback?: (object: T) => void): this;
    onUpdate(callback?: (object: T, elapsed: number) => void): this;
    onRepeat(callback?: (object: T) => void): this;
    onComplete(callback?: (object: T) => void): this;
    onStop(callback?: (object: T) => void): this;
    private _goToEnd;
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).x
     */
    update(time?: number): boolean;
    private _updateProperties;
    private _handleRelativeValue;
    private _swapEndStartRepeatValues;
}

export { type EasingFunction, type EasingFunctionGroup, type InterpolationFunction, Tween, type UnknownProps };
