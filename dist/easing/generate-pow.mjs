const t=(e=4)=>(e=e<Number.EPSILON?Number.EPSILON:e,e=e>1e4?1e4:e,{In(r){return r**e},Out(r){return 1-(1-r)**e},InOut(r){return r<.5?(r*2)**e/2:(1-(2-r*2)**e)/2+.5}});export{t as generatePow};
