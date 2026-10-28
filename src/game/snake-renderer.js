import {roundedPath,measurePath,pointAt} from './snake-path.js';
export class SnakeRenderer{
 constructor(scene){this.scene=scene;this.texture=scene.textures.createCanvas('snake-ribbon',640,640);this.image=scene.add.image(320,320,'snake-ribbon').setDepth(400);}
 draw(points,type,alpha,cell,headDirection){
  this.image.setAlpha(alpha);const key=type+headDirection.x+','+headDirection.y+':'+points.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(';');if(key===this.lastKey)return;this.lastKey=key;
  const ctx=this.texture.context;ctx.clearRect(0,0,640,640);
  const body=this.scene.textures.get(`${type}-body`).getSourceImage(),tail=this.scene.textures.get(`${type}-tail`).getSourceImage(),head=this.scene.textures.get(`${type}-head`).getSourceImage();
  const width=23;const groups=[];let group=[];for(const p of points){if(group.length&&Math.hypot(p.x-group.at(-1).x,p.y-group.at(-1).y)>cell*2){groups.push(group);group=[];}group.push(p);}if(group.length)groups.push(group);
  // Uma faixa de textura continua acompanha o caminho. Nao ha pecas de curva soltas.
  groups.forEach((group,index)=>{if(group.length<2)return;const path=measurePath(roundedPath(group,cell*.36)),length=path.at(-1).distance,hasTail=index===groups.length-1,end=hasTail?Math.max(0,length-cell*.5):length;
   for(let d=0;d<=end;d+=.8){const p=pointAt(path,d),next=pointAt(path,Math.min(length,d+1)),prev=pointAt(path,Math.max(0,d-1));const angle=Math.atan2(next.y-prev.y,next.x-prev.x);
    // Recorta a textura no miolo para nao repetir as bordas pretas de cada tile.
    const sx=16+(d/cell*96)%96;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(angle);ctx.drawImage(body,sx,16,2,96,-1.3,-width/2,2.6,width);ctx.restore();}
   if(hasTail){const p=pointAt(path,end),before=pointAt(path,Math.max(0,end-2)),angle=Math.atan2(p.y-before.y,p.x-before.x);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(angle);ctx.drawImage(tail,5,20,123,88,-2,-width/2,cell+2,width);ctx.restore();}
  });
  const p=points[0];ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(headDirection.y,headDirection.x));ctx.drawImage(head,-18.5,-18.5,37,37);ctx.restore();this.texture.refresh();
 }
}
