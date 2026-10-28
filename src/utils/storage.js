export const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('snake:'+key))??fallback;}catch{return fallback;}};
export const write=(key,value)=>{try{localStorage.setItem('snake:'+key,JSON.stringify(value));}catch{}};
export const cleanName=value=>value.replace(/[\u0000-\u001f\u007f-\u009f]/g,'').replace(/\s+/g,' ').trim().slice(0,20);
export const formatTime=ms=>`${String(Math.floor(ms/60000)).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}`;
export const compare=(a,b)=>b.score-a.score||a.elapsed-b.elapsed;
