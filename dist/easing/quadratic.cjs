"use strict";const Quadratic=Object.freeze({In(t){return t*t},Out(t){return t*(2-t)},InOut(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}});exports.Quadratic=Quadratic;
