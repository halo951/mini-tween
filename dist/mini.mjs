import{Linear as v}from"./interpolation/linear.mjs";import{Linear as C}from"./easing/linear.mjs";var f=Object.defineProperty,m=(d,t,i)=>t in d?f(d,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[t]=i,e=(d,t,i)=>(m(d,typeof t!="symbol"?t+"":t,i),i);const S=()=>performance.now();class k{constructor(t){e(this,"_isPaused",!1),e(this,"_pauseStart",0),e(this,"_valuesStart",{}),e(this,"_valuesEnd",{}),e(this,"_valuesStartRepeat",{}),e(this,"_duration",1e3),e(this,"_isDynamic",!1),e(this,"_initialRepeat",0),e(this,"_repeat",0),e(this,"_repeatDelayTime"),e(this,"_yoyo",!1),e(this,"_isPlaying",!1),e(this,"_reversed",!1),e(this,"_delayTime",0),e(this,"_startTime",0),e(this,"_easingFunction",C.None),e(this,"_interpolationFunction",v),e(this,"_chainedTweens",[]),e(this,"_onStartCallback"),e(this,"_onStartCallbackFired",!1),e(this,"_onEveryStartCallback"),e(this,"_onEveryStartCallbackFired",!1),e(this,"_onUpdateCallback"),e(this,"_onRepeatCallback"),e(this,"_onCompleteCallback"),e(this,"_onStopCallback"),e(this,"_isChainStopped",!1),e(this,"_propertiesAreSetUp",!1),e(this,"_object"),e(this,"_goToEnd",!1),this._object=t}isPlaying(){return this._isPlaying}isPaused(){return this._isPaused}getDuration(){return this._duration}to(t,i=1e3){if(this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=t,this._propertiesAreSetUp=!1,this._duration=i<0?0:i,this}duration(t=1e3){return this._duration=t<0?0:t,this}dynamic(t=!1){return this._isDynamic=t,this}start(t=S(),i=!1){if(this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(const s in this._valuesStartRepeat)this._swapEndStartRepeatValues(s),this._valuesStart[s]=this._valuesStartRepeat[s]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=t,this._startTime+=this._delayTime,!this._propertiesAreSetUp||i){if(this._propertiesAreSetUp=!0,!this._isDynamic){const s={};for(const n in this._valuesEnd)s[n]=this._valuesEnd[n];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,i)}return this}startFromCurrentValues(t){return this.start(t,!0)}_setupProperties(t,i,s,n,o){for(const a in s){const r=t[a],h=Array.isArray(r),_=h?"array":typeof r;let u=!h&&Array.isArray(s[a]);if(!(_==="undefined"||_==="function")){if(u){const p=s[a];if(p.length===0)continue;const c=[r];for(let l=0,y=p.length;l<y;l+=1){const b=this._handleRelativeValue(r,p[l]);if(isNaN(b)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}c.push(b)}u&&(s[a]=c)}if((_==="object"||h)&&r&&!u){i[a]=h?[]:{};const p=r;for(const l in p)i[a][l]=p[l];n[a]=h?[]:{};let c=s[a];if(!this._isDynamic){const l={};for(const y in c)l[y]=c[y];s[a]=c=l}this._setupProperties(p,i[a],c,n[a],o)}else(typeof i[a]>"u"||o)&&(i[a]=r),h||(i[a]*=1),u?n[a]=s[a].slice().reverse():n[a]=i[a]||0}}}stop(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this}end(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this}pause(t=S()){return this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=t,this)}resume(t=S()){return!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this)}stopChainedTweens(){for(let t=0,i=this._chainedTweens.length;t<i;t++)this._chainedTweens[t].stop();return this}delay(t=0){return this._delayTime=t,this}repeat(t=0){return this._initialRepeat=t,this._repeat=t,this}repeatDelay(t){return this._repeatDelayTime=t,this}yoyo(t=!1){return this._yoyo=t,this}easing(t=C.None){return this._easingFunction=t,this}interpolation(t=v){return this._interpolationFunction=t,this}chain(...t){return this._chainedTweens=t,this}onStart(t){return this._onStartCallback=t,this}onEveryStart(t){return this._onEveryStartCallback=t,this}onUpdate(t){return this._onUpdateCallback=t,this}onRepeat(t){return this._onRepeatCallback=t,this}onComplete(t){return this._onCompleteCallback=t,this}onStop(t){return this._onStopCallback=t,this}update(t=S()){if(this._isPaused)return!0;let i;if(!this._goToEnd&&!this._isPlaying)return!1;if(this._goToEnd=!1,t<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);const s=t-this._startTime,n=this._duration+(this._repeatDelayTime??this._delayTime),o=this._duration+this._repeat*n,a=(()=>{if(this._duration===0||s>o)return 1;const h=Math.trunc(s/n),_=s-h*n,u=Math.min(_/this._duration,1);return u===0&&s===this._duration?1:u})(),r=this._easingFunction(a);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,r),this._onUpdateCallback&&this._onUpdateCallback(this._object,a),this._duration===0||s>=this._duration)if(this._repeat>0){const h=Math.min(Math.trunc((s-this._duration)/n)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=h);for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=n*h,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(let h=0,_=this._chainedTweens.length;h<_;h++)this._chainedTweens[h].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0}_updateProperties(t,i,s,n){for(const o in s){if(i[o]===void 0)continue;const a=i[o]||0;let r=s[o];const h=Array.isArray(t[o]),_=Array.isArray(r);!h&&_?t[o]=this._interpolationFunction(r,n):typeof r=="object"&&r?this._updateProperties(t[o],a,r,n):(r=this._handleRelativeValue(a,r),typeof r=="number"&&(t[o]=a+(r-a)*n))}}_handleRelativeValue(t,i){return typeof i!="string"?i:i.charAt(0)==="+"||i.charAt(0)==="-"?t+parseFloat(i):parseFloat(i)}_swapEndStartRepeatValues(t){const i=this._valuesStartRepeat[t],s=this._valuesEnd[t];typeof s=="string"?this._valuesStartRepeat[t]=this._valuesStartRepeat[t]+parseFloat(s):this._valuesStartRepeat[t]=this._valuesEnd[t],this._valuesEnd[t]=i}}export{k as Tween};
