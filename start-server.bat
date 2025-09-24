@echo off
echo 🚀 Iniciando servidor para el sitio del Ministerio de Medio Ambiente...
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no está instalado o no está en el PATH
    echo 💡 Instala Python desde https://python.org
    pause
    exit /b 1
)

REM Verificar archivos necesarios
if not exist "index.html" (
    echo ❌ Error: index.html no encontrado
    pause
    exit /b 1
)

if not exist "logo.png" (
    echo ⚠️ Advertencia: logo.png no encontrado
) else (
    echo ✅ logo.png encontrado
)

echo.
echo 🌐 El sitio se abrirá automáticamente en tu navegador
echo ⏹️ Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar servidor
python start-server.py

pause
