"use strict";const Cubic=Object.freeze({In(t){return t*t*t},Out(t){return--t*t*t+1},InOut(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}});exports.Cubic=Cubic;
