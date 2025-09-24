// Logo Debug Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Iniciando diagnóstico del logo...');
    
    // Verificar si el archivo existe
    const logoPath = './logo.png';
    const img = new Image();
    
    img.onload = function() {
        console.log('✅ Logo cargado exitosamente:', logoPath);
        console.log('📏 Dimensiones:', this.width + 'x' + this.height);
        
        // Actualizar todos los logos en la página
        const logos = document.querySelectorAll('.logo img, .footer-logo img');
        logos.forEach(logo => {
            logo.src = logoPath;
            logo.style.opacity = '1';
            console.log('🔄 Logo actualizado en:', logo.parentElement.className);
        });
    };
    
    img.onerror = function() {
        console.log('❌ Error cargando logo:', logoPath);
        console.log('🔍 Verificando rutas alternativas...');
        
        // Probar diferentes rutas
        const alternativePaths = [
            'logo.png',
            './logo.png',
            '/logo.png',
            'logo.PNG',
            'logo.jpg',
            'logo.jpeg',
            'logo.svg'
        ];
        
        let found = false;
        alternativePaths.forEach((path, index) => {
            const testImg = new Image();
            testImg.onload = function() {
                if (!found) {
                    found = true;
                    console.log('✅ Logo encontrado en:', path);
                    
                    // Actualizar todos los logos
                    const logos = document.querySelectorAll('.logo img, .footer-logo img');
                    logos.forEach(logo => {
                        logo.src = path;
                        logo.style.opacity = '1';
                    });
                }
            };
            testImg.src = path;
        });
        
        // Si no se encuentra ningún logo, usar fallback después de un tiempo
        setTimeout(() => {
            if (!found) {
                console.log('⚠️ Usando logo de fallback SVG');
                const logos = document.querySelectorAll('.logo img, .footer-logo img');
                logos.forEach(logo => {
                    logo.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMmM1NTMwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1JTklTVEVSSU8gREUgTUVESU8gQU1CSUVOVEU8L3RleHQ+Cjwvc3ZnPgo=';
                    logo.style.opacity = '1';
                });
            }
        }, 2000);
    };
    
    img.src = logoPath;
    
    // Información adicional de debugging
    console.log('📁 URL actual:', window.location.href);
    console.log('📁 Directorio base:', window.location.origin + window.location.pathname.replace('index.html', ''));
    
    // Listar archivos en el directorio (si es posible)
    if (window.location.protocol === 'file:') {
        console.log('📁 Protocolo file:// detectado');
        console.log('💡 Sugerencia: Usa un servidor local (Live Server, Python http.server, etc.)');
    }
});

// Función para probar manualmente
window.testLogo = function(path) {
    console.log('🧪 Probando logo en:', path);
    const img = new Image();
    img.onload = function() {
        console.log('✅ Logo funciona en:', path);
        document.querySelectorAll('.logo img, .footer-logo img').forEach(logo => {
            logo.src = path;
        });
    };
    img.onerror = function() {
        console.log('❌ Logo no funciona en:', path);
    };
    img.src = path;
};
