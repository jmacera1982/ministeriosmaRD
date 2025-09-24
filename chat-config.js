// Chat Widget Configuration for Ministerio de Medio Ambiente
document.addEventListener('DOMContentLoaded', function() {
    // Configure chat widget styling
    const chatWidget = document.querySelector('journey-builder-chat');
    
    if (chatWidget) {
        // Add custom styling
        chatWidget.style.cssText = `
            border-radius: 10px !important;
            box-shadow: 0 5px 25px rgba(0,0,0,0.15) !important;
            overflow: hidden !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        `;
        
        // Add ministry branding
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Look for chat header and customize it
                    const chatHeader = document.querySelector('[data-testid="chat-header"], .chat-header, .header');
                    if (chatHeader) {
                        chatHeader.style.cssText = `
                            background: linear-gradient(135deg, #2c5530 0%, #1a3d1e 100%) !important;
                            color: white !important;
                            border-radius: 10px 10px 0 0 !important;
                        `;
                    }
                    
                    // Look for chat messages and style them
                    const chatMessages = document.querySelectorAll('.message, [data-testid="message"]');
                    chatMessages.forEach(message => {
                        message.style.cssText = `
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                            line-height: 1.6 !important;
                        `;
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Ensure logo consistency
    const logos = document.querySelectorAll('.logo img, .footer-logo img');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Fallback logo if the original fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMmM1NTMwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1JTklTVEVSSU8gREUgTUVESU8gQU1CSUVOVEU8L3RleHQ+Cjwvc3ZnPgo=';
            this.alt = 'Logo Ministerio de Medio Ambiente';
            console.log('Logo local no encontrado, usando fallback SVG');
        });
        
        // Add loading state
        logo.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        logo.style.opacity = '0';
    });
});

// Chat widget responsive behavior
function adjustChatWidget() {
    const chatWidget = document.querySelector('.JB');
    if (chatWidget) {
        if (window.innerWidth <= 768) {
            chatWidget.style.bottom = '20px';
            chatWidget.style.right = '20px';
        } else if (window.innerWidth <= 480) {
            chatWidget.style.bottom = '15px';
            chatWidget.style.right = '15px';
        } else {
            chatWidget.style.bottom = '24px';
            chatWidget.style.right = '24px';
        }
    }
}

// Listen for window resize
window.addEventListener('resize', adjustChatWidget);

// Initialize on load
window.addEventListener('load', adjustChatWidget);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adjustChatWidget
    };
}
