import {read,write} from '../utils/storage.js';
export class AudioSystem{
 constructor(){this.settings=read('audio',{music:true,effects:true});this.beat=0;this.timer=setInterval(()=>this.music(),380);}
 unlock(){this.ctx??=new(window.AudioContext||window.webkitAudioContext)();this.ctx.resume();}
 tone(freq,duration=.12,type='sine',volume=.05){if(!this.ctx||this.ctx.state!=='running')return;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,this.ctx.currentTime);g.gain.setValueAtTime(volume,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+duration);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+duration);}
 play(kind){if(!this.settings.effects)return;const notes={normal:[660,880],speed:[440,660,990],reverse:[740,440,550],ghost:[330,495,660],end:[220,165,110],click:[520]};(notes[kind]||notes.click).forEach((n,i)=>setTimeout(()=>this.tone(n,.18,kind==='end'?'triangle':'sine'),i*80));}
 music(){if(!this.settings.music||document.hidden)return;const notes=this.playing?[262,330,392,330,294,349,440,349]:[196,294,392,294,220,330,440,330];this.tone(notes[this.beat++%notes.length],.3,'triangle',.018);}
 set(key,value){this.settings[key]=value;write('audio',this.settings);}
}
