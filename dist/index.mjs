import{Linear as S}from"./interpolation/linear.mjs";import{Linear as f}from"./easing/linear.mjs";const y=()=>performance.now();var R=Object.defineProperty,A=(o,t,e)=>t in o?R(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,g=(o,t,e)=>(A(o,typeof t!="symbol"?t+"":t,e),e);class m{constructor(...t){g(this,"_tweens",{}),g(this,"_tweensAddedDuringUpdate",{}),this.add(...t)}getAll(){return Object.keys(this._tweens).map(t=>this._tweens[t])}removeAll(){this._tweens={}}add(...t){for(const e of t)e._group?.remove(e),e._group=this,this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e}remove(...t){for(const e of t)e._group=void 0,delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]}allStopped(){return this.getAll().every(t=>!t.isPlaying())}update(t=y(),e=!0){let i=Object.keys(this._tweens);if(i.length!==0)for(;i.length>0;){this._tweensAddedDuringUpdate={};for(let r=0;r<i.length;r++){const n=this._tweens[i[r]],a=!e;n&&n.update(t,a)===!1&&!e&&this.remove(n)}i=Object.keys(this._tweensAddedDuringUpdate)}}}var F=Object.defineProperty,j=(o,t,e)=>t in o?F(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,U=(o,t,e)=>(j(o,typeof t!="symbol"?t+"":t,e),e);const C=class P{static nextId(){return P._nextId++}};U(C,"_nextId",0);let w=C;var D=Object.defineProperty,I=(o,t,e)=>t in o?D(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,s=(o,t,e)=>(I(o,typeof t!="symbol"?t+"":t,e),e);const k=new m,T=class E{constructor(t,e=k){s(this,"_isPaused",!1),s(this,"_pauseStart",0),s(this,"_valuesStart",{}),s(this,"_valuesEnd",{}),s(this,"_valuesStartRepeat",{}),s(this,"_duration",1e3),s(this,"_isDynamic",!1),s(this,"_initialRepeat",0),s(this,"_repeat",0),s(this,"_repeatDelayTime"),s(this,"_yoyo",!1),s(this,"_isPlaying",!1),s(this,"_reversed",!1),s(this,"_delayTime",0),s(this,"_startTime",0),s(this,"_easingFunction",f.None),s(this,"_interpolationFunction",S),s(this,"_chainedTweens",[]),s(this,"_onStartCallback"),s(this,"_onStartCallbackFired",!1),s(this,"_onEveryStartCallback"),s(this,"_onEveryStartCallbackFired",!1),s(this,"_onUpdateCallback"),s(this,"_onRepeatCallback"),s(this,"_onCompleteCallback"),s(this,"_onStopCallback"),s(this,"_id",w.nextId()),s(this,"_isChainStopped",!1),s(this,"_propertiesAreSetUp",!1),s(this,"_object"),s(this,"_group"),s(this,"_goToEnd",!1),this._object=t,this._group=e,this._group.add(this)}getId(){return this._id}isPlaying(){return this._isPlaying}isPaused(){return this._isPaused}getDuration(){return this._duration}to(t,e=1e3){if(this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=t,this._propertiesAreSetUp=!1,this._duration=e<0?0:e,this}duration(t=1e3){return this._duration=t<0?0:t,this}dynamic(t=!1){return this._isDynamic=t,this}start(t=y(),e=!1){if(this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(const i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=t,this._startTime+=this._delayTime,!this._propertiesAreSetUp||e){if(this._propertiesAreSetUp=!0,!this._isDynamic){const i={};for(const r in this._valuesEnd)i[r]=this._valuesEnd[r];this._valuesEnd=i}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,e)}return this}startFromCurrentValues(t){return this.start(t,!0)}_setupProperties(t,e,i,r,n){for(const a in i){const h=t[a],l=Array.isArray(h),_=l?"array":typeof h;let p=!l&&Array.isArray(i[a]);if(!(_==="undefined"||_==="function")){if(p){const u=i[a];if(u.length===0)continue;const c=[h];for(let d=0,v=u.length;d<v;d+=1){const b=this._handleRelativeValue(h,u[d]);if(isNaN(b)){p=!1,console.warn("Found invalid interpolation list. Skipping.");break}c.push(b)}p&&(i[a]=c)}if((_==="object"||l)&&h&&!p){e[a]=l?[]:{};const u=h;for(const d in u)e[a][d]=u[d];r[a]=l?[]:{};let c=i[a];if(!this._isDynamic){const d={};for(const v in c)d[v]=c[v];i[a]=c=d}this._setupProperties(u,e[a],c,r[a],n)}else(typeof e[a]>"u"||n)&&(e[a]=h),l||(e[a]*=1),p?r[a]=i[a].slice().reverse():r[a]=e[a]||0}}}stop(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this}end(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this}pause(t=y()){return this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=t,this)}resume(t=y()){return!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this)}stopChainedTweens(){for(let t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop();return this}group(t){return t?(t.add(this),this):(console.warn("tween.group() without args has been removed, use group.add(tween) instead."),this)}remove(){return this._group?.remove(this),this}delay(t=0){return this._delayTime=t,this}repeat(t=0){return this._initialRepeat=t,this._repeat=t,this}repeatDelay(t){return this._repeatDelayTime=t,this}yoyo(t=!1){return this._yoyo=t,this}easing(t=f.None){return this._easingFunction=t,this}interpolation(t=S){return this._interpolationFunction=t,this}chain(...t){return this._chainedTweens=t,this}onStart(t){return this._onStartCallback=t,this}onEveryStart(t){return this._onEveryStartCallback=t,this}onUpdate(t){return this._onUpdateCallback=t,this}onRepeat(t){return this._onRepeatCallback=t,this}onComplete(t){return this._onCompleteCallback=t,this}onStop(t){return this._onStopCallback=t,this}update(t=y(),e=E.autoStartOnUpdate){if(this._isPaused)return!0;let i;if(!this._goToEnd&&!this._isPlaying)if(e)this.start(t,!0);else return!1;if(this._goToEnd=!1,t<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);const r=t-this._startTime,n=this._duration+(this._repeatDelayTime??this._delayTime),a=this._duration+this._repeat*n,h=(()=>{if(this._duration===0||r>a)return 1;const _=Math.trunc(r/n),p=r-_*n,u=Math.min(p/this._duration,1);return u===0&&r===this._duration?1:u})(),l=this._easingFunction(h);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,l),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),this._duration===0||r>=this._duration)if(this._repeat>0){const _=Math.min(Math.trunc((r-this._duration)/n)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=_);for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=n*_,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(let _=0,p=this._chainedTweens.length;_<p;_++)this._chainedTweens[_].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0}_updateProperties(t,e,i,r){for(const n in i){if(e[n]===void 0)continue;const a=e[n]||0;let h=i[n];const l=Array.isArray(t[n]),_=Array.isArray(h);!l&&_?t[n]=this._interpolationFunction(h,r):typeof h=="object"&&h?this._updateProperties(t[n],a,h,r):(h=this._handleRelativeValue(a,h),typeof h=="number"&&(t[n]=a+(h-a)*r))}}_handleRelativeValue(t,e){return typeof e!="string"?e:e.charAt(0)==="+"||e.charAt(0)==="-"?t+parseFloat(e):parseFloat(e)}_swapEndStartRepeatValues(t){const e=this._valuesStartRepeat[t],i=this._valuesEnd[t];typeof i=="string"?this._valuesStartRepeat[t]=this._valuesStartRepeat[t]+parseFloat(i):this._valuesStartRepeat[t]=this._valuesEnd[t],this._valuesEnd[t]=e}};s(T,"autoStartOnUpdate",!1);let O=T;export{m as Group,w as Sequence,O as Tween,k as mainGroup};
