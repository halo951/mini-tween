"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fn$1 = (p0, p1, t) => {
  return (p1 - p0) * t + p0;
};
const Linear$1 = (v, k) => {
  const m = v.length - 1;
  const f = m * k;
  const i = Math.floor(f);
  if (k < 0) {
    return fn$1(v[0], v[1], f);
  }
  if (k > 1) {
    return fn$1(v[m], v[m - 1], m - f);
  }
  return fn$1(v[i], v[i + 1 > m ? m : i + 1], f - i);
};
const Linear = Object.freeze({
  None(amount) {
    return amount;
  },
  In(amount) {
    return amount;
  },
  Out(amount) {
    return amount;
  },
  InOut(amount) {
    return amount;
  }
});
const now = () => performance.now();
class Tween {
  _isPaused = false;
  _pauseStart = 0;
  _valuesStart = {};
  _valuesEnd = {};
  _valuesStartRepeat = {};
  _duration = 1e3;
  _isDynamic = false;
  _initialRepeat = 0;
  _repeat = 0;
  _repeatDelayTime;
  _yoyo = false;
  _isPlaying = false;
  _reversed = false;
  _delayTime = 0;
  _startTime = 0;
  _easingFunction = Linear.None;
  _interpolationFunction = Linear$1;
  _chainedTweens = [];
  _onStartCallback;
  _onStartCallbackFired = false;
  _onEveryStartCallback;
  _onEveryStartCallbackFired = false;
  _onUpdateCallback;
  _onRepeatCallback;
  _onCompleteCallback;
  _onStopCallback;
  _isChainStopped = false;
  _propertiesAreSetUp = false;
  _object;
  /**
   * @param object - The object whose properties this Tween will animate.
   */
  constructor(object) {
    this._object = object;
  }
  isPlaying() {
    return this._isPlaying;
  }
  isPaused() {
    return this._isPaused;
  }
  getDuration() {
    return this._duration;
  }
  to(target, duration = 1e3) {
    if (this._isPlaying)
      throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
    this._valuesEnd = target;
    this._propertiesAreSetUp = false;
    this._duration = duration < 0 ? 0 : duration;
    return this;
  }
  duration(duration = 1e3) {
    this._duration = duration < 0 ? 0 : duration;
    return this;
  }
  dynamic(dynamic = false) {
    this._isDynamic = dynamic;
    return this;
  }
  start(time = now(), overrideStartingValues = false) {
    if (this._isPlaying) {
      return this;
    }
    this._repeat = this._initialRepeat;
    if (this._reversed) {
      this._reversed = false;
      for (const property in this._valuesStartRepeat) {
        this._swapEndStartRepeatValues(property);
        this._valuesStart[property] = this._valuesStartRepeat[property];
      }
    }
    this._isPlaying = true;
    this._isPaused = false;
    this._onStartCallbackFired = false;
    this._onEveryStartCallbackFired = false;
    this._isChainStopped = false;
    this._startTime = time;
    this._startTime += this._delayTime;
    if (!this._propertiesAreSetUp || overrideStartingValues) {
      this._propertiesAreSetUp = true;
      if (!this._isDynamic) {
        const tmp = {};
        for (const prop in this._valuesEnd) tmp[prop] = this._valuesEnd[prop];
        this._valuesEnd = tmp;
      }
      this._setupProperties(
        this._object,
        this._valuesStart,
        this._valuesEnd,
        this._valuesStartRepeat,
        overrideStartingValues
      );
    }
    return this;
  }
  startFromCurrentValues(time) {
    return this.start(time, true);
  }
  _setupProperties(_object, _valuesStart, _valuesEnd, _valuesStartRepeat, overrideStartingValues) {
    for (const property in _valuesEnd) {
      const startValue = _object[property];
      const startValueIsArray = Array.isArray(startValue);
      const propType = startValueIsArray ? "array" : typeof startValue;
      let isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
      if (propType === "undefined" || propType === "function") {
        continue;
      }
      if (isInterpolationList) {
        const endValues = _valuesEnd[property];
        if (endValues.length === 0) {
          continue;
        }
        const temp = [startValue];
        for (let i = 0, l = endValues.length; i < l; i += 1) {
          const value = this._handleRelativeValue(startValue, endValues[i]);
          if (isNaN(value)) {
            isInterpolationList = false;
            console.warn("Found invalid interpolation list. Skipping.");
            break;
          }
          temp.push(value);
        }
        if (isInterpolationList) {
          _valuesEnd[property] = temp;
        }
      }
      if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
        _valuesStart[property] = startValueIsArray ? [] : {};
        const nestedObject = startValue;
        for (const prop in nestedObject) {
          _valuesStart[property][prop] = nestedObject[prop];
        }
        _valuesStartRepeat[property] = startValueIsArray ? [] : {};
        let endValues = _valuesEnd[property];
        if (!this._isDynamic) {
          const tmp = {};
          for (const prop in endValues) tmp[prop] = endValues[prop];
          _valuesEnd[property] = endValues = tmp;
        }
        this._setupProperties(
          nestedObject,
          _valuesStart[property],
          endValues,
          _valuesStartRepeat[property],
          overrideStartingValues
        );
      } else {
        if (typeof _valuesStart[property] === "undefined" || overrideStartingValues) {
          _valuesStart[property] = startValue;
        }
        if (!startValueIsArray) {
          _valuesStart[property] *= 1;
        }
        if (isInterpolationList) {
          _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
        } else {
          _valuesStartRepeat[property] = _valuesStart[property] || 0;
        }
      }
    }
  }
  stop() {
    if (!this._isChainStopped) {
      this._isChainStopped = true;
      this.stopChainedTweens();
    }
    if (!this._isPlaying) {
      return this;
    }
    this._isPlaying = false;
    this._isPaused = false;
    if (this._onStopCallback) {
      this._onStopCallback(this._object);
    }
    return this;
  }
  end() {
    this._goToEnd = true;
    this.update(this._startTime + this._duration);
    return this;
  }
  pause(time = now()) {
    if (this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = true;
    this._pauseStart = time;
    return this;
  }
  /** 恢复 */
  resume(time = now()) {
    if (!this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = false;
    this._startTime += time - this._pauseStart;
    this._pauseStart = 0;
    return this;
  }
  stopChainedTweens() {
    for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }
    return this;
  }
  delay(amount = 0) {
    this._delayTime = amount;
    return this;
  }
  repeat(times = 0) {
    this._initialRepeat = times;
    this._repeat = times;
    return this;
  }
  repeatDelay(amount) {
    this._repeatDelayTime = amount;
    return this;
  }
  yoyo(yoyo = false) {
    this._yoyo = yoyo;
    return this;
  }
  easing(easingFunction = Linear.None) {
    this._easingFunction = easingFunction;
    return this;
  }
  interpolation(interpolationFunction = Linear$1) {
    this._interpolationFunction = interpolationFunction;
    return this;
  }
  // eslint-disable-next-line
  chain(...tweens) {
    this._chainedTweens = tweens;
    return this;
  }
  onStart(callback) {
    this._onStartCallback = callback;
    return this;
  }
  onEveryStart(callback) {
    this._onEveryStartCallback = callback;
    return this;
  }
  onUpdate(callback) {
    this._onUpdateCallback = callback;
    return this;
  }
  onRepeat(callback) {
    this._onRepeatCallback = callback;
    return this;
  }
  onComplete(callback) {
    this._onCompleteCallback = callback;
    return this;
  }
  onStop(callback) {
    this._onStopCallback = callback;
    return this;
  }
  _goToEnd = false;
  /**
   * @returns true if the tween is still playing after the update, false
   * otherwise (calling update on a paused tween still returns true because
   * it is still playing, just paused).x
   */
  update(time = now()) {
    if (this._isPaused) return true;
    let property;
    if (!this._goToEnd && !this._isPlaying) {
      return false;
    }
    this._goToEnd = false;
    if (time < this._startTime) {
      return true;
    }
    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback) {
        this._onStartCallback(this._object);
      }
      this._onStartCallbackFired = true;
    }
    if (this._onEveryStartCallbackFired === false) {
      if (this._onEveryStartCallback) {
        this._onEveryStartCallback(this._object);
      }
      this._onEveryStartCallbackFired = true;
    }
    const elapsedTime = time - this._startTime;
    const durationAndDelay = this._duration + (this._repeatDelayTime ?? this._delayTime);
    const totalTime = this._duration + this._repeat * durationAndDelay;
    const calculateElapsedPortion = () => {
      if (this._duration === 0) return 1;
      if (elapsedTime > totalTime) {
        return 1;
      }
      const timesRepeated = Math.trunc(elapsedTime / durationAndDelay);
      const timeIntoCurrentRepeat = elapsedTime - timesRepeated * durationAndDelay;
      const portion = Math.min(timeIntoCurrentRepeat / this._duration, 1);
      if (portion === 0 && elapsedTime === this._duration) {
        return 1;
      }
      return portion;
    };
    const elapsed = calculateElapsedPortion();
    const value = this._easingFunction(elapsed);
    this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
    if (this._onUpdateCallback) {
      this._onUpdateCallback(this._object, elapsed);
    }
    if (this._duration === 0 || elapsedTime >= this._duration) {
      if (this._repeat > 0) {
        const completeCount = Math.min(
          Math.trunc((elapsedTime - this._duration) / durationAndDelay) + 1,
          this._repeat
        );
        if (isFinite(this._repeat)) {
          this._repeat -= completeCount;
        }
        for (property in this._valuesStartRepeat) {
          if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
            this._valuesStartRepeat[property] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }
          if (this._yoyo) {
            this._swapEndStartRepeatValues(property);
          }
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
        if (this._yoyo) {
          this._reversed = !this._reversed;
        }
        this._startTime += durationAndDelay * completeCount;
        if (this._onRepeatCallback) {
          this._onRepeatCallback(this._object);
        }
        this._onEveryStartCallbackFired = false;
        return true;
      } else {
        if (this._onCompleteCallback) {
          this._onCompleteCallback(this._object);
        }
        for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].start(this._startTime + this._duration, false);
        }
        this._isPlaying = false;
        return false;
      }
    }
    return true;
  }
  _updateProperties(_object, _valuesStart, _valuesEnd, value) {
    for (const property in _valuesEnd) {
      if (_valuesStart[property] === void 0) {
        continue;
      }
      const start = _valuesStart[property] || 0;
      let end = _valuesEnd[property];
      const startIsArray = Array.isArray(_object[property]);
      const endIsArray = Array.isArray(end);
      const isInterpolationList = !startIsArray && endIsArray;
      if (isInterpolationList) {
        _object[property] = this._interpolationFunction(end, value);
      } else if (typeof end === "object" && end) {
        this._updateProperties(_object[property], start, end, value);
      } else {
        end = this._handleRelativeValue(start, end);
        if (typeof end === "number") {
          _object[property] = start + (end - start) * value;
        }
      }
    }
  }
  _handleRelativeValue(start, end) {
    if (typeof end !== "string") {
      return end;
    }
    if (end.charAt(0) === "+" || end.charAt(0) === "-") {
      return start + parseFloat(end);
    }
    return parseFloat(end);
  }
  _swapEndStartRepeatValues(property) {
    const tmp = this._valuesStartRepeat[property];
    const endValue = this._valuesEnd[property];
    if (typeof endValue === "string") {
      this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
    } else {
      this._valuesStartRepeat[property] = this._valuesEnd[property];
    }
    this._valuesEnd[property] = tmp;
  }
}
const Back = Object.freeze({
  In(amount) {
    const s = 1.70158;
    return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
  },
  Out(amount) {
    const s = 1.70158;
    return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
  },
  InOut(amount) {
    const s = 1.70158 * 1.525;
    if ((amount *= 2) < 1) {
      return 0.5 * (amount * amount * ((s + 1) * amount - s));
    }
    return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
  }
});
const Bounce = Object.freeze({
  In(amount) {
    return 1 - Bounce.Out(1 - amount);
  },
  Out(amount) {
    if (amount < 1 / 2.75) {
      return 7.5625 * amount * amount;
    } else if (amount < 2 / 2.75) {
      return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
    } else if (amount < 2.5 / 2.75) {
      return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
    } else {
      return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
    }
  },
  InOut(amount) {
    if (amount < 0.5) {
      return Bounce.In(amount * 2) * 0.5;
    }
    return Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
  }
});
const Circular = Object.freeze({
  In(amount) {
    return 1 - Math.sqrt(1 - amount * amount);
  },
  Out(amount) {
    return Math.sqrt(1 - --amount * amount);
  },
  InOut(amount) {
    if ((amount *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
  }
});
const Cubic = Object.freeze({
  In(amount) {
    return amount * amount * amount;
  },
  Out(amount) {
    return --amount * amount * amount + 1;
  },
  InOut(amount) {
    if ((amount *= 2) < 1) {
      return 0.5 * amount * amount * amount;
    }
    return 0.5 * ((amount -= 2) * amount * amount + 2);
  }
});
const Elastic = Object.freeze({
  In(amount) {
    if (amount === 0) {
      return 0;
    }
    if (amount === 1) {
      return 1;
    }
    return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
  },
  Out(amount) {
    if (amount === 0) {
      return 0;
    }
    if (amount === 1) {
      return 1;
    }
    return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
  },
  InOut(amount) {
    if (amount === 0) {
      return 0;
    }
    if (amount === 1) {
      return 1;
    }
    amount *= 2;
    if (amount < 1) {
      return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
  }
});
const Exponential = Object.freeze({
  In(amount) {
    return amount === 0 ? 0 : Math.pow(1024, amount - 1);
  },
  Out(amount) {
    return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
  },
  InOut(amount) {
    if (amount === 0) {
      return 0;
    }
    if (amount === 1) {
      return 1;
    }
    if ((amount *= 2) < 1) {
      return 0.5 * Math.pow(1024, amount - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
  }
});
const generatePow = (power = 4) => {
  power = power < Number.EPSILON ? Number.EPSILON : power;
  power = power > 1e4 ? 1e4 : power;
  return {
    In(amount) {
      return amount ** power;
    },
    Out(amount) {
      return 1 - (1 - amount) ** power;
    },
    InOut(amount) {
      if (amount < 0.5) {
        return (amount * 2) ** power / 2;
      }
      return (1 - (2 - amount * 2) ** power) / 2 + 0.5;
    }
  };
};
const Quadratic = Object.freeze({
  In(amount) {
    return amount * amount;
  },
  Out(amount) {
    return amount * (2 - amount);
  },
  InOut(amount) {
    if ((amount *= 2) < 1) {
      return 0.5 * amount * amount;
    }
    return -0.5 * (--amount * (amount - 2) - 1);
  }
});
const Quartic = Object.freeze({
  In(amount) {
    return amount * amount * amount * amount;
  },
  Out(amount) {
    return 1 - --amount * amount * amount * amount;
  },
  InOut(amount) {
    if ((amount *= 2) < 1) {
      return 0.5 * amount * amount * amount * amount;
    }
    return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
  }
});
const Quintic = Object.freeze({
  In(amount) {
    return amount * amount * amount * amount * amount;
  },
  Out(amount) {
    return --amount * amount * amount * amount * amount + 1;
  },
  InOut(amount) {
    if ((amount *= 2) < 1) {
      return 0.5 * amount * amount * amount * amount * amount;
    }
    return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
  }
});
const Sinusoidal = Object.freeze({
  In(amount) {
    return 1 - Math.sin((1 - amount) * Math.PI / 2);
  },
  Out(amount) {
    return Math.sin(amount * Math.PI / 2);
  },
  InOut(amount) {
    return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
  }
});
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Back,
  Bounce,
  Circular,
  Cubic,
  Elastic,
  Exponential,
  Linear,
  Quadratic,
  Quartic,
  Quintic,
  Sinusoidal,
  generatePow
}, Symbol.toStringTag, { value: "Module" }));
const Factorial = /* @__PURE__ */ (() => {
  const a = [1];
  return (n) => {
    let s = 1;
    if (a[n]) {
      return a[n];
    }
    for (let i = n; i > 1; i--) {
      s *= i;
    }
    a[n] = s;
    return s;
  };
})();
const Bernstein = (n, i) => {
  return Factorial(n) / Factorial(i) / Factorial(n - i);
};
const Bezier = (v, k) => {
  let b = 0;
  const n = v.length - 1;
  const pw = Math.pow;
  for (let i = 0; i <= n; i++) {
    b += pw(1 - k, n - i) * pw(k, i) * v[i] * Bernstein(n, i);
  }
  return b;
};
const fn = (p0, p1, p2, p3, t) => {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
};
const CatmullRom = (v, k) => {
  const m = v.length - 1;
  let f = m * k;
  let i = Math.floor(f);
  if (v[0] === v[m]) {
    if (k < 0) {
      i = Math.floor(f = m * (1 + k));
    }
    return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
  } else {
    if (k < 0) {
      return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
    }
    if (k > 1) {
      return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
    }
    return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
  }
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bezier,
  CatmullRom,
  Linear: Linear$1
}, Symbol.toStringTag, { value: "Module" }));
exports.Easing = index$1;
exports.Interpolation = index;
exports.Tween = Tween;
//# sourceMappingURL=index.js.map
