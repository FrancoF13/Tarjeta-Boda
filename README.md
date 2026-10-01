# 💍 Invitación Digital de Boda - Suite Nupcial 3D (Estilo Instagram)

Una invitación digital interactiva de ultra-lujo para casamiento, inspirada en las invitaciones virales de Instagram (**@invitations.studio** y **@webgency_invitations**), construida con estética *Dusty Blue* (azul empolvado / celeste muted), blanco seda, relieve en papel artesanal y detalles en oro champagne.

---

## ✨ Nuevas Tecnologías y Dependencias Integradas

1. **Apertura de Sobre 3D Hiperrealista (GSAP)**:
   - Al pulsar el sello de lacre artesanal *Dusty Blue*, la solapa triangular superior se rebate en 3D (`rotateX: 180deg`), la tarjeta interior desliza hacia arriba saliendo del sobre y da paso a la suite nupcial con ráfagas de confeti.
2. **Efecto 3D Tilt con Reflejo Foil Metálico (Vanilla-Tilt.js)**:
   - Cada tarjeta reacciona al movimiento del mouse o al tacto/giroscopio en celulares, inclinándose en 3D con un halo de brillo dorado (*glare*) que simula papel con estampado en caliente (*hot-stamping*).
3. **Scroll Líquido de Lujo (Lenis Smooth Scroll & GSAP ScrollTrigger)**:
   - Desplazamiento ultra-suave y elegante con efectos de revelado progresivo (*reveal*) que hacen flotar cada tarjeta al hacer scroll.
4. **Carrusel Táctil de Detalles Nupciales (Swiper.js 11)**:
   - Sección *«Detalles Nupciales»* con fotografías de alta gama en formato Polaroid (sin personas):
     - **Alianzas de Oro**: Alianzas nupciales sobre papel artesanal con cinta de seda *dusty blue*.
     - **Ambientación Floral**: Centro de mesa nupcial de gala con hortensias *dusty blue*, rosas blancas y velas.
     - **Ramo de Novia y Votos**: Ramo floral con cintas de seda y votos caligráficos.
5. **Cañón de Confeti de Alta Gama (Canvas-Confetti)**:
   - Ráfagas tridimensionales de confeti con física realista en tonos oro champagne, celeste empolvado y blanco perla.
6. **Iconografía Vectorial Nupcial (Lucide Icons)**:
   - Iconos limpios, nítidos y modernos.
7. **Pase Nupcial VIP Perforado ($26.000 & 10 de Noviembre)**:
   - Diseño estilo entrada de colección con muescas laterales, cartel destacado y fecha límite visible.
8. **Música Nupcial Tradicional: Marcha Nupcial de Wagner (Web Audio API)**:
   - La icónica melodía de casamiento (*«Bridal Chorus / Here Comes the Bride»*) sintetizada con timbre cálido de piano de cola acústico y resonancia nupcial, con disco de vinilo giratorio y ecualizador animado.
9. **Sin Ubicación**:
   - Respetando el requerimiento del usuario, la sección de ubicación y mapa fue excluida.

---

## 🎨 Paleta de Colores

- **Dusty Blue Principal**: `#517796` (Azul empolvado / celeste agrisado nupcial)
- **Dusty Blue Profundo**: `#1d3345` (Texto principal de alto contraste y legibilidad)
- **Blanco Seda y Porcelana**: `#ffffff` / `#f4f8fb` (Base etérea de papelería)
- **Oro Champagne**: `#c5a572` (Foil metálico y detalles de joyería)

---

## 🚀 Cómo Ejecutarla Localmente

Podés abrir directamente el archivo `index.html` en cualquier navegador, o iniciar el servidor local con:

```bash
node server.js
```

Y luego abrir: [http://localhost:3000/](http://localhost:3000/)

---

## 🌐 Despliegue en Vercel (En 1 minuto)

El proyecto ya está completamente configurado con [vercel.json](file:///c:/Users/franc/OneDrive/Escritorio/Programacion/Paginas%20Oficial/tarjeta%20boda/Tarjeta%20Boda/vercel.json), [package.json](file:///c:/Users/franc/OneDrive/Escritorio/Programacion/Paginas%20Oficial/tarjeta%20boda/Tarjeta%20Boda/package.json) y [.gitignore](file:///c:/Users/franc/OneDrive/Escritorio/Programacion/Paginas%20Oficial/tarjeta%20boda/Tarjeta%20Boda/.gitignore).

### Opción 1: Directo desde la Terminal (Recomendado)
Abrí la terminal en la carpeta del proyecto y ejecutá:
```bash
npx vercel
```
1. Te pedirá iniciar sesión con tu cuenta de Vercel (o GitHub/Email).
2. Presioná `Enter` para aceptar las opciones por defecto (`Set up and deploy? [Y/n]`).
3. ¡Listo! Vercel te entregará la URL pública (ejemplo: `https://tarjeta-boda-tu-nombre.vercel.app`).

Para publicar directamente a producción:
```bash
npx vercel --prod
```

### Opción 2: Desde la Web de Vercel (Con GitHub)
1. Subí tu carpeta a un repositorio en **GitHub**.
2. Ingresá a [vercel.com/new](https://vercel.com/new).
3. Importá el repositorio y hacé clic en **«Deploy»**. Vercel lo detecta como sitio estático al instante.

---

## 📁 Estructura del Proyecto para Vercel

```text
├── index.html          # Estructura principal y modales
├── style.css           # Estilos completos Dusty Blue & Blanco
├── script.js           # Lógica interactiva, GSAP 3D, música y WhatsApp
├── vercel.json         # Configuración y cabeceras para Vercel
├── package.json        # Metadatos del proyecto
├── .gitignore          # Archivos ignorados por Git y Vercel
├── server.js           # Servidor local para pruebas
└── assets/             # Fotografías y sello de lacre
    ├── wax-seal.jpg
    ├── rings-flatlay.jpg
    ├── decor-1.jpg
    └── bouquet-flatlay.jpg
```

---

## 📱 Teléfono de WhatsApp Configurado

El número actual configurado es **+54 9 3794 22-8227** (`5493794228227`).
Si en el futuro deseás cambiarlo:
1. En [index.html](file:///c:/Users/franc/OneDrive/Escritorio/Programacion/Paginas%20Oficial/tarjeta%20boda/Tarjeta%20Boda/index.html): `<input type="hidden" id="target-phone" value="5493794228227">`.
2. En [script.js](file:///c:/Users/franc/OneDrive/Escritorio/Programacion/Paginas%20Oficial/tarjeta%20boda/Tarjeta%20Boda/script.js): `whatsappDefault: '5493794228227'`.

