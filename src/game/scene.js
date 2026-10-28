import {ConfusionEmote} from './confusion-emote.js';
import {SnakeRenderer} from './snake-renderer.js';
import Phaser from 'phaser';
import {ASSETS} from './assets.js';
const cell=30.4,origin=31.2;
export class Terrarium extends Phaser.Scene{
 constructor(){super('terrarium');this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;}
 preload(){this.load.image('floor',ASSETS.board);this.load.image('confusion-bubble',ASSETS.confusionBubble);for(const [type,parts] of Object.entries(ASSETS.snakes))for(const [part,path] of Object.entries(parts))this.load.image(`${type}-${part}`,path);for(const [type,path] of Object.entries(ASSETS.foods))this.load.image(`food-${type}`,path);}
 create(){this.add.image(320,320,'floor').setDisplaySize(640,640);this.grid=this.add.graphics();this.grid.lineStyle(1,0xd5ed97,.055);for(let i=0;i<=20;i++){this.grid.lineBetween(16+i*cell,16,16+i*cell,624);this.grid.lineBetween(16,16+i*cell,624,16+i*cell);}this.glow=this.add.graphics();this.snakeArt=new SnakeRenderer(this);this.pickup=this.add.image(0,0,'food-normal').setDisplaySize(27,27).setDepth(410);this.effects=[];this.particles=this.add.graphics().setDepth(420);this.confusion=new ConfusionEmote(this);this.onState=this.game.registry.get('onState');this.input.on('pointerdown',p=>{this.swipe={x:p.x,y:p.y};});this.input.on('pointerup',p=>{if(!this.swipe)return;const dx=p.x-this.swipe.x,dy=p.y-this.swipe.y;this.swipe=null;if(Math.max(Math.abs(dx),Math.abs(dy))>20)this.game.registry.get('onTurn')(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');});}
 update(time,dt){const e=this.game.registry.get('engine');if(e){e.update(dt);for(const event of e.events.splice(0)){if(event.type==='eat'&&!this.reduced)for(let i=0;i<12;i++)this.effects.push({x:origin+event.at.x*cell,y:origin+event.at.y*cell,vx:Math.cos(i)*70,vy:Math.sin(i)*70,life:1});this.onState?.(event,e);}this.onState?.(null,e);}this.draw(time,dt,e);}
 draw(time,dt,e){const body=e?.body||[{x:10,y:10},{x:9,y:10},{x:8,y:10}];const previous=e?.previous||body,type=e?.type||this.game.registry.get('selected')||'brown';const alpha=e?.ghost>0?(e.ghost<1600&&!this.reduced ? .4+Math.sin(time/70)*.18 : .55):1;const t=e&&!e.prepare&&!e.over?Math.min(1,e.accumulator/e.interval):1;const points=body.map((p,i)=>{const old=previous[i]||previous.at(-1)||p;const wrap=Math.abs(old.x-p.x)>2||Math.abs(old.y-p.y)>2;return{x:origin+(wrap?p.x:old.x+(p.x-old.x)*t)*cell,y:origin+(wrap?p.y:old.y+(p.y-old.y)*t)*cell};});
 this.glow.clear();if(e?.speed||e?.ghost){this.glow.lineStyle(33,e.ghost?0xebffff:0x58cfff,.22);for(let i=1;i<points.length;i++)if(Math.abs(points[i].x-points[i-1].x)<60&&Math.abs(points[i].y-points[i-1].y)<60)this.glow.lineBetween(points[i].x,points[i].y,points[i-1].x,points[i-1].y);}
 this.snakeArt.draw(points,type,alpha,cell,e?.direction||{x:1,y:0});
 this.pickup.setVisible(Boolean(e?.food));if(e?.food){const f=e.food;const pulse=this.reduced?0:Math.sin(time/230);this.pickup.setTexture(`food-${f.type}`).setPosition(origin+f.x*cell,origin+f.y*cell+pulse*1.5).setDisplaySize(27+pulse,27+pulse);}
 this.particles.clear();this.effects=this.effects.filter(p=>p.life>0);for(const p of this.effects){p.x+=p.vx*dt/1000;p.y+=p.vy*dt/1000;p.life-=dt/450;this.particles.fillStyle(0xffde73,Math.max(0,p.life));this.particles.fillCircle(p.x,p.y,3*Math.max(0,p.life));}
 this.confusion.update(points[0],Boolean(e?.prepare));}

}
export function createRenderer(onState,onTurn){return new Phaser.Game({type:Phaser.AUTO,parent:'board',width:640,height:640,backgroundColor:'#233e22',scene:Terrarium,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true},callbacks:{preBoot:game=>{game.registry.set('onState',onState);game.registry.set('onTurn',onTurn);}}});}
