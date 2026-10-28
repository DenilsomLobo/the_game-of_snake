import sharp from 'sharp';
import fs from 'node:fs/promises';

// Recorta as quatro pecas de cada prancha preservando o canal alfa.
// Nao e necessario executar este script ao substituir os PNGs finais.
for(const type of ['brown','black','yellow']){
 const file=`art-source/snakes/${type}-sheet.png`;
 const {width,height}=await sharp(file).metadata();
 const halfX=Math.floor(width/2),halfY=Math.floor(height/2);
 for(const [i,part] of ['head','body','curve','tail'].entries()){
  const tile=await sharp(file).extract({left:(i%2)*halfX,top:Math.floor(i/2)*halfY,width:halfX,height:halfY}).png().toBuffer();
  const trimmed=await sharp(tile).trim({threshold:12}).toBuffer();
  // Corpo horizontal e cauda possuem margens verticais padronizadas.
  const h=part==='body'?96:part==='tail'?88:120;
  const normalized=await sharp(trimmed).resize(128,h,{fit:part==='body'||part==='tail'?'fill':'contain',background:'#00000000'}).extend({top:Math.floor((128-h)/2),bottom:Math.ceil((128-h)/2),left:0,right:0,background:'#00000000'}).png().toBuffer();
  await fs.writeFile(`public/assets/snakes/${type}-${part}.png`,normalized);
 }
}
console.log('12 sprites PNG separados em public/assets/snakes.');
