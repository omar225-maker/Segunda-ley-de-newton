// ==================== NAVEGACIÓN Y CONFIGURACIÓN PRINCIPAL ====================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initResponsiveCanvas();
});

// ===== SISTEMA DE NAVEGACIÓN =====
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Actualizar botones activos
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
            
            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// ===== RESPONSIVE CANVAS =====
function initResponsiveCanvas() {
    // Hacer los canvas responsive
    window.addEventListener('resize', adjustCanvasSizes);
    adjustCanvasSizes();
}

function adjustCanvasSizes() {
    const canvases = document.querySelectorAll('canvas');
    
    canvases.forEach(canvas => {
        const container = canvas.parentElement;
        const containerWidth = container.offsetWidth;
        
        // Si el canvas es más ancho que el contenedor, ajustarlo
        if (canvas.width > containerWidth - 40) {
            const scale = (containerWidth - 40) / canvas.width;
            canvas.style.width = (canvas.width * scale) + 'px';
            canvas.style.height = (canvas.height * scale) + 'px';
        }
    });
}

// ===== UTILIDADES GLOBALES =====

// Función para formatear números
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

// Función para convertir grados a radianes
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Función para convertir radianes a grados
function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error en el simulador:', e.error);
});

// ===== PREVENIR ZOOM EN MÓVILES AL HACER DOBLE CLICK =====
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===== MODO DE IMPRESIÓN =====
window.addEventListener('beforeprint', () => {
    // Pausar todas las animaciones antes de imprimir
    const animateButtons = document.querySelectorAll('.btn-animate');
    animateButtons.forEach(btn => {
        if (btn.textContent.includes('Pausar')) {
            btn.click();
        }
    });
});

// ===== ATAJOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    // Alt + 1: Vectores
    if (e.altKey && e.key === '1') {
        e.preventDefault();
        document.querySelector('[data-section="vectores"]').click();
    }
    
    // Alt + 2: Cinemática
    if (e.altKey && e.key === '2') {
        e.preventDefault();
        document.querySelector('[data-section="cinematica"]').click();
    }
    
    // Alt + 3: Dinámica
    if (e.altKey && e.key === '3') {
        e.preventDefault();
        document.querySelector('[data-section="dinamica"]').click();
    }
    
    // Escape: Pausar animación activa
    if (e.key === 'Escape') {
        const activeButton = document.querySelector('.btn-animate:focus');
        if (activeButton && activeButton.textContent.includes('Pausar')) {
            activeButton.click();
        }
    }
});

// ===== INDICADOR DE CARGA =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Simulador de Física 1 cargado correctamente');
    console.log('📐 Vectores | 🚀 Cinemática | ⚙️ Dinámica');
    console.log('Atajos de teclado: Alt+1 (Vectores), Alt+2 (Cinemática), Alt+3 (Dinámica)');
});

// ===== INFORMACIÓN DEL NAVEGADOR =====
console.log('%c🎯 Simulador de Física 1', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cVersión 1.0 - Desarrollado con HTML, CSS y JavaScript', 'color: #64748b;');
console.log('%cCompatible con todos los dispositivos 📱💻', 'color: #10b981;');

// ===== ANALYTICS (Opcional - para seguimiento de uso) =====
function trackSimulatorUsage(section, simulator) {
    // Aquí podrías implementar Google Analytics u otra herramienta
    console.log(`📊 Uso: ${section} - ${simulator}`);
}

// ===== DETECTAR DISPOSITIVO =====
function detectDevice() {
    const ua = navigator.userAgent;
    
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

const deviceType = detectDevice();
console.log(`🖥️ Dispositivo detectado: ${deviceType}`);

// Ajustes específicos para móviles
if (deviceType === 'mobile') {
    // Reducir el tamaño de fuente en móviles si es necesario
    document.body.style.fontSize = '14px';
}

// ===== EXPORTAR FUNCIONES ÚTILES =====
window.PhysicsSimulator = {
    formatNumber,
    degreesToRadians,
    radiansToDegrees,
    deviceType,
    version: '1.0.0'
};

// ===== MENSAJE DE BIENVENIDA =====
setTimeout(() => {
    console.log('%c✨ ¡Bienvenido al Simulador de Física 1!', 'font-size: 16px; color: #7c3aed; font-weight: bold;');
    console.log('%cExplora las simulaciones interactivas de:', 'color: #64748b;');
    console.log('%c  • Vectores (suma, producto punto, producto cruz, descomposición)', 'color: #ef4444;');
    console.log('%c  • Cinemática (MRU, MRUA, tiro parabólico, MCU, caída libre)', 'color: #3b82f6;');
    console.log('%c  • Dinámica (leyes de Newton, plano inclinado, fricción, péndulo, poleas)', 'color: #10b981;');
}, 1000);