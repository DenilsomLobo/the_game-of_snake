// Reserva primeiro o espaco dos controles e usa o restante para o logotipo.
export function fitMenu(){
 const menu=document.querySelector('#menu'),panel=menu.querySelector('.menu-panel'),logo=menu.querySelector('.game-logo');
 const fit=()=>{
  if(!panel.offsetHeight)return;
  const style=getComputedStyle(menu);
  if(style.flexDirection==='row'){logo.style.maxHeight='';return;}
  const margin=parseFloat(getComputedStyle(logo).marginBottom)||0;
  const available=menu.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-panel.offsetHeight-margin-6;
  logo.style.maxHeight=`${Math.max(36,Math.min(innerHeight*.32,available))}px`;
 };
 new ResizeObserver(fit).observe(panel);window.addEventListener('resize',fit);fit();
}
