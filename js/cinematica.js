// ==================== CINEMÁTICA ====================

// Variables globales para animaciones
let animationFrames = {};

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// ===== MRU (Movimiento Rectilíneo Uniforme) =====
function initMRU() {
    const canvas = document.getElementById('canvas-mru');
    const graficaCanvas = document.getElementById('grafica-mru');
    if (!canvas || !graficaCanvas) return;
    
    const ctx = canvas.getContext('2d');
    const gCtx = graficaCanvas.getContext('2d');
    
    let animationId = null;
    let currentTime = 0;
    
    function draw(t = null) {
        const x0 = parseFloat(document.getElementById('mru-x0').value);
        const v = parseFloat(document.getElementById('mru-v').value);
        const time = t !== null ? t : parseFloat(document.getElementById('mru-t').value);
        
        const x = x0 + v * time;
        
        // Dibujar simulación
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
        
        // Escala
        const scale = 2; // píxeles por metro
        const carX = 50 + x * scale;
        
        // Dibujar carro
        drawCar(ctx, carX, canvas.height - 80, v > 0);
        
        // Marcadores de posición
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        for (let i = -50; i <= 200; i += 50) {
            const px = 50 + i * scale;
            if (px > 0 && px < canvas.width) {
                ctx.fillText(i + 'm', px - 10, canvas.height - 45);
                ctx.fillRect(px, canvas.height - 42, 2, 5);
            }
        }
        
        // Información
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`t = ${time.toFixed(2)} s`, 10, 20);
        ctx.fillText(`x = ${x.toFixed(2)} m`, 10, 40);
        ctx.fillText(`v = ${v.toFixed(2)} m/s`, 10, 60);
        
        // Dibujar gráfica
        drawMRUGraph(gCtx, x0, v, time);
        
        // Actualizar resultados
        document.getElementById('resultado-mru').innerHTML = `
            <strong>Posición actual:</strong> x(${time.toFixed(2)}) = ${x0} + ${v} × ${time.toFixed(2)} = ${x.toFixed(2)} m<br>
            <strong>Desplazamiento:</strong> Δx = ${(x - x0).toFixed(2)} m<br>
            <strong>Velocidad constante:</strong> v = ${v.toFixed(2)} m/s
        `;
    }
    
    function drawMRUGraph(gCtx, x0, v, currentTime) {
        gCtx.clearRect(0, 0, graficaCanvas.width, graficaCanvas.height);
        
        const padding = 40;
        const graphWidth = graficaCanvas.width - 2 * padding;
        const graphHeight = graficaCanvas.height - 2 * padding;
        
        // Ejes
        gCtx.strokeStyle = '#475569';
        gCtx.lineWidth = 2;
        gCtx.beginPath();
        gCtx.moveTo(padding, padding);
        gCtx.lineTo(padding, graficaCanvas.height - padding);
        gCtx.lineTo(graficaCanvas.width - padding, graficaCanvas.height - padding);
        gCtx.stroke();
        
        // Etiquetas
        gCtx.fillStyle = '#475569';
        gCtx.font = 'bold 12px Arial';
        gCtx.fillText('x (m)', 10, 20);
        gCtx.fillText('t (s)', graficaCanvas.width - 40, graficaCanvas.height - 10);
        
        // Graficar x(t)
        gCtx.strokeStyle = '#3b82f6';
        gCtx.lineWidth = 3;
        gCtx.beginPath();
        
        const maxT = 10;
        for (let t = 0; t <= maxT; t += 0.1) {
            const x = x0 + v * t;
            const px = padding + (t / maxT) * graphWidth;
            const py = graficaCanvas.height - padding - ((x + 50) / 300) * graphHeight;
            
            if (t === 0) {
                gCtx.moveTo(px, py);
            } else {
                gCtx.lineTo(px, py);
            }
        }
        gCtx.stroke();
        
        // Punto actual
        const x = x0 + v * currentTime;
        const px = padding + (currentTime / maxT) * graphWidth;
        const py = graficaCanvas.height - padding - ((x + 50) / 300) * graphHeight;
        
        gCtx.fillStyle = '#ef4444';
        gCtx.beginPath();
        gCtx.arc(px, py, 5, 0, 2 * Math.PI);
        gCtx.fill();
    }
    
    function animate() {
        if (currentTime > 10) {
            currentTime = 0;
        }
        draw(currentTime);
        currentTime += 0.05;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-mru').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            currentTime = 0;
            document.getElementById('btn-animate-mru').textContent = '▶️ Animar';
        } else {
            document.getElementById('btn-animate-mru').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['mru-x0', 'mru-v', 'mru-t'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            if (id === 'mru-v') document.getElementById('mru-v-value').textContent = el.value + ' m/s';
            if (id === 'mru-t') document.getElementById('mru-t-value').textContent = el.value + ' s';
            if (!animationId) draw();
        });
    });
    
    draw();
}

// ===== MRUA (Movimiento Rectilíneo Uniformemente Acelerado) =====
function initMRUA() {
    const canvas = document.getElementById('canvas-mrua');
    const graficaCanvas = document.getElementById('grafica-mrua');
    if (!canvas || !graficaCanvas) return;
    
    const ctx = canvas.getContext('2d');
    const gCtx = graficaCanvas.getContext('2d');
    
    let animationId = null;
    let currentTime = 0;
    
    function draw(t = null) {
        const x0 = parseFloat(document.getElementById('mrua-x0').value);
        const v0 = parseFloat(document.getElementById('mrua-v0').value);
        const a = parseFloat(document.getElementById('mrua-a').value);
        const time = t !== null ? t : parseFloat(document.getElementById('mrua-t').value);
        
        const x = x0 + v0 * time + 0.5 * a * time * time;
        const v = v0 + a * time;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
        
        const scale = 2;
        const carX = Math.max(20, Math.min(canvas.width - 80, 50 + x * scale));
        
        drawCar(ctx, carX, canvas.height - 80, v >= 0);
        
        // Vector velocidad
        const vScale = 2;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(carX + 30, canvas.height - 60);
        ctx.lineTo(carX + 30 + v * vScale, canvas.height - 60);
        ctx.stroke();
        
        // Vector aceleración
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(carX + 30, canvas.height - 100);
        ctx.lineTo(carX + 30 + a * 10, canvas.height - 100);
        ctx.stroke();
        
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`t = ${time.toFixed(2)} s`, 10, 20);
        ctx.fillText(`x = ${x.toFixed(2)} m`, 10, 40);
        ctx.fillText(`v = ${v.toFixed(2)} m/s`, 10, 60);
        ctx.fillText(`a = ${a.toFixed(2)} m/s²`, 10, 80);
        
        drawMRUAGraph(gCtx, x0, v0, a, time);
        
        const vf2 = v0 * v0 + 2 * a * (x - x0);
        
        document.getElementById('resultado-mrua').innerHTML = `
            <strong>Posición:</strong> x = ${x0} + ${v0}(${time.toFixed(2)}) + ½(${a})(${time.toFixed(2)})² = ${x.toFixed(2)} m<br>
            <strong>Velocidad:</strong> v = ${v0} + ${a}(${time.toFixed(2)}) = ${v.toFixed(2)} m/s<br>
            <strong>Verificación v²:</strong> v² = ${v0}² + 2(${a})(${(x-x0).toFixed(2)}) = ${vf2.toFixed(2)} → v = ${Math.sqrt(Math.abs(vf2)).toFixed(2)} m/s
        `;
    }
    
    function drawMRUAGraph(gCtx, x0, v0, a, currentTime) {
        gCtx.clearRect(0, 0, graficaCanvas.width, graficaCanvas.height);
        
        const padding = 40;
        const graphWidth = graficaCanvas.width - 2 * padding;
        const graphHeight = graficaCanvas.height - 2 * padding;
        
        gCtx.strokeStyle = '#475569';
        gCtx.lineWidth = 2;
        gCtx.beginPath();
        gCtx.moveTo(padding, padding);
        gCtx.lineTo(padding, graficaCanvas.height - padding);
        gCtx.lineTo(graficaCanvas.width - padding, graficaCanvas.height - padding);
        gCtx.stroke();
        
        gCtx.fillStyle = '#475569';
        gCtx.font = 'bold 12px Arial';
        gCtx.fillText('x (m)', 10, 20);
        gCtx.fillText('t (s)', graficaCanvas.width - 40, graficaCanvas.height - 10);
        
        gCtx.strokeStyle = '#3b82f6';
        gCtx.lineWidth = 3;
        gCtx.beginPath();
        
        const maxT = 10;
        let maxX = 0, minX = 0;
        
        for (let t = 0; t <= maxT; t += 0.1) {
            const x = x0 + v0 * t + 0.5 * a * t * t;
            maxX = Math.max(maxX, x);
            minX = Math.min(minX, x);
        }
        
        const range = Math.max(Math.abs(maxX), Math.abs(minX)) || 100;
        
        for (let t = 0; t <= maxT; t += 0.1) {
            const x = x0 + v0 * t + 0.5 * a * t * t;
            const px = padding + (t / maxT) * graphWidth;
            const py = graficaCanvas.height - padding - ((x + range) / (2 * range)) * graphHeight;
            
            if (t === 0) {
                gCtx.moveTo(px, py);
            } else {
                gCtx.lineTo(px, py);
            }
        }
        gCtx.stroke();
        
        const x = x0 + v0 * currentTime + 0.5 * a * currentTime * currentTime;
        const px = padding + (currentTime / maxT) * graphWidth;
        const py = graficaCanvas.height - padding - ((x + range) / (2 * range)) * graphHeight;
        
        gCtx.fillStyle = '#ef4444';
        gCtx.beginPath();
        gCtx.arc(px, py, 5, 0, 2 * Math.PI);
        gCtx.fill();
    }
    
    function animate() {
        if (currentTime > 10) currentTime = 0;
        draw(currentTime);
        currentTime += 0.05;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-mrua').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            currentTime = 0;
            document.getElementById('btn-animate-mrua').textContent = '▶️ Animar';
        } else {
            document.getElementById('btn-animate-mrua').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['mrua-x0', 'mrua-v0', 'mrua-a', 'mrua-t'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            if (id === 'mrua-v0') document.getElementById('mrua-v0-value').textContent = el.value + ' m/s';
            if (id === 'mrua-a') document.getElementById('mrua-a-value').textContent = el.value + ' m/s²';
            if (id === 'mrua-t') document.getElementById('mrua-t-value').textContent = el.value + ' s';
            if (!animationId) draw();
        });
    });
    
    draw();
}

// ===== TIRO PARABÓLICO =====
function initTiroParabolico() {
    const canvas = document.getElementById('canvas-tiro-parabolico');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let currentTime = 0;
    
    function draw(t = null) {
        const v0 = parseFloat(document.getElementById('tp-v0').value);
        const angulo = parseFloat(document.getElementById('tp-angulo').value);
        const y0 = parseFloat(document.getElementById('tp-y0').value);
        const g = parseFloat(document.getElementById('tp-g').value);
        
        const angleRad = toRadians(angulo);
        const v0x = v0 * Math.cos(angleRad);
        const v0y = v0 * Math.sin(angleRad);
        
        // Tiempo de vuelo total
        const discriminant = v0y * v0y + 2 * g * y0;
        const tVuelo = (v0y + Math.sqrt(discriminant)) / g;
        const alcanceMax = v0x * tVuelo;
        const alturaMax = y0 + (v0y * v0y) / (2 * g);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        
        const scale = Math.min(canvas.width / (alcanceMax + 20), (canvas.height - 50) / (alturaMax + 20));
        
        // Dibujar trayectoria
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        for (let time = 0; time <= tVuelo; time += 0.05) {
            const x = v0x * time;
            const y = y0 + v0y * time - 0.5 * g * time * time;
            const px = 20 + x * scale;
            const py = canvas.height - 30 - y * scale;
            
            if (time === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar proyectil en tiempo actual
        const time = t !== null ? Math.min(t, tVuelo) : Math.min(tVuelo / 2, 5);
        const x = v0x * time;
        const y = y0 + v0y * time - 0.5 * g * time * time;
        
        if (y >= 0) {
            const px = 20 + x * scale;
            const py = canvas.height - 30 - y * scale;
            
            // Proyectil
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(px, py, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            // Vectores velocidad
            const vx = v0x;
            const vy = v0y - g * time;
            const vScale = 1.5;
            
            // Componente X (verde)
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + vx * vScale, py);
            ctx.stroke();
            
            // Componente Y (azul)
            ctx.strokeStyle = '#3b82f6';
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px, py - vy * vScale);
            ctx.stroke();
            
            // Vector velocidad total (morado)
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + vx * vScale, py - vy * vScale);
            ctx.stroke();
        }
        
        // Información
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px Arial';
        ctx.fillText(`t = ${time.toFixed(2)} s`, 10, 20);
        ctx.fillText(`x = ${x.toFixed(2)} m`, 10, 40);
        ctx.fillText(`y = ${y.toFixed(2)} m`, 10, 60);
        
        document.getElementById('resultado-tp').innerHTML = `
            <strong>Componentes iniciales:</strong> v₀ₓ = ${v0x.toFixed(2)} m/s, v₀ᵧ = ${v0y.toFixed(2)} m/s<br>
            <strong>Tiempo de vuelo:</strong> t = ${tVuelo.toFixed(2)} s<br>
            <strong>Alcance máximo:</strong> R = ${alcanceMax.toFixed(2)} m<br>
            <strong>Altura máxima:</strong> H = ${alturaMax.toFixed(2)} m<br>
            <strong>Posición en t=${time.toFixed(2)} s:</strong> (${x.toFixed(2)}, ${y.toFixed(2)}) m
        `;
    }
    
    function animate() {
        const v0 = parseFloat(document.getElementById('tp-v0').value);
        const angulo = parseFloat(document.getElementById('tp-angulo').value);
        const y0 = parseFloat(document.getElementById('tp-y0').value);
        const g = parseFloat(document.getElementById('tp-g').value);
        
        const angleRad = toRadians(angulo);
        const v0y = v0 * Math.sin(angleRad);
        const tVuelo = (v0y + Math.sqrt(v0y * v0y + 2 * g * y0)) / g;
        
        if (currentTime > tVuelo) currentTime = 0;
        draw(currentTime);
        currentTime += 0.05;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-tp').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            currentTime = 0;
            document.getElementById('btn-animate-tp').textContent = '▶️ Animar';
        } else {
            document.getElementById('btn-animate-tp').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['tp-v0', 'tp-angulo', 'tp-y0', 'tp-g'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            document.getElementById(id + '-value').textContent = el.value + (id === 'tp-angulo' ? '°' : id.includes('g') ? ' m/s²' : ' m/s' || ' m');
            if (!animationId) draw();
        });
    });
    
    draw();
}

// ===== MCU (Movimiento Circular Uniforme) =====
function initMCU() {
    const canvas = document.getElementById('canvas-mcu');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let currentTime = 0;
    
    function draw(t = null) {
        const r = parseFloat(document.getElementById('mcu-r').value);
        const omega = parseFloat(document.getElementById('mcu-omega').value);
        const time = t !== null ? t : parseFloat(document.getElementById('mcu-t').value);
        
        const theta = omega * time;
        const v = omega * r;
        const ac = omega * omega * r;
        const T = 2 * Math.PI / omega;
        const f = omega / (2 * Math.PI);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Círculo de trayectoria
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Radio
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Objeto
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        // Vector velocidad (tangencial)
        const vScale = 0.5;
        const vx = -r * Math.sin(theta) * vScale;
        const vy = r * Math.cos(theta) * vScale;
        
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx, y + vy);
        ctx.stroke();
        
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('v', x + vx + 10, y + vy);
        
        // Vector aceleración centrípeta
        const acScale = 0.3;
        const acx = -r * Math.cos(theta) * acScale;
        const acy = -r * Math.sin(theta) * acScale;
        
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + acx, y + acy);
        ctx.stroke();
        
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('aᶜ', x + acx - 20, y + acy);
        
        // Centro
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`t = ${time.toFixed(2)} s`, 10, 20);
        ctx.fillText(`θ = ${(theta % (2 * Math.PI)).toFixed(2)} rad`, 10, 40);
        
        document.getElementById('resultado-mcu').innerHTML = `
            <strong>Velocidad tangencial:</strong> v = ωr = ${omega.toFixed(2)} × ${r.toFixed(0)} = ${v.toFixed(2)} m/s<br>
            <strong>Aceleración centrípeta:</strong> aᶜ = ω²r = ${omega.toFixed(2)}² × ${r.toFixed(0)} = ${ac.toFixed(2)} m/s²<br>
            <strong>Período:</strong> T = 2π/ω = ${T.toFixed(2)} s<br>
            <strong>Frecuencia:</strong> f = ω/(2π) = ${f.toFixed(3)} Hz<br>
            <strong>Ángulo recorrido:</strong> θ = ${(theta % (2 * Math.PI)).toFixed(2)} rad = ${((theta * 180 / Math.PI) % 360).toFixed(2)}°
        `;
    }
    
    function animate() {
        draw(currentTime);
        currentTime += 0.05;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-mcu').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            currentTime = 0;
            document.getElementById('btn-animate-mcu').textContent = '▶️ Animar';
        } else {
            document.getElementById('btn-animate-mcu').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['mcu-r', 'mcu-omega', 'mcu-t'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            const suffix = id === 'mcu-r' ? ' m' : id === 'mcu-omega' ? ' rad/s' : ' s';
            document.getElementById(id + '-value').textContent = el.value + suffix;
            if (!animationId) draw();
        });
    });
    
    draw();
}

// ===== CAÍDA LIBRE =====
function initCaidaLibre() {
    const canvas = document.getElementById('canvas-caida-libre');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let currentTime = 0;
    
    function draw(t = null) {
        const h0 = parseFloat(document.getElementById('cl-h0').value);
        const v0 = parseFloat(document.getElementById('cl-v0').value);
        const g = parseFloat(document.getElementById('cl-g').value);
        
        // Calcular tiempo máximo
        const tTotal = (v0 + Math.sqrt(v0 * v0 + 2 * g * h0)) / g;
        const time = t !== null ? Math.min(t, tTotal) : Math.min(tTotal / 2, 3);
        
        const y = h0 + v0 * time - 0.5 * g * time * time;
        const v = v0 - g * time;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Edificio/Torre
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(50, canvas.height - 50, 100, -(h0 * 2));
        
        // Suelo
        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        
        // Escala de altura
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, canvas.height - 50);
        ctx.lineTo(200, 50);
        ctx.stroke();
        
        ctx.fillStyle = '#475569';
        ctx.font = '12px Arial';
        const maxH = h0 + 20;
        for (let h = 0; h <= maxH; h += 20) {
            const py = canvas.height - 50 - (h / maxH) * (canvas.height - 100);
            ctx.fillText(h + 'm', 205, py + 5);
            ctx.fillRect(195, py, 10, 2);
        }
        
        // Objeto en caída
        if (y >= 0) {
            const objY = canvas.height - 50 - (y / maxH) * (canvas.height - 100);
            
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(100, objY, 12, 0, 2 * Math.PI);
            ctx.fill();
            
            // Vector velocidad
            const vScale = 3;
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(100, objY);
            ctx.lineTo(100, objY + v * vScale);
            ctx.stroke();
            
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('v', 110, objY + v * vScale / 2);
        }
        
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`t = ${time.toFixed(2)} s`, 250, 30);
        ctx.fillText(`h = ${y.toFixed(2)} m`, 250, 50);
        ctx.fillText(`v = ${v.toFixed(2)} m/s`, 250, 70);
        
        document.getElementById('resultado-cl').innerHTML = `
            <strong>Altura:</strong> y = ${h0} + ${v0}(${time.toFixed(2)}) - ½(${g})(${time.toFixed(2)})² = ${y.toFixed(2)} m<br>
            <strong>Velocidad:</strong> v = ${v0} - ${g}(${time.toFixed(2)}) = ${v.toFixed(2)} m/s<br>
            <strong>Tiempo total de caída:</strong> ${tTotal.toFixed(2)} s<br>
            ${y <= 0 ? '<strong style="color: #ef4444;">¡Impacto en el suelo!</strong>' : ''}
        `;
    }
    
    function animate() {
        const h0 = parseFloat(document.getElementById('cl-h0').value);
        const v0 = parseFloat(document.getElementById('cl-v0').value);
        const g = parseFloat(document.getElementById('cl-g').value);
        const tTotal = (v0 + Math.sqrt(v0 * v0 + 2 * g * h0)) / g;
        
        if (currentTime > tTotal) currentTime = 0;
        draw(currentTime);
        currentTime += 0.05;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-cl').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            currentTime = 0;
            document.getElementById('btn-animate-cl').textContent = '▶️ Animar';
        } else {
            document.getElementById('btn-animate-cl').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['cl-h0', 'cl-v0', 'cl-g'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            const suffix = id === 'cl-h0' ? ' m' : id === 'cl-g' ? ' m/s²' : ' m/s';
            document.getElementById(id + '-value').textContent = el.value + suffix;
            if (!animationId) draw();
        });
    });
    
    draw();
}

// ===== FUNCIONES AUXILIARES =====
function drawCar(ctx, x, y, facingRight) {
    ctx.save();
    
    if (!facingRight) {
        ctx.translate(x + 30, y);
        ctx.scale(-1, 1);
        ctx.translate(-x - 30, -y);
    }
    
    // Cuerpo
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x, y, 60, 30);
    
    // Cabina
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(x + 15, y - 15, 30, 15);
    
    // Ruedas
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(x + 15, y + 30, 8, 0, 2 * Math.PI);
    ctx.arc(x + 45, y + 30, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
}

// Inicializar todas las simulaciones de cinemática
document.addEventListener('DOMContentLoaded', () => {
    initMRU();
    initMRUA();
    initTiroParabolico();
    initMCU();
    initCaidaLibre();
});