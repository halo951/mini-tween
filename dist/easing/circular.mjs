const e=Object.freeze({In(t){return 1-Math.sqrt(1-t*t)},Out(t){return Math.sqrt(1- --t*t)},InOut(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}});export{e as Circular};
