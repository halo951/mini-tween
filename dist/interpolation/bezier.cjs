"use strict";const b=(()=>{const e=[1];return t=>{let r=1;if(e[t])return e[t];for(let n=t;n>1;n--)r*=n;return e[t]=r,r}})(),o=(e,t)=>b(e)/b(t)/b(e-t),Bezier=(e,t)=>{let r=0;const n=e.length-1,u=Math.pow;for(let s=0;s<=n;s++)r+=u(1-t,n-s)*u(t,s)*e[s]*o(n,s);return r};exports.Bezier=Bezier;
