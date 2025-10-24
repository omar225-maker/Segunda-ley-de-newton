# 🎯 Simulador de Física 1 - Vectores, Cinemática y Dinámica

Un simulador interactivo completo de física desarrollado con HTML, CSS y JavaScript puro. Diseñado para ser responsive y funcionar en cualquier dispositivo (PC, tablet, smartphone).

## 📚 Contenido del Simulador

### 📐 VECTORES
1. **Suma de Vectores** - Método del paralelogramo con visualización gráfica
2. **Producto Punto (Escalar)** - Cálculo y visualización del ángulo entre vectores
3. **Producto Cruz (Vectorial)** - Representación 3D con proyección isométrica
4. **Descomposición de Vectores** - Componentes X e Y con visualización

### 🚀 CINEMÁTICA
1. **MRU (Movimiento Rectilíneo Uniforme)**
   - Fórmula: x = x₀ + vt
   - Gráficas interactivas de posición vs tiempo
   
2. **MRUA (Movimiento Rectilíneo Uniformemente Acelerado)**
   - Fórmulas: x = x₀ + v₀t + ½at², v = v₀ + at, v² = v₀² + 2a(x - x₀)
   - Gráficas de posición y velocidad
   
3. **Tiro Parabólico**
   - Ecuaciones de movimiento en 2D
   - Cálculo de alcance máximo y altura máxima
   - Visualización de componentes de velocidad
   
4. **MCU (Movimiento Circular Uniforme)**
   - Velocidad angular y tangencial
   - Aceleración centrípeta
   - Período y frecuencia
   
5. **Caída Libre**
   - Movimiento bajo gravedad
   - Cálculo de tiempo de caída

### ⚙️ DINÁMICA
1. **Segunda Ley de Newton (F = ma)**
   - Relación fuerza-masa-aceleración
   - Animación del movimiento

2. **Plano Inclinado**
   - Descomposición de fuerzas
   - Efecto de la fricción
   - Cálculo de aceleración en el plano

3. **Fuerza de Fricción**
   - Fricción estática vs cinética
   - Transición entre estados
   - Visualización de fuerzas

4. **Péndulo Simple**
   - Período y frecuencia
   - Pequeñas oscilaciones
   - Visualización de tensión y peso

5. **Sistema de Poleas (Máquina de Atwood)**
   - Cálculo de aceleración del sistema
   - Tensión en la cuerda
   - Movimiento de dos masas

6. **Fuerza Centrípeta**
   - Movimiento circular
   - Relación con velocidad y radio
   - Aceleración hacia el centro

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
1. Descarga o clona este repositorio
2. Abre el archivo `index.html` en cualquier navegador moderno
3. ¡Listo! El simulador funciona sin necesidad de servidor

### Opción 2: Servidor local (recomendado para desarrollo)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Luego abre: http://localhost:8000
```

## 📱 Compatibilidad

✅ **Navegadores compatibles:**
- Chrome/Edge (recomendado)
- Firefox
- Safari
- Opera
- Navegadores móviles (iOS Safari, Chrome Mobile)

✅ **Dispositivos:**
- 💻 Computadoras de escritorio
- 💻 Laptops
- 📱 Tablets
- 📱 Smartphones

## 🎨 Características

- **100% Responsive**: Se adapta a cualquier tamaño de pantalla
- **Interactivo**: Controles deslizantes y campos numéricos
- **Animaciones**: Visualización en tiempo real de movimientos
- **Sin dependencias**: Solo HTML, CSS y JavaScript vanilla
- **Offline**: Funciona sin conexión a internet
- **Educativo**: Fórmulas y resultados detallados

## 📂 Estructura del Proyecto

```
fisica-simulador/
│
├── index.html              # Página principal
├── README.md              # Este archivo
│
├── css/
│   └── styles.css         # Estilos completos responsive
│
└── js/
    ├── main.js            # Navegación y utilidades
    ├── vectores.js        # Simulaciones de vectores
    ├── cinematica.js      # Simulaciones de cinemática
    └── dinamica.js        # Simulaciones de dinámica
```

## ⌨️ Atajos de Teclado

- `Alt + 1`: Ir a sección Vectores
- `Alt + 2`: Ir a sección Cinemática
- `Alt + 3`: Ir a sección Dinámica
- `Escape`: Pausar animación activa

## 🎓 Uso Educativo

Este simulador es ideal para:
- 📖 Estudiantes de física de nivel secundaria y universidad
- 👨‍🏫 Profesores que necesitan herramientas visuales
- 🎯 Autodidactas que quieren comprender conceptos físicos
- 📚 Repaso antes de exámenes
- 🔬 Experimentos virtuales seguros

## 🚀 Despliegue en Línea

### GitHub Pages (Gratis)
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` como fuente
4. Tu simulador estará en: `https://tu-usuario.github.io/nombre-repo`

### Otras opciones gratuitas:
- **Netlify**: Arrastra la carpeta del proyecto
- **Vercel**: Conecta tu repositorio de GitHub
- **Cloudflare Pages**: Deploy automático desde Git

## 🔧 Personalización

El código está bien organizado y comentado. Puedes:
- Modificar colores en `css/styles.css` (variables CSS)
- Agregar nuevas simulaciones siguiendo la estructura existente
- Ajustar parámetros físicos por defecto
- Cambiar escalas de visualización

## 📊 Fórmulas Implementadas

### Vectores
- Suma: **R = A + B**
- Producto punto: **A · B = |A||B|cos(θ)**
- Producto cruz: **A × B** (regla de la mano derecha)
- Componentes: **Vₓ = |V|cos(θ), Vᵧ = |V|sen(θ)**

### Cinemática
- MRU: **x = x₀ + vt**
- MRUA: **x = x₀ + v₀t + ½at²**, **v = v₀ + at**
- Tiro parabólico: **x = v₀cos(θ)t**, **y = y₀ + v₀sen(θ)t - ½gt²**
- MCU: **v = ωr**, **aᶜ = v²/r**

### Dinámica
- 2ª Ley de Newton: **F = ma**
- Plano inclinado: **a = g(sen(θ) - μcos(θ))**
- Fricción: **Fₛ ≤ μₛN**, **Fₖ = μₖN**
- Péndulo: **T = 2π√(L/g)**
- Poleas: **a = g(m₂ - m₁)/(m₁ + m₂)**
- Centrípeta: **Fᶜ = mv²/r**

## 🐛 Reporte de Problemas

Si encuentras algún error o tienes sugerencias:
1. Abre un issue en GitHub
2. Describe el problema con capturas de pantalla
3. Indica el navegador y dispositivo usado

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Autor

Desarrollado con ❤️ para estudiantes y profesores de física.

## 🌟 Contribuciones

Las contribuciones son bienvenidas:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Disfruta aprendiendo física de forma interactiva! 🎓✨**