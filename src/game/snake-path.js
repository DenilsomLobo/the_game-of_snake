const distance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
export function roundedPath(points,radius=10){
 if(points.length<2)return points;
 const path=[points[0]];
 function line(to){const from=path.at(-1),n=Math.max(1,Math.ceil(distance(from,to)));for(let i=1;i<=n;i++)path.push({x:from.x+(to.x-from.x)*i/n,y:from.y+(to.y-from.y)*i/n});}
 for(let i=1;i<points.length-1;i++){
  const a=points[i-1],b=points[i],c=points[i+1];const ab=distance(a,b),bc=distance(b,c);if(ab<.01||bc<.01)continue;
  const r=Math.min(radius,ab/2,bc/2),start={x:b.x+(a.x-b.x)*r/ab,y:b.y+(a.y-b.y)*r/ab},end={x:b.x+(c.x-b.x)*r/bc,y:b.y+(c.y-b.y)*r/bc};line(start);
  const n=Math.max(2,Math.ceil(r*2));for(let j=1;j<=n;j++){const t=j/n,u=1-t;path.push({x:u*u*start.x+2*u*t*b.x+t*t*end.x,y:u*u*start.y+2*u*t*b.y+t*t*end.y});}
 }line(points.at(-1));return path;
}
export function measurePath(points){let total=0;return points.map((p,i)=>{if(i)total+=distance(points[i-1],p);return {...p,distance:total};});}
export function pointAt(path,d){if(d<=0)return path[0];if(d>=path.at(-1).distance)return path.at(-1);let low=1,high=path.length-1;while(low<high){const mid=(low+high)>>1;if(path[mid].distance<d)low=mid+1;else high=mid;}const a=path[low-1],b=path[low],t=(d-a.distance)/(b.distance-a.distance||1);return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}
