import {SIZE,SNAKES,FOOD_WEIGHTS,DIRECTIONS,POWER_MS,SPEED_PROGRESSION,REVERSE_PAUSE_MS} from './config.js';
export const same=(a,b)=>a.x===b.x&&a.y===b.y;
export function pickFood(random=Math.random){let n=random()*Object.values(FOOD_WEIGHTS).reduce((a,b)=>a+b,0);for(const [type,w] of Object.entries(FOOD_WEIGHTS)){n-=w;if(n<0)return type;}return 'normal';}
export class Engine{
 constructor(type='brown',random=Math.random){this.type=type;this.random=random;this.body=[{x:6,y:10},{x:5,y:10},{x:4,y:10}];this.previous=this.body.map(p=>({...p}));this.direction={...DIRECTIONS.right};this.queue=[];this.score=0;this.elapsed=0;this.foods=0;this.powers=0;this.normalFoods=0;this.growth=0;this.speed=0;this.ghost=0;this.grace=0;this.prepare=0;this.accumulator=0;this.paused=false;this.over=false;this.events=[];this.spawn();}
 get baseInterval(){return Math.max(SPEED_PROGRESSION.minInterval,SNAKES[this.type].interval-this.foods*SPEED_PROGRESSION.msPerFood);}
 get interval(){return Math.max(SPEED_PROGRESSION.minInterval,this.baseInterval*(this.speed>0?.75:1));}
 turn(name){const d=DIRECTIONS[name];if(!d||this.queue.length>=2)return;const last=this.queue.at(-1)||this.direction;if(d.x===-last.x&&d.y===-last.y||same(d,last))return;this.queue.push({...d});}
 spawn(){const free=[];for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)if(!this.body.some(p=>same(p,{x,y})))free.push({x,y});if(!free.length){this.over=true;this.won=true;return;}this.food={...free[Math.floor(this.random()*free.length)],type:pickFood(this.random)};}
 update(dt){if(this.over||this.paused)return;dt=Math.min(dt,250);if(this.prepare>0){this.prepare=Math.max(0,this.prepare-dt);return;}this.elapsed+=dt;this.speed=Math.max(0,this.speed-dt);const wasGhost=this.ghost>0;this.ghost=Math.max(0,this.ghost-dt);
 // Uma janela limitada permite sair de uma sobreposição após o fantasma.
 if(wasGhost&&!this.ghost&&this.body.slice(1).some(p=>same(p,this.body[0])))this.grace=1000;
 if(this.grace>0){this.grace=Math.max(0,this.grace-dt);if(!this.body.slice(1).some(p=>same(p,this.body[0])))this.grace=0;else if(!this.grace){this.end();return;}}
 this.accumulator+=dt;while(this.accumulator>=this.interval&&!this.over){this.accumulator-=this.interval;this.step();if(this.prepare){this.accumulator=0;break;}}}
 step(){this.previous=this.body.map(p=>({...p}));if(this.queue.length)this.direction=this.queue.shift();let head={x:this.body[0].x+this.direction.x,y:this.body[0].y+this.direction.y};if(this.ghost>0){head.x=(head.x+SIZE)%SIZE;head.y=(head.y+SIZE)%SIZE;}else if(head.x<0||head.y<0||head.x>=SIZE||head.y>=SIZE){this.end();return;}
 const eating=same(head,this.food);let add=0;if(eating&&this.food.type==='normal'){this.normalFoods++;add=this.type==='black'?(this.normalFoods%2===0?1:0):this.type==='yellow'?(this.normalFoods%2===0?2:1):1;}
 const growing=this.growth+add>0;const collisionBody=growing?this.body:this.body.slice(0,-1);if(!this.ghost&&!this.grace&&collisionBody.some(p=>same(p,head))){this.end();return;}
 this.body.unshift(head);this.growth+=add;if(this.growth)this.growth--;else this.body.pop();if(eating){const type=this.food.type;this.score+=10;this.foods++;if(type!=='normal')this.powers++;this.events.push({type:'eat',food:type,at:head});if(type==='speed')this.speed=POWER_MS;if(type==='ghost'){this.ghost=POWER_MS;this.grace=0;}if(type==='reverse'){
 this.body.reverse();const a=this.body[0],b=this.body[1];let dx=a.x-b.x,dy=a.y-b.y;if(Math.abs(dx)>1)dx=-Math.sign(dx);if(Math.abs(dy)>1)dy=-Math.sign(dy);this.direction={x:dx,y:dy};this.queue=[];this.prepare=REVERSE_PAUSE_MS;this.previous=this.body.map(p=>({...p}));}this.spawn();}}
 end(){this.over=true;this.events.push({type:'end'});}
}
