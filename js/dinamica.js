// ==================== DINÁMICA ====================

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// ===== SEGUNDA LEY DE NEWTON =====
function initNewton() {
    const canvas = document.getElementById('canvas-newton');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let currentTime = 0;
    let position = 0;
    let velocity = 0;
    
    function draw(animate = false) {
        const m = parseFloat(document.getElementById('newton-m').value);
        const F = parseFloat(document.getElementById('newton-f').value);
        const a = F / m;
        
        if (animate) {
            const dt = 0.05;
            velocity += a * dt;
            position += velocity * dt;
            
            if (position > 300) {
                position = 0;
                velocity = 0;
            }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
        
        // Bloque
        const blockX = 100 + position;
        const blockY = canvas.height - 150;
        
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(blockX, blockY, 60, 50);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(blockX, blockY, 60, 50);
        
        // Masa
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(m + ' kg', blockX + 10, blockY + 30);
        
        // Vector Fuerza
        const fScale = 2;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(blockX + 60, blockY + 25);
        ctx.lineTo(blockX + 60 + F * fScale, blockY + 25);
        ctx.stroke();
        
        drawArrow(ctx, blockX + 60 + F * fScale, blockY + 25, '#ef4444');
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('F', blockX + 60 + F * fScale + 15, blockY + 20);
        
        // Vector aceleración
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX + 30, blockY - 20);
        ctx.lineTo(blockX + 30 + a * 10, blockY - 20);
        ctx.stroke();
        
        drawArrow(ctx, blockX + 30 + a * 10, blockY - 20, '#10b981');
        
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('a', blockX + 30 + a * 10 + 15, blockY - 25);
        
        // Información
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`Masa: m = ${m} kg`, 10, 30);
        ctx.fillText(`Fuerza: F = ${F} N`, 10, 50);
        ctx.fillText(`Aceleración: a = ${a.toFixed(2)} m/s²`, 10, 70);
        if (animate) {
            ctx.fillText(`Velocidad: v = ${velocity.toFixed(2)} m/s`, 10, 90);
        }
        
        document.getElementById('resultado-newton').innerHTML = `
            <strong>Segunda Ley de Newton: F = ma</strong><br>
            Aceleración: a = F/m = ${F}/${m} = ${a.toFixed(2)} m/s²<br>
            ${animate ? `Velocidad actual: v = ${velocity.toFixed(2)} m/s<br>` : ''}
            ${animate ? `Posición: x = ${position.toFixed(2)} m` : ''}
        `;
    }
    
    function animate() {
        draw(true);
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-newton').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            position = 0;
            velocity = 0;
            document.getElementById('btn-animate-newton').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-newton').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['newton-m', 'newton-f'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            document.getElementById(id + '-value').textContent = document.getElementById(id).value + (id.includes('m') ? ' kg' : ' N');
            if (!animationId) draw(false);
        });
    });
    
    draw(false);
}

// ===== PLANO INCLINADO =====
function initPlanoInclinado() {
    const canvas = document.getElementById('canvas-plano');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let position = 0;
    let velocity = 0;
    
    function draw(animate = false) {
        const m = parseFloat(document.getElementById('plano-m').value);
        const angulo = parseFloat(document.getElementById('plano-angulo').value);
        const mu = parseFloat(document.getElementById('plano-mu').value);
        const g = parseFloat(document.getElementById('plano-g').value);
        
        const angleRad = toRadians(angulo);
        const N = m * g * Math.cos(angleRad);
        const Fx = m * g * Math.sin(angleRad);
        const Fr = mu * N;
        const Fneta = Fx - Fr;
        const a = Fneta / m;
        
        if (animate && a > 0) {
            const dt = 0.05;
            velocity += a * dt;
            position += velocity * dt;
            
            if (position > 200) {
                position = 0;
                velocity = 0;
            }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Plano inclinado
        const planeStartX = 50;
        const planeStartY = canvas.height - 50;
        const planeLength = 350;
        const planeEndX = planeStartX + planeLength * Math.cos(angleRad);
        const planeEndY = planeStartY - planeLength * Math.sin(angleRad);
        
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(planeStartX, planeStartY);
        ctx.lineTo(planeEndX, planeEndY);
        ctx.lineTo(planeEndX, canvas.height - 50);
        ctx.lineTo(planeStartX, canvas.height - 50);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        
        // Bloque en el plano
        const blockDist = 80 + position;
        const blockX = planeStartX + blockDist * Math.cos(angleRad);
        const blockY = planeStartY - blockDist * Math.sin(angleRad);
        
        ctx.save();
        ctx.translate(blockX, blockY);
        ctx.rotate(-angleRad);
        
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(-25, -25, 50, 50);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(-25, -25, 50, 50);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(m + 'kg', -15, 5);
        
        ctx.restore();
        
        // Vectores de fuerza (desde el centro del bloque)
        const scale = 0.5;
        
        // Peso (mg) - hacia abajo
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX, blockY);
        ctx.lineTo(blockX, blockY + m * g * scale);
        ctx.stroke();
        drawArrow(ctx, blockX, blockY + m * g * scale, '#7c3aed');
        ctx.fillStyle = '#7c3aed';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('mg', blockX + 10, blockY + m * g * scale - 5);
        
        // Normal - perpendicular al plano
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX, blockY);
        const Nx = N * scale * Math.sin(angleRad);
        const Ny = -N * scale * Math.cos(angleRad);
        ctx.lineTo(blockX - Nx, blockY - Ny);
        ctx.stroke();
        drawArrow(ctx, blockX - Nx, blockY - Ny, '#3b82f6');
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('N', blockX - Nx - 20, blockY - Ny);
        
        // Componente paralela
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX, blockY);
        const Fxx = Fx * scale * Math.cos(angleRad);
        const Fxy = Fx * scale * Math.sin(angleRad);
        ctx.lineTo(blockX + Fxx, blockY + Fxy);
        ctx.stroke();
        drawArrow(ctx, blockX + Fxx, blockY + Fxy, '#ef4444');
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Fₓ', blockX + Fxx + 10, blockY + Fxy);
        
        // Fricción
        if (Fr > 0) {
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(blockX, blockY);
            const Frx = -Fr * scale * Math.cos(angleRad);
            const Fry = -Fr * scale * Math.sin(angleRad);
            ctx.lineTo(blockX + Frx, blockY + Fry);
            ctx.stroke();
            drawArrow(ctx, blockX + Frx, blockY + Fry, '#f59e0b');
            ctx.fillStyle = '#f59e0b';
            ctx.fillText('Fᵣ', blockX + Frx - 25, blockY + Fry);
        }
        
        // Ángulo
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(planeStartX, planeStartY, 40, -angleRad, 0);
        ctx.stroke();
        ctx.fillStyle = '#10b981';
        ctx.fillText(angulo + '°', planeStartX + 50, planeStartY - 10);
        
        document.getElementById('resultado-plano').innerHTML = `
            <strong>Peso:</strong> mg = ${(m * g).toFixed(2)} N<br>
            <strong>Normal:</strong> N = mgcos(${angulo}°) = ${N.toFixed(2)} N<br>
            <strong>Comp. paralela:</strong> Fₓ = mgsen(${angulo}°) = ${Fx.toFixed(2)} N<br>
            <strong>Fricción:</strong> Fᵣ = μN = ${mu} × ${N.toFixed(2)} = ${Fr.toFixed(2)} N<br>
            <strong>Fuerza neta:</strong> F = Fₓ - Fᵣ = ${Fneta.toFixed(2)} N<br>
            <strong>Aceleración:</strong> a = F/m = ${a.toFixed(2)} m/s²<br>
            ${a <= 0 ? '<strong style="color: #ef4444;">El bloque no se mueve (fricción mayor que componente paralela)</strong>' : ''}
            ${animate && a > 0 ? `Velocidad: v = ${velocity.toFixed(2)} m/s` : ''}
        `;
    }
    
    function animate() {
        draw(true);
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-plano').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            position = 0;
            velocity = 0;
            document.getElementById('btn-animate-plano').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-plano').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['plano-m', 'plano-angulo', 'plano-mu', 'plano-g'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const el = document.getElementById(id);
            const suffix = id.includes('m') && !id.includes('mu') ? ' kg' : id.includes('angulo') ? '°' : id.includes('g') ? ' m/s²' : '';
            document.getElementById(id + '-value').textContent = el.value + suffix;
            if (!animationId) draw(false);
        });
    });
    
    draw(false);
}

// ===== FRICCIÓN =====
function initFriccion() {
    const canvas = document.getElementById('canvas-friccion');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let position = 0;
    let velocity = 0;
    let isMoving = false;
    
    function draw(animate = false) {
        const m = parseFloat(document.getElementById('fric-m').value);
        const F = parseFloat(document.getElementById('fric-f').value);
        const mus = parseFloat(document.getElementById('fric-mus').value);
        const muk = parseFloat(document.getElementById('fric-muk').value);
        const g = 9.8;
        
        const N = m * g;
        const Fs_max = mus * N;
        const Fk = muk * N;
        
        let Ffric, Fneta, a;
        
        if (!isMoving && F <= Fs_max) {
            // Fricción estática
            Ffric = F;
            Fneta = 0;
            a = 0;
            isMoving = false;
        } else {
            // Fricción cinética
            isMoving = true;
            Ffric = Fk;
            Fneta = F - Fk;
            a = Fneta / m;
        }
        
        if (animate && isMoving) {
            const dt = 0.05;
            velocity += a * dt;
            position += velocity * dt;
            
            if (position > 300) {
                position = 0;
                velocity = 0;
                isMoving = false;
            }
            
            if (velocity < 0) {
                velocity = 0;
                isMoving = false;
            }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Suelo
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
        
        // Textura de fricción
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, canvas.height - 80);
            ctx.lineTo(i + 10, canvas.height - 70);
            ctx.stroke();
        }
        
        // Bloque
        const blockX = 100 + position;
        const blockY = canvas.height - 130;
        
        ctx.fillStyle = isMoving ? '#10b981' : '#3b82f6';
        ctx.fillRect(blockX, blockY, 60, 50);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(blockX, blockY, 60, 50);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(m + ' kg', blockX + 10, blockY + 30);
        
        // Vector Fuerza aplicada
        const fScale = 1.5;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(blockX + 60, blockY + 25);
        ctx.lineTo(blockX + 60 + F * fScale, blockY + 25);
        ctx.stroke();
        drawArrow(ctx, blockX + 60 + F * fScale, blockY + 25, '#ef4444');
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('F', blockX + 60 + F * fScale + 15, blockY + 20);
        
        // Vector Fricción
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(blockX, blockY + 25);
        ctx.lineTo(blockX - Ffric * fScale, blockY + 25);
        ctx.stroke();
        drawArrow(ctx, blockX - Ffric * fScale, blockY + 25, '#f59e0b');
        
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Fᶠ', blockX - Ffric * fScale - 30, blockY + 20);
        
        // Normal y Peso
        const scale = 0.3;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX + 30, blockY);
        ctx.lineTo(blockX + 30, blockY - N * scale);
        ctx.stroke();
        drawArrow(ctx, blockX + 30, blockY - N * scale, '#3b82f6');
        ctx.fillText('N', blockX + 40, blockY - N * scale + 10);
        
        ctx.strokeStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(blockX + 30, blockY + 50);
        ctx.lineTo(blockX + 30, blockY + 50 + N * scale);
        ctx.stroke();
        drawArrow(ctx, blockX + 30, blockY + 50 + N * scale, '#7c3aed');
        ctx.fillText('mg', blockX + 40, blockY + 50 + N * scale);
        
        // Estado
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(isMoving ? '🏃 EN MOVIMIENTO' : '⏸️ ESTÁTICO', 10, 30);
        
        document.getElementById('resultado-friccion').innerHTML = `
            <strong>Normal:</strong> N = mg = ${N.toFixed(2)} N<br>
            <strong>Fricción estática máxima:</strong> Fₛ(max) = μₛN = ${Fs_max.toFixed(2)} N<br>
            <strong>Fricción cinética:</strong> Fₖ = μₖN = ${Fk.toFixed(2)} N<br>
            <strong>Estado:</strong> ${isMoving ? 'MOVIMIENTO (fricción cinética)' : 'REPOSO (fricción estática)'}<br>
            <strong>Fricción actual:</strong> ${Ffric.toFixed(2)} N<br>
            <strong>Fuerza neta:</strong> ${Fneta.toFixed(2)} N<br>
            <strong>Aceleración:</strong> ${a.toFixed(2)} m/s²<br>
            ${animate && isMoving ? `<strong>Velocidad:</strong> ${velocity.toFixed(2)} m/s` : ''}
        `;
    }
    
    function animate() {
        draw(true);
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-fric').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            position = 0;
            velocity = 0;
            isMoving = false;
            document.getElementById('btn-animate-fric').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-fric').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['fric-m', 'fric-f', 'fric-mus', 'fric-muk'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const suffix = id.includes('m') && !id.includes('mu') ? ' kg' : id.includes('f') ? ' N' : '';
            document.getElementById(id + '-value').textContent = document.getElementById(id).value + suffix;
            if (!animationId) {
                isMoving = false;
                draw(false);
            }
        });
    });
    
    draw(false);
}

// ===== PÉNDULO SIMPLE =====
function initPendulo() {
    const canvas = document.getElementById('canvas-pendulo');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let time = 0;
    
    function draw(animate = false) {
        const L = parseFloat(document.getElementById('pend-l').value);
        const theta0 = toRadians(parseFloat(document.getElementById('pend-theta0').value));
        const m = parseFloat(document.getElementById('pend-m').value);
        const g = parseFloat(document.getElementById('pend-g').value);
        
        const omega = Math.sqrt(g / L);
        const T = 2 * Math.PI / omega;
        const f = 1 / T;
        
        const theta = animate ? theta0 * Math.cos(omega * time) : theta0;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const pivotX = canvas.width / 2;
        const pivotY = 80;
        const scale = 80;
        
        const bobX = pivotX + L * scale * Math.sin(theta);
        const bobY = pivotY + L * scale * Math.cos(theta);
        
        // Techo
        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, 0, canvas.width, 60);
        
        // Punto de pivote
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Cuerda
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();
        
        // Referencia vertical (línea punteada)
        ctx.strokeStyle = '#cbd5e1';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX, pivotY + L * scale);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Bob (masa)
        const bobRadius = Math.max(15, Math.min(30, m * 10));
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(m + 'kg', bobX - 15, bobY + 5);
        
        // Ángulo
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 60, Math.PI / 2, Math.PI / 2 + theta);
        ctx.stroke();
        
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('θ=' + (theta * 180 / Math.PI).toFixed(1) + '°', pivotX + 30, pivotY + 75);
        
        // Fuerzas
        const fScale = 2;
        
        // Peso
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX, bobY + m * g * fScale);
        ctx.stroke();
        drawArrow(ctx, bobX, bobY + m * g * fScale, '#7c3aed');
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('mg', bobX + 10, bobY + m * g * fScale);
        
        // Tensión
        const tension = m * g * Math.cos(theta) + m * L * omega * omega;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        const Tx = -tension * fScale * Math.sin(theta);
        const Ty = -tension * fScale * Math.cos(theta);
        ctx.lineTo(bobX + Tx * 0.3, bobY + Ty * 0.3);
        ctx.stroke();
        drawArrow(ctx, bobX + Tx * 0.3, bobY + Ty * 0.3, '#3b82f6');
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('T', bobX + Tx * 0.3 - 20, bobY + Ty * 0.3);
        
        // Información
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`L = ${L.toFixed(2)} m`, 10, canvas.height - 100);
        ctx.fillText(`T = ${T.toFixed(2)} s`, 10, canvas.height - 80);
        ctx.fillText(`f = ${f.toFixed(3)} Hz`, 10, canvas.height - 60);
        ctx.fillText(`ω = ${omega.toFixed(3)} rad/s`, 10, canvas.height - 40);
        if (animate) {
            ctx.fillText(`t = ${time.toFixed(2)} s`, 10, canvas.height - 20);
        }
        
        document.getElementById('resultado-pendulo').innerHTML = `
            <strong>Período:</strong> T = 2π√(L/g) = 2π√(${L}/${g}) = ${T.toFixed(3)} s<br>
            <strong>Frecuencia:</strong> f = 1/T = ${f.toFixed(3)} Hz<br>
            <strong>Frecuencia angular:</strong> ω = √(g/L) = ${omega.toFixed(3)} rad/s<br>
            <strong>Ángulo actual:</strong> θ(t) = θ₀cos(ωt) = ${(theta * 180 / Math.PI).toFixed(2)}°<br>
            <strong>Energía potencial:</strong> U = mgh = ${(m * g * L * (1 - Math.cos(theta))).toFixed(2)} J
        `;
    }
    
    function animate() {
        draw(true);
        time += 0.03;
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-pend').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            time = 0;
            document.getElementById('btn-animate-pend').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-pend').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['pend-l', 'pend-theta0', 'pend-m', 'pend-g'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const el = document.getElementById(id);
            const suffix = id.includes('l') && id !== 'pend-theta0' ? ' m' : id.includes('theta') ? '°' : id.includes('m') ? ' kg' : ' m/s²';
            document.getElementById(id + '-value').textContent = el.value + suffix;
            if (!animationId) draw(false);
        });
    });
    
    draw(false);
}

// ===== SISTEMA DE POLEAS (Máquina de Atwood) =====
function initPoleas() {
    const canvas = document.getElementById('canvas-poleas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let time = 0;
    let pos1 = 0, pos2 = 0;
    
    function draw(animate = false) {
        const m1 = parseFloat(document.getElementById('polea-m1').value);
        const m2 = parseFloat(document.getElementById('polea-m2').value);
        const g = parseFloat(document.getElementById('polea-g').value);
        
        const a = g * (m2 - m1) / (m1 + m2);
        const T = 2 * m1 * m2 * g / (m1 + m2);
        
        if (animate) {
            const dt = 0.05;
            pos1 -= a * dt * dt * 0.5 * 50; // Escala para visualización
            pos2 += a * dt * dt * 0.5 * 50;
            
            pos1 = Math.max(-150, Math.min(150, pos1));
            pos2 = Math.max(-150, Math.min(150, pos2));
            
            time += dt;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Techo
        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, 0, canvas.width, 50);
        
        const pulleyX = canvas.width / 2;
        const pulleyY = 80;
        const pulleyRadius = 30;
        
        // Polea
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(pulleyX, pulleyY, pulleyRadius, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(pulleyX, pulleyY, pulleyRadius - 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Centro de la polea
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(pulleyX, pulleyY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Cuerdas y masas
        const rope1X = pulleyX - 80;
        const rope2X = pulleyX + 80;
        const baseY = 200;
        
        // Masa 1 (izquierda)
        const mass1Y = baseY + pos1;
        
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pulleyX - pulleyRadius * 0.7, pulleyY + pulleyRadius * 0.7);
        ctx.lineTo(rope1X, mass1Y - 30);
        ctx.stroke();
        
        const size1 = 30 + m1 * 2;
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(rope1X - size1 / 2, mass1Y - size1, size1, size1);
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        ctx.strokeRect(rope1X - size1 / 2, mass1Y - size1, size1, size1);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('m₁=' + m1 + 'kg', rope1X - 25, mass1Y - size1 / 2);
        
        // Masa 2 (derecha)
        const mass2Y = baseY + pos2;
        
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pulleyX + pulleyRadius * 0.7, pulleyY + pulleyRadius * 0.7);
        ctx.lineTo(rope2X, mass2Y - 30);
        ctx.stroke();
        
        const size2 = 30 + m2 * 2;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(rope2X - size2 / 2, mass2Y - size2, size2, size2);
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.strokeRect(rope2X - size2 / 2, mass2Y - size2, size2, size2);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('m₂=' + m2 + 'kg', rope2X - 25, mass2Y - size2 / 2);
        
        // Vectores de fuerza
        const fScale = 3;
        
        // Tensión en m1
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rope1X, mass1Y - size1);
        ctx.lineTo(rope1X, mass1Y - size1 - T * fScale);
        ctx.stroke();
        drawArrow(ctx, rope1X, mass1Y - size1 - T * fScale, '#10b981');
        ctx.fillStyle = '#10b981';
        ctx.fillText('T', rope1X - 20, mass1Y - size1 - T * fScale);
        
        // Peso m1
        ctx.strokeStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(rope1X, mass1Y);
        ctx.lineTo(rope1X, mass1Y + m1 * g * fScale);
        ctx.stroke();
        drawArrow(ctx, rope1X, mass1Y + m1 * g * fScale, '#7c3aed');
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('m₁g', rope1X + 10, mass1Y + m1 * g * fScale);
        
        // Tensión en m2
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rope2X, mass2Y - size2);
        ctx.lineTo(rope2X, mass2Y - size2 - T * fScale);
        ctx.stroke();
        drawArrow(ctx, rope2X, mass2Y - size2 - T * fScale, '#10b981');
        ctx.fillStyle = '#10b981';
        ctx.fillText('T', rope2X + 10, mass2Y - size2 - T * fScale);
        
        // Peso m2
        ctx.strokeStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(rope2X, mass2Y);
        ctx.lineTo(rope2X, mass2Y + m2 * g * fScale);
        ctx.stroke();
        drawArrow(ctx, rope2X, mass2Y + m2 * g * fScale, '#7c3aed');
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('m₂g', rope2X + 10, mass2Y + m2 * g * fScale);
        
        document.getElementById('resultado-poleas').innerHTML = `
            <strong>Aceleración del sistema:</strong><br>
            a = g(m₂ - m₁)/(m₁ + m₂) = ${g}(${m2} - ${m1})/(${m1} + ${m2}) = ${a.toFixed(3)} m/s²<br>
            <strong>Tensión en la cuerda:</strong><br>
            T = 2m₁m₂g/(m₁ + m₂) = ${T.toFixed(2)} N<br>
            ${m2 > m1 ? '<strong style="color: #ef4444;">m₂ desciende, m₁ asciende ↓↑</strong>' : m1 > m2 ? '<strong style="color: #3b82f6;">m₁ desciende, m₂ asciende ↓↑</strong>' : '<strong>Sistema en equilibrio ⚖️</strong>'}
        `;
    }
    
    function animate() {
        draw(true);
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-polea').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            time = 0;
            pos1 = 0;
            pos2 = 0;
            document.getElementById('btn-animate-polea').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-polea').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['polea-m1', 'polea-m2', 'polea-g'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const suffix = id.includes('g') ? ' m/s²' : ' kg';
            document.getElementById(id + '-value').textContent = document.getElementById(id).value + suffix;
            if (!animationId) {
                pos1 = 0;
                pos2 = 0;
                draw(false);
            }
        });
    });
    
    draw(false);
}

// ===== FUERZA CENTRÍPETA =====
function initCentripeta() {
    const canvas = document.getElementById('canvas-centripeta');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let angle = 0;
    
    function draw(animate = false) {
        const m = parseFloat(document.getElementById('cent-m').value);
        const r = parseFloat(document.getElementById('cent-r').value);
        const v = parseFloat(document.getElementById('cent-v').value);
        
        const Fc = m * v * v / r;
        const ac = v * v / r;
        const omega = v / r;
        const T = 2 * Math.PI * r / v;
        
        if (animate) {
            angle += omega * 0.05;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Trayectoria circular
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Centro
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Objeto
        const objX = centerX + r * Math.cos(angle);
        const objY = centerY + r * Math.sin(angle);
        
        const objRadius = Math.max(10, Math.min(20, m * 0.5));
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(objX, objY, objRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px Arial';
        ctx.fillText(m + 'kg', objX - 12, objY + 4);
        
        // Radio
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(objX, objY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.fillText('r=' + r + 'm', centerX + r / 2 * Math.cos(angle) - 20, centerY + r / 2 * Math.sin(angle) - 10);
        
        // Vector velocidad (tangencial)
        const vScale = 2;
        const vx = -r * Math.sin(angle);
        const vy = r * Math.cos(angle);
        const vMag = Math.sqrt(vx * vx + vy * vy);
        const vNormX = (vx / vMag) * v * vScale;
        const vNormY = (vy / vMag) * v * vScale;
        
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objX, objY);
        ctx.lineTo(objX + vNormX, objY + vNormY);
        ctx.stroke();
        drawArrow(ctx, objX + vNormX, objY + vNormY, '#10b981');
        
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('v', objX + vNormX + 10, objY + vNormY);
        
        // Fuerza centrípeta (hacia el centro)
        const fcScale = 0.5;
        const fcX = centerX - objX;
        const fcY = centerY - objY;
        const fcMag = Math.sqrt(fcX * fcX + fcY * fcY);
        const fcNormX = (fcX / fcMag) * Fc * fcScale;
        const fcNormY = (fcY / fcMag) * Fc * fcScale;
        
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(objX, objY);
        ctx.lineTo(objX + fcNormX, objY + fcNormY);
        ctx.stroke();
        drawArrow(ctx, objX + fcNormX, objY + fcNormY, '#f59e0b');
        
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Fᶜ', objX + fcNormX - 25, objY + fcNormY);
        
        document.getElementById('resultado-centripeta').innerHTML = `
            <strong>Fuerza centrípeta:</strong> Fᶜ = mv²/r = ${m}×${v}²/${r} = ${Fc.toFixed(2)} N<br>
            <strong>Aceleración centrípeta:</strong> aᶜ = v²/r = ${v}²/${r} = ${ac.toFixed(2)} m/s²<br>
            <strong>Velocidad angular:</strong> ω = v/r = ${omega.toFixed(3)} rad/s<br>
            <strong>Período:</strong> T = 2πr/v = ${T.toFixed(2)} s<br>
            La fuerza centrípeta siempre apunta hacia el centro de la trayectoria circular
        `;
    }
    
    function animate() {
        draw(true);
        animationId = requestAnimationFrame(animate);
    }
    
    document.getElementById('btn-animate-cent').addEventListener('click', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            angle = 0;
            document.getElementById('btn-animate-cent').textContent = '▶️ Animar';
            draw(false);
        } else {
            document.getElementById('btn-animate-cent').textContent = '⏸️ Pausar';
            animate();
        }
    });
    
    ['cent-m', 'cent-r', 'cent-v'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const suffix = id.includes('m') ? ' kg' : id.includes('r') ? ' m' : ' m/s';
            document.getElementById(id + '-value').textContent = document.getElementById(id).value + suffix;
            if (!animationId) draw(false);
        });
    });
    
    draw(false);
}

// ===== FUNCIONES AUXILIARES =====
function drawArrow(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8, y - 8);
    ctx.lineTo(x - 8, y + 8);
    ctx.closePath();
    ctx.fill();
}

// Inicializar todas las simulaciones de dinámica
document.addEventListener('DOMContentLoaded', () => {
    initNewton();
    initPlanoInclinado();
    initFriccion();
    initPendulo();
    initPoleas();
    initCentripeta();
});