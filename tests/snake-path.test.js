import test from 'node:test';
import assert from 'node:assert/strict';
import {roundedPath,measurePath,pointAt} from '../src/game/snake-path.js';
test('curvas em todas as orientações mantêm caminho conectado e pontas',()=>{for(const sx of [-1,1])for(const sy of [-1,1]){const input=[{x:sx*60,y:0},{x:0,y:0},{x:0,y:sy*60}],path=roundedPath(input,11);assert.deepEqual(path[0],input[0]);assert.deepEqual(path.at(-1),input.at(-1));for(let i=1;i<path.length;i++)assert.ok(Math.hypot(path[i].x-path[i-1].x,path[i].y-path[i-1].y)<1.5);}});
test('cauda pode ser ancorada exatamente sobre o fim do corpo',()=>{const path=measurePath(roundedPath([{x:90,y:0},{x:30,y:0},{x:30,y:60}],11));const cut=path.at(-1).distance-15.2,a=pointAt(path,cut),b=pointAt(path,cut+.1);assert.ok(Math.hypot(b.x-a.x,b.y-a.y)<.11);assert.ok(Math.abs(a.x-30)<.001);assert.ok(Math.abs(a.y-44.8)<.001);});
