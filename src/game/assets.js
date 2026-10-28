// Troque os PNGs mantendo os nomes ou altere somente este catálogo.
export const ASSETS={
 board:'/assets/backgrounds/board.png',
 background:'/assets/backgrounds/menu.png',
 logo:'/assets/ui/logo.png',
 confusionBubble:'/assets/effects/confusion-bubble.png',
 snakes:Object.fromEntries(['brown','black','yellow'].map(type=>[type,Object.fromEntries(['head','body','curve','tail'].map(part=>[part,`/assets/snakes/${type}-${part}.png`]))])),
 foods:Object.fromEntries(['normal','speed','reverse','ghost'].map(type=>[type,`/assets/foods/${type}.png`]))
};
