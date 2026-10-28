# Personalizar as artes

Os recursos consumidos pelo jogo ficam em `public/assets/`. São PNGs locais; não é necessário acessar um serviço de imagens durante a partida.

| Pasta | Arquivos | Uso |
| --- | --- | --- |
| `backgrounds/` | `menu.png`, `board.png` | Ambiente do menu e tabuleiro tropical |
| `ui/` | `logo.png`, `panel.png`, `button.png` | Logotipo, moldura e botão sem texto embutido |
| `snakes/` | `{brown,black,yellow}-head.png` | Cabeças e retratos da seleção |
| `snakes/` | `{brown,black,yellow}-body.png` | Textura contínua dos segmentos retos e das curvas |
| `snakes/` | `{brown,black,yellow}-tail.png` | Caudas |
| `snakes/` | `{brown,black,yellow}-curve.png` | Referências preservadas; não usadas pelo renderizador contínuo |
| `foods/` | `normal.png`, `speed.png`, `reverse.png`, `ghost.png` | Alimentos e poderes |
| `effects/` | `confusion-bubble.png` | Emote de confusão com transparência |

Para trocar uma arte, substitua o PNG mantendo o nome e as proporções. Os caminhos estão em `src/game/assets.js`; as molduras do menu também são referenciadas em `src/styles/main.css`. Atualize o navegador no desenvolvimento e gere um novo build antes de publicar.

Sprites das cobras têm 128×128 pixels com transparência. A cabeça aponta para a direita. O corpo é horizontal; a cauda tem base à esquerda e ponta à direita. Preserve as margens das imagens para manter os encaixes. O renderizador aplica a textura do corpo em um caminho contínuo, incluindo curvas, e une a cauda na mesma largura. Texto, auras e partículas são produzidos pela interface e pelo Phaser.

As pranchas originais estão em `art-source/snakes/` e as demais imagens de alta resolução em `art-source/originals/`. A identidade artística foi desenvolvida com apoio de geração de imagens por IA, usando a capa do projeto como referência visual.

```sh
npm run art:prepare
```

Esse comando recorta novamente as três pranchas e **sobrescreve os 12 PNGs finais das cobras**. Use-o ao alterar uma prancha; não o execute depois de editar diretamente um sprite final que deseja preservar.

Leia também [Balão de confusão](confusion-art.md).
