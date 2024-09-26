const n=Object.freeze({In(t){return 1-Math.sin((1-t)*Math.PI/2)},Out(t){return Math.sin(t*Math.PI/2)},InOut(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}});export{n as Sinusoidal};
