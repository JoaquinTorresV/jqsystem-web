# JQsystems — sitio web

Sitio de JQsystems construido con Next.js, TypeScript, CSS responsive, Framer Motion y GSAP ScrollTrigger. Incluye un hero cinematográfico con animación ligada al desplazamiento en escritorio y una composición estática optimizada para móvil.

## Requisitos
- Node.js 20.9 o superior
- npm

## Instalación
```bash
npm install
npm run dev
```
Abrir http://localhost:3000

## Producción
```bash
npm run build
npm run start
```

## Antes de publicar
1. Reemplazar los conceptos del portafolio por proyectos reales autorizados y sus capturas.
2. Confirmar el correo receptor del formulario. Actualmente utiliza FormSubmit y puede requerir una activación inicial desde el correo.
3. Añadir favicon y variantes finales del logotipo.
4. El hero utiliza una composición visual propia en CSS, sin vídeo externo ni dependencias de stock. La animación de escritorio está vinculada al scroll mediante GSAP ScrollTrigger; en móvil se simplifica para priorizar rendimiento y usabilidad.
5. Configurar el dominio jqsystems.cl en Vercel y los registros DNS.
6. Instalar dependencias con `npm install` y validar `npm run build` antes del despliegue.
6. Revisar textos, aviso de privacidad y datos legales de la empresa antes del lanzamiento.

## Contacto configurado
- WhatsApp: +56 9 3211 5412
- Correo: contacto.jqsystem@gmail.com
- Dominio previsto: https://jqsystems.cl

## Nota sobre portafolio
Las tres tarjetas de inicio son conceptos visuales ilustrativos y están marcadas como `CONCEPTO`. No representan trabajos realizados ni resultados de clientes. Sustituirlas por proyectos reales antes de presentar el sitio como portafolio publicado.
