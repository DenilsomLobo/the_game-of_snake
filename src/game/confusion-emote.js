export class ConfusionEmote{
 constructor(scene){this.image=scene.add.image(0,0,'confusion-bubble').setDisplaySize(54,42).setDepth(430).setVisible(false);}
 update(head,visible){this.image.setVisible(visible);if(!visible)return;
  // Inverte o balao junto das bordas para manter a arte dentro do tabuleiro.
  const left=head.x>570,below=head.y<64;
  this.image.setFlipX(left).setFlipY(below).setPosition(Math.max(30,Math.min(610,head.x+(left?-24:24))),Math.max(24,Math.min(616,head.y+(below?39:-39))));
 }
}
