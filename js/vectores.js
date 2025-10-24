// ==================== VECTORES ====================

// Utilidades para vectores
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

// ===== SUMA DE VECTORES =====
function initSumaVectores() {
    const canvas = document.getElementById('canvas-suma-vectores');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const magA = document.getElementById('magA');
    const angA = document.getElementById('angA');
    const magB = document.getElementById('magB');
    const angB = document.getElementById('angB');
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Origen
        const originX = canvas.width / 2;
        const originY = canvas.height / 2;
        
        // Dibujar ejes
        drawAxes(ctx, originX, originY, canvas.width, canvas.height);
        
        // Obtener valores
        const mA = parseFloat(magA.value);
        const aA = toRadians(parseFloat(angA.value));
        const mB = parseFloat(magB.value);
        const aB = toRadians(parseFloat(angB.value));
        
        // Componentes
        const Ax = mA * Math.cos(aA);
        const Ay = -mA * Math.sin(aA); // Negativo porque canvas Y va hacia abajo
        const Bx = mB * Math.cos(aB);
        const By = -mB * Math.sin(aB);
        
        // Vector resultante
        const Rx = Ax + Bx;
        const Ry = Ay + By;
        const magR = Math.sqrt(Rx * Rx + Ry * Ry);
        const angR = toDegrees(Math.atan2(-Ry, Rx));
        
        // Dibujar vector A (rojo)
        drawVector(ctx, originX, originY, originX + Ax, originY + Ay, '#ef4444', 'A', 3);
        
        // Dibujar vector B (azul) desde el origen
        drawVector(ctx, originX, originY, originX + Bx, originY + By, '#3b82f6', 'B', 3);
        
        // Dibujar vector B trasladado (línea punteada)
        ctx.save();
        ctx.setLineDash([5, 5]);
        drawVector(ctx, originX + Ax, originY + Ay, originX + Ax + Bx, originY + Ay + By, '#3b82f6', '', 2);
        ctx.restore();
        
        // Dibujar vector A trasladado (línea punteada)
        ctx.save();
        ctx.setLineDash([5, 5]);
        drawVector(ctx, originX + Bx, originY + By, originX + Bx + Ax, originY + By + Ay, '#ef4444', '', 2);
        ctx.restore();
        
        // Dibujar vector resultante (verde)
        drawVector(ctx, originX, originY, originX + Rx, originY + Ry, '#10b981', 'R', 4);
        
        // Actualizar resultados
        document.getElementById('resultado-suma-vectores').innerHTML = `
            <strong>Vector A:</strong> (${Ax.toFixed(2)}, ${(-Ay).toFixed(2)}) | Magnitud: ${mA.toFixed(2)}<br>
            <strong>Vector B:</strong> (${Bx.toFixed(2)}, ${(-By).toFixed(2)}) | Magnitud: ${mB.toFixed(2)}<br>
            <strong>Vector Resultante R = A + B:</strong><br>
            Componentes: (${Rx.toFixed(2)}, ${(-Ry).toFixed(2)})<br>
            Magnitud: |R| = ${magR.toFixed(2)}<br>
            Ángulo: θ = ${angR.toFixed(2)}°
        `;
    }
    
    // Event listeners
    magA.addEventListener('input', (e) => {
        document.getElementById('magA-value').textContent = e.target.value;
        draw();
    });
    angA.addEventListener('input', (e) => {
        document.getElementById('angA-value').textContent = e.target.value + '°';
        draw();
    });
    magB.addEventListener('input', (e) => {
        document.getElementById('magB-value').textContent = e.target.value;
        draw();
    });
    angB.addEventListener('input', (e) => {
        document.getElementById('angB-value').textContent = e.target.value + '°';
        draw();
    });
    
    draw();
}

// ===== PRODUCTO PUNTO =====
function initProductoPunto() {
    const canvas = document.getElementById('canvas-producto-punto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const scale = 40; // Escala para visualización
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const originX = canvas.width / 2;
        const originY = canvas.height / 2;
        
        drawAxes(ctx, originX, originY, canvas.width, canvas.height);
        
        const Ax = parseFloat(document.getElementById('dotAx').value);
        const Ay = parseFloat(document.getElementById('dotAy').value);
        const Bx = parseFloat(document.getElementById('dotBx').value);
        const By = parseFloat(document.getElementById('dotBy').value);
        
        // Producto punto
        const dotProduct = Ax * Bx + Ay * By;
        
        // Magnitudes
        const magA = Math.sqrt(Ax * Ax + Ay * Ay);
        const magB = Math.sqrt(Bx * Bx + By * By);
        
        // Ángulo entre vectores
        const cosTheta = dotProduct / (magA * magB);
        const theta = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosTheta))));
        
        // Dibujar vectores
        drawVector(ctx, originX, originY, originX + Ax * scale, originY - Ay * scale, '#ef4444', 'A', 3);
        drawVector(ctx, originX, originY, originX + Bx * scale, originY - By * scale, '#3b82f6', 'B', 3);
        
        // Dibujar ángulo entre vectores
        drawAngle(ctx, originX, originY, Ax * scale, -Ay * scale, Bx * scale, -By * scale, 30);
        
        // Proyección de B sobre A
        const projMag = dotProduct / magA;
        const projX = (projMag * Ax / magA) * scale;
        const projY = (projMag * Ay / magA) * scale;
        
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(originX + Bx * scale, originY - By * scale);
        ctx.lineTo(originX + projX, originY - projY);
        ctx.stroke();
        ctx.restore();
        
        document.getElementById('resultado-producto-punto').innerHTML = `
            <strong>A · B = ${dotProduct.toFixed(3)}</strong><br>
            |A| = ${magA.toFixed(3)}, |B| = ${magB.toFixed(3)}<br>
            Ángulo entre vectores: θ = ${theta.toFixed(2)}°<br>
            Proyección de B sobre A: ${projMag.toFixed(3)}<br>
            ${dotProduct === 0 ? '<strong style="color: #ef4444;">Vectores perpendiculares!</strong>' : ''}
            ${Math.abs(cosTheta - 1) < 0.001 ? '<strong style="color: #10b981;">Vectores paralelos!</strong>' : ''}
        `;
    }
    
    ['dotAx', 'dotAy', 'dotBx', 'dotBy'].forEach(id => {
        document.getElementById(id).addEventListener('input', draw);
    });
    
    draw();
}

// ===== PRODUCTO CRUZ =====
function initProductoCruz() {
    const canvas = document.getElementById('canvas-producto-cruz');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const originX = canvas.width / 2;
        const originY = canvas.height / 2;
        
        // Ejes 3D simplificados
        drawAxes3D(ctx, originX, originY);
        
        const Ax = parseFloat(document.getElementById('cruzAx').value);
        const Ay = parseFloat(document.getElementById('cruzAy').value);
        const Az = parseFloat(document.getElementById('cruzAz').value);
        const Bx = parseFloat(document.getElementById('cruzBx').value);
        const By = parseFloat(document.getElementById('cruzBy').value);
        const Bz = parseFloat(document.getElementById('cruzBz').value);
        
        // Producto cruz: A × B
        const Cx = Ay * Bz - Az * By;
        const Cy = Az * Bx - Ax * Bz;
        const Cz = Ax * By - Ay * Bx;
        
        const magC = Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);
        const magA = Math.sqrt(Ax * Ax + Ay * Ay + Az * Az);
        const magB = Math.sqrt(Bx * Bx + By * By + Bz * Bz);
        
        const scale = 60;
        
        // Proyección isométrica simple
        const projA = project3D(Ax, Ay, Az, scale);
        const projB = project3D(Bx, By, Bz, scale);
        const projC = project3D(Cx, Cy, Cz, scale);
        
        // Dibujar vectores
        drawVector(ctx, originX, originY, originX + projA.x, originY + projA.y, '#ef4444', 'A', 3);
        drawVector(ctx, originX, originY, originX + projB.x, originY + projB.y, '#3b82f6', 'B', 3);
        drawVector(ctx, originX, originY, originX + projC.x, originY + projC.y, '#10b981', 'A×B', 4);
        
        document.getElementById('resultado-producto-cruz').innerHTML = `
            <strong>A × B = (${Cx.toFixed(3)}, ${Cy.toFixed(3)}, ${Cz.toFixed(3)})</strong><br>
            |A × B| = ${magC.toFixed(3)}<br>
            |A| = ${magA.toFixed(3)}, |B| = ${magB.toFixed(3)}<br>
            El vector resultante es perpendicular a A y B (regla mano derecha)
        `;
    }
    
    ['cruzAx', 'cruzAy', 'cruzAz', 'cruzBx', 'cruzBy', 'cruzBz'].forEach(id => {
        document.getElementById(id).addEventListener('input', draw);
    });
    
    draw();
}

// ===== DESCOMPOSICIÓN DE VECTORES =====
function initDescomposicion() {
    const canvas = document.getElementById('canvas-descomposicion');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const mag = document.getElementById('magDecomp');
    const ang = document.getElementById('angDecomp');
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const originX = 100;
        const originY = canvas.height - 100;
        
        // Dibujar ejes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        
        // Eje X
        ctx.beginPath();
        ctx.moveTo(50, originY);
        ctx.lineTo(canvas.width - 50, originY);
        ctx.stroke();
        drawArrowhead(ctx, canvas.width - 50, originY, canvas.width - 40, originY, '#475569');
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('X', canvas.width - 30, originY + 5);
        
        // Eje Y
        ctx.beginPath();
        ctx.moveTo(originX, canvas.height - 50);
        ctx.lineTo(originX, 50);
        ctx.stroke();
        drawArrowhead(ctx, originX, 50, originX, 40, '#475569');
        ctx.fillText('Y', originX - 20, 40);
        
        const m = parseFloat(mag.value);
        const a = toRadians(parseFloat(ang.value));
        
        const Vx = m * Math.cos(a);
        const Vy = m * Math.sin(a);
        
        const endX = originX + Vx;
        const endY = originY - Vy;
        
        // Dibujar vector principal
        drawVector(ctx, originX, originY, endX, endY, '#7c3aed', 'V', 4);
        
        // Dibujar componente X (roja)
        ctx.save();
        ctx.setLineDash([5, 5]);
        drawVector(ctx, originX, originY, endX, originY, '#ef4444', 'Vₓ', 3);
        ctx.restore();
        
        // Dibujar componente Y (azul)
        ctx.save();
        ctx.setLineDash([5, 5]);
        drawVector(ctx, endX, originY, endX, endY, '#3b82f6', 'Vᵧ', 3);
        ctx.restore();
        
        // Líneas punteadas de proyección
        ctx.save();
        ctx.strokeStyle = '#cbd5e1';
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(endX, originY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
        
        // Dibujar ángulo
        drawAngle(ctx, originX, originY, Vx, 0, Vx, -Vy, 40);
        
        document.getElementById('resultado-descomposicion').innerHTML = `
            <strong>Vector V:</strong> Magnitud = ${m.toFixed(2)}, Ángulo = ${ang.value}°<br>
            <strong>Componente X:</strong> Vₓ = |V|cos(θ) = ${Vx.toFixed(2)}<br>
            <strong>Componente Y:</strong> Vᵧ = |V|sen(θ) = ${Vy.toFixed(2)}<br>
            <strong>Verificación:</strong> |V| = √(Vₓ² + Vᵧ²) = ${Math.sqrt(Vx*Vx + Vy*Vy).toFixed(2)}
        `;
    }
    
    mag.addEventListener('input', (e) => {
        document.getElementById('magDecomp-value').textContent = e.target.value;
        draw();
    });
    ang.addEventListener('input', (e) => {
        document.getElementById('angDecomp-value').textContent = e.target.value + '°';
        draw();
    });
    
    draw();
}

// ==================== FUNCIONES AUXILIARES ====================

function drawAxes(ctx, originX, originY, width, height) {
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    
    // Eje X
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.stroke();
    drawArrowhead(ctx, width - 20, originY, width - 10, originY, '#94a3b8');
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(originX, height - 20);
    ctx.lineTo(originX, 20);
    ctx.stroke();
    drawArrowhead(ctx, originX, 20, originX, 10, '#94a3b8');
    
    // Etiquetas
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('X', width - 15, originY + 20);
    ctx.fillText('Y', originX - 25, 15);
}

function drawAxes3D(ctx, originX, originY) {
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    
    const axisLength = 150;
    
    // Eje X (rojo)
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + axisLength, originY);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('X', originX + axisLength + 10, originY + 5);
    
    // Eje Y (verde)
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX - axisLength * 0.5, originY - axisLength * 0.866);
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.fillText('Y', originX - axisLength * 0.5 - 20, originY - axisLength * 0.866);
    
    // Eje Z (azul)
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - axisLength);
    ctx.stroke();
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Z', originX - 20, originY - axisLength - 10);
}

function drawVector(ctx, x1, y1, x2, y2, color, label, lineWidth = 2) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    
    // Línea
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Flecha
    drawArrowhead(ctx, x2, y2, x2, y2, color, lineWidth);
    
    // Etiqueta
    if (label) {
        ctx.font = 'bold 16px Arial';
        ctx.fillText(label, x2 + 10, y2 - 10);
    }
}

function drawArrowhead(ctx, x, y, toX, toY, color, size = 10) {
    const angle = Math.atan2(toY - y, toX - x);
    
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size * Math.cos(angle - Math.PI / 6), y - size * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - size * Math.cos(angle + Math.PI / 6), y - size * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawAngle(ctx, originX, originY, x1, y1, x2, y2, radius) {
    const angle1 = Math.atan2(y1, x1);
    const angle2 = Math.atan2(y2, x2);
    
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(originX, originY, radius, angle1, angle2, false);
    ctx.stroke();
    
    const midAngle = (angle1 + angle2) / 2;
    const labelX = originX + (radius + 15) * Math.cos(midAngle);
    const labelY = originY + (radius + 15) * Math.sin(midAngle);
    
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('θ', labelX, labelY);
    ctx.restore();
}

function project3D(x, y, z, scale) {
    // Proyección isométrica simple
    const isoX = (x - y) * 0.866 * scale;
    const isoY = (x + y) * 0.5 * scale - z * scale;
    return { x: isoX, y: -isoY };
}

// Inicializar todas las simulaciones de vectores
document.addEventListener('DOMContentLoaded', () => {
    initSumaVectores();
    initProductoPunto();
    initProductoCruz();
    initDescomposicion();
});