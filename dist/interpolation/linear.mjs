const a=(t,r,o)=>(r-t)*o+t,e=(t,r)=>{const o=t.length-1,c=o*r,s=Math.floor(c);return r<0?a(t[0],t[1],c):r>1?a(t[o],t[o-1],o-c):a(t[s],t[s+1>o?o:s+1],c-s)};export{e as Linear};
