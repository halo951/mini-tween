"use strict";const Quartic=Object.freeze({In(t){return t*t*t*t},Out(t){return 1- --t*t*t*t},InOut(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}});exports.Quartic=Quartic;
