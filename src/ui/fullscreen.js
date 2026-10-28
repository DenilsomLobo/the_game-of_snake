export function setupFullscreen(button,target=document.documentElement){
 const doc=target.ownerDocument;
 const active=()=>Boolean(doc.fullscreenElement||doc.webkitFullscreenElement);
 const sync=()=>{const isFull=active();button.setAttribute('aria-pressed',String(isFull));button.setAttribute('aria-label',isFull?'Sair da tela cheia':'Entrar em tela cheia');button.innerHTML=`${isFull?'⊡':'⛶'} <span>${isFull?'Sair da tela cheia':'Tela cheia'}</span>`;};
 button.addEventListener('click',async()=>{try{if(active()){const exit=doc.exitFullscreen||doc.webkitExitFullscreen;await exit.call(doc);}else{const request=target.requestFullscreen||target.webkitRequestFullscreen;if(!request)throw new Error('unsupported');await request.call(target);}sync();}catch{const note=doc.querySelector('#fullscreen-note');note.textContent='Tela cheia indisponível neste navegador. No iPhone, use Compartilhar → Adicionar à Tela de Início para jogar sem as barras.';note.hidden=false;clearTimeout(button.noticeTimer);button.noticeTimer=setTimeout(()=>{note.hidden=true;},6500);}});
 doc.addEventListener('fullscreenchange',sync);doc.addEventListener('webkitfullscreenchange',sync);sync();
}
