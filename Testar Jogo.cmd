@echo off
setlocal
title The Game of Snake - Testar jogo
cd /d "%~dp0"

where node.exe >nul 2>&1
if errorlevel 1 (
    echo Node.js nao encontrado. Instale o Node.js e execute este arquivo novamente.
    pause
    exit /b 1
)

where npm.cmd >nul 2>&1
if errorlevel 1 (
    echo npm nao encontrado. Reinstale o Node.js com o npm incluido.
    pause
    exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
    echo Instalando dependencias do jogo...
    call npm.cmd install --cache "%~dp0.npm-cache"
    if errorlevel 1 (
        echo.
        echo Nao foi possivel instalar as dependencias. Verifique sua conexao.
        pause
        exit /b 1
    )
)

echo.
echo Iniciando The Game of Snake...
echo O navegador sera aberto automaticamente.
echo Para encerrar o servidor, pressione Ctrl+C nesta janela.
echo.
call npm.cmd run dev -- --open
if errorlevel 1 (
    echo.
    echo Nao foi possivel iniciar o jogo. Confira a mensagem acima.
    pause
    exit /b 1
)
endlocal
