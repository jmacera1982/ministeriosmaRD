#!/usr/bin/env python3
"""
Servidor HTTP simple para servir el sitio del Ministerio de Medio Ambiente
Ejecutar con: python start-server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers para evitar problemas de CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Verificar que index.html existe
    if not os.path.exists('index.html'):
        print("❌ Error: index.html no encontrado")
        return
    
    # Verificar que logo.png existe
    if not os.path.exists('logo.png'):
        print("⚠️ Advertencia: logo.png no encontrado")
    else:
        print("✅ logo.png encontrado")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado en http://localhost:{PORT}")
            print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
            print("🌐 Abriendo navegador...")
            
            # Abrir navegador automáticamente
            webbrowser.open(f'http://localhost:{PORT}')
            
            print("⏹️ Presiona Ctrl+C para detener el servidor")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")
    except OSError as e:
        if e.errno == 98:  # Puerto en uso
            print(f"❌ Puerto {PORT} ya está en uso. Probando puerto {PORT + 1}")
            PORT += 1
            start_server()
        else:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    start_server()
