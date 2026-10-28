# Balão de confusão

- Arte final: `public/assets/effects/confusion-bubble.png` — 216×168, PNG recortado com exterior transparente.
- Original: `art-source/originals/confusion-bubble.png`.
- Gerado com a ferramenta integrada de imagens, sem API externa ou credenciais próprias.
- Para trocar o visual, substitua o PNG mantendo o nome; o caminho também está em `src/game/assets.js`.
- O balão aparece próximo da nova cabeça por 500 ms. Nas bordas, muda de lado para permanecer visível.
- A pausa é configurada por `REVERSE_PAUSE_MS` em `src/game/config.js`.

Prompt: um único pequeno balão oval de confusão para jogo Snake cartoon tropical premium; PNG isolado com transparência real; preenchimento marfim quente, cauda curta apontando para baixo à esquerda, contorno chocolate espesso, relevo dourado e iluminação pintada suave. Rabisco de linhas entrelaçadas marrom no centro, legível a 50 px. Recorte justo; sem palavras, letras, interrogações, animais, cenário, quadriculado ou símbolos extras. Exterior transparente e interior marfim.

Verificação visual: `artifacts/confusion-bubble.png`. O teste `e2e/confusion.spec.js` confirma a posição próxima da cabeça, a pausa de 500 ms, o desaparecimento do balão e a exclusão desse intervalo do cronômetro.
