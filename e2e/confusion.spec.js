import {test,expect} from '@playwright/test';
test('confusão: balão perto da nova cabeça e pausa de 500ms',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:640,height:640});await page.goto('/e2e/confusion.html');await page.waitForFunction(()=>window.artReady&&window.fixtureScene.confusion.image.visible);
 const state=()=>page.evaluate(()=>{const scene=window.fixtureScene,engine=scene.game.registry.get('engine'),bubble=scene.confusion.image;return{visible:bubble.visible,x:bubble.x,y:bubble.y,prepare:engine.prepare,elapsed:engine.elapsed,head:engine.body[0]};});
 const initial=await state();expect(initial.prepare).toBe(500);expect(initial.head.x).toBe(5);expect(Math.hypot(initial.x-(31.2+5*30.4),initial.y-(31.2+10*30.4))).toBeLessThan(60);
 await page.screenshot({path:'artifacts/confusion-bubble.png'});
 await page.evaluate(()=>window.fixtureScene.game.registry.get('engine').update(250));expect((await state()).prepare).toBe(250);
 await page.evaluate(()=>window.fixtureScene.game.registry.get('engine').update(250));await page.waitForFunction(()=>!window.fixtureScene.confusion.image.visible);expect((await state()).elapsed).toBe(0);expect(errors).toEqual([]);
});
