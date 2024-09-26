"use strict";const m=(t,o,r)=>(o-t)*r+t,Linear=(t,o)=>{const r=t.length-1,s=r*o,c=Math.floor(s);return o<0?m(t[0],t[1],s):o>1?m(t[r],t[r-1],r-s):m(t[c],t[c+1>r?r:c+1],s-c)};exports.Linear=Linear;
