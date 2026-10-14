# Guía de Instalación de Skills de Diseño y Frontend (Emil Kowalski & Taste Skill)

Este documento contiene la lista completa de habilidades (*skills*), sus repositorios de origen y los comandos listos para instalarlas en cualquier otro proyecto que utilice **Antigravity, Claude Code, Cursor, Codex o Gemini CLI**.

---

## 1. Fuentes de Origen de las Skills

1. **Colección de Emil Kowalski (Design Engineering, Microinteracciones y Animaciones):**
   * Repositorio: [https://github.com/emilkowalski/skills](https://github.com/emilkowalski/skills)
   * Especialidad: Físicas de resortes, curvas de aceleración, rendimiento a 60/120 FPS y feedback táctil de componentes.

2. **Colección de Taste Skill / Leon Lin (Anti-Slop Frontend Framework):**
   * Sitio web: [https://www.tasteskill.dev/](https://www.tasteskill.dev/)
   * Repositorio: [https://github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
   * Especialidad: Minimalismo editorial, tipografía con contraste extremo, paletas cálidas y eliminación de patrones genéricos de IA.

---

## 2. Inventario de Skills Instaladas

### De Emil Kowalski:
* `emil-design-eng`: Filosofía central de diseño, microinteracciones, reglas de easing y feedback táctil.
* `animate`: Pautas para construir animaciones fluidas desde cero.
* `improve-animations`: Auditoría y refactorización de animaciones existentes.
* `review-animations`: Revisión de motion con formato estricto *Before / After*.
* `animation-performance`: Optimización para mantener 60/120 FPS (evitar repaints/reflows).
* `animation-vocabulary`: Glosario técnico y conceptos de motion design.
* `find-animation-opportunities`: Detección de momentos en la UI que ameritan movimiento.
* `apple-design`: Estética, jerarquía y físicas estilo Apple (WWDC).
* `break-ui`: Metodología para descomponer interfaces complejas en partes atómicas.
* `prototype`: Creación de variantes interactivas en vivo.
* `ask-sonner`: Mejores prácticas para el componente toast *Sonner*.
* `mobile-native`: Optimización y sensaciones nativas para aplicaciones móviles.
* `animate-expo`: Animaciones con Reanimated y Gesture Handler en React Native / Expo.
* `pick-ui-library`: Criterios para seleccionar librerías de componentes UI.
* `write-swift`: Buenas prácticas modernas en Swift y SwiftUI.

### De Taste Skill (Anti-Slop):
* `taste-skill`: Filosofía y reglas del framework Anti-Slop v2.
* `minimalist-skill`: Minimalismo editorial, bento grids, paletas hueso/carbón y cero sombras artificiales.
* `soft-skill`: Diseño visual de alta gama inspirado en agencias premium.
* `brandkit`: Creación de sistemas de identidad de marca consistentes.
* `redesign-skill`: Actualización de proyectos existentes a estándares de diseño premium.

---

## 3. Métodos de Instalación en un Nuevo Proyecto

### Método A: Mediante la CLI de `skills` (Recomendado)
Si tienes Node.js instalado, puedes ejecutar en la terminal de tu nuevo proyecto:

```bash
# Instalar el paquete de Emil Kowalski
npx skills add emilkowalski/skills

# Instalar el paquete de Taste Skill
npx skills add Leonxlnx/taste-skill
```

---

### Método B: Script Directo de PowerShell (Windows)
Abre la terminal en la raíz de tu nuevo proyecto y ejecuta este comando para descargar todas las skills dentro de `.agents/skills/`:

```powershell
powershell -Command "
$emilSkills = @(
  'animate', 'animate-expo', 'animation-performance', 'animation-vocabulary',
  'apple-design', 'ask-sonner', 'break-ui', 'emil-design-eng',
  'find-animation-opportunities', 'improve-animations', 'mobile-native',
  'pick-ui-library', 'prototype', 'review-animations', 'write-swift'
)

$tasteSkills = @(
  'taste-skill', 'minimalist-skill', 'soft-skill', 'brandkit', 'redesign-skill'
)

foreach ($s in $emilSkills) {
    $dir = Join-Path '.agents/skills' $s
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $url = \"https://raw.githubusercontent.com/emilkowalski/skills/main/skills/$s/SKILL.md\"
    Write-Host \"Descargando Emil Kowalski: $s...\"
    Invoke-WebRequest -Uri $url -OutFile (Join-Path $dir 'SKILL.md') -UseBasicParsing
}

foreach ($s in $tasteSkills) {
    $dir = Join-Path '.agents/skills' $s
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $url = \"https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/$s/SKILL.md\"
    Write-Host \"Descargando Taste Skill: $s...\"
    Invoke-WebRequest -Uri $url -OutFile (Join-Path $dir 'SKILL.md') -UseBasicParsing
}

Write-Host 'Todas las skills se han instalado correctamente en .agents/skills/'
"
```

---

### Método C: Instrucción directa para darle al Asistente de IA en el nuevo proyecto
Si estás en una nueva conversación en otro proyecto, solo cópiale este prompt al asistente:

> *"Por favor instala en este proyecto las skills de Emil Kowalski desde https://github.com/emilkowalski/skills y las de Taste Skill desde https://github.com/Leonxlnx/taste-skill dentro del directorio .agents/skills/."*
