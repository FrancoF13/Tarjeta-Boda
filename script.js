/**
 * NUESTRA BODA | EXPERIENCIA NUPCIAL EDITORIAL DE ALTA GAMA (ESTILO INSTAGRAM)
 * Integración con:
 * - GSAP & ScrollTrigger (Apertura 3D del sobre & scroll reveal)
 * - Lenis (Smooth scroll de ultra-lujo)
 * - Vanilla-Tilt (Efecto de inclinación 3D y brillo foil en tarjetas)
 * - Swiper 11 (Carrusel táctil de fotos Polaroid)
 * - Canvas-Confetti (Lluvia de confeti profesional en dusty blue y oro)
 * - Lucide Icons (Iconografía SVG moderna)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. CONFIGURACIÓN DEL EVENTO
  // =========================================================
  const EVENT_CONFIG = {
    title: 'Boda de Elías & Adriana',
    couplesNames: 'Elías & Adriana',
    // Viernes 20 de Noviembre de 2026 a las 22:00hs (Mes 10 es Noviembre en JS)
    date: new Date(2026, 10, 20, 22, 0, 0),
    whatsappDefault: '5493794228227',
    ticketPrice: '$26.000',
    deadline: '10 de Noviembre',
  };

  // Inicializar Iconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // =========================================================
  // 2. LENIS SMOOTH SCROLL (SCROLL LÍQUIDO DE LUJO)
  // =========================================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sincronización oficial de alto rendimiento entre Lenis y GSAP ScrollTrigger
    if (window.ScrollTrigger && window.gsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // =========================================================
  // 3. CANVAS DE PARTÍCULAS (POLVO ESTELAR DUSTY BLUE & ORO)
  // =========================================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  class SparkleParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 3.2 + 1.2;
      this.speedY = Math.random() * 0.55 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.7 + 0.25;
      this.pulseSpeed = Math.random() * 0.035 + 0.015;
      this.pulse = Math.random() * Math.PI * 2;
      this.isStar = Math.random() > 0.65;

      const colors = [
        'rgba(197, 165, 114, ',   // Oro champagne
        'rgba(186, 149, 92, ',    // Oro cálido
        'rgba(142, 176, 203, ',   // Dusty blue suave
        'rgba(108, 144, 174, ',   // Dusty blue medio
        'rgba(255, 255, 255, ',   // Blanco puro
        'rgba(235, 243, 249, '    // Porcelana
      ];
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.pulse += this.pulseSpeed;

      if (this.y < -15 || this.x < -15 || this.x > width + 15) {
        this.reset();
      }
    }

    draw() {
      const currentOpacity = Math.max(0.15, this.opacity * (0.6 + 0.4 * Math.sin(this.pulse)));
      ctx.save();
      ctx.fillStyle = this.baseColor + currentOpacity + ')';

      if (this.isStar) {
        const s = this.size * 1.8;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - s);
        ctx.quadraticCurveTo(this.x, this.y, this.x + s, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + s);
        ctx.quadraticCurveTo(this.x, this.y, this.x - s, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - s);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor(width / 12), 70);
    particles = [];
    for (let i = 0; i < count; i++) {
      const p = new SparkleParticle();
      p.y = Math.random() * height;
      particles.push(p);
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // =========================================================
  // 4. MÚSICA DE BODA: LA MARCHA NUPCIAL (BRIDAL CHORUS - WAGNER)
  // Con timbre ceremonial de piano de cola y fanfarria de trompetas nupciales
  // =========================================================
  let audioContext = null;
  let isPlaying = false;
  let marchTimeout = null;
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicLabel = document.getElementById('music-label');

  // Frecuencias exactas de las notas (Escala de Sol Mayor)
  const N = {
    G2: 98.00,  B2: 123.47,
    C3: 130.81, D3: 146.83, E3: 164.81, Fs3: 185.00, G3: 196.00, A3: 220.00, B3: 246.94,
    C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99
  };

  // Secuencia de la Marcha Nupcial Tradicional (Melodía + Armonías de acompañamiento)
  const weddingMarchSteps = [
    // Frase 1: "Tan, tan-ta-ran!"
    { mel: N.D4,  dur: 0.38, chord: [N.G2, N.D3], vel: 0.09 },
    { mel: N.G4,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.13 },
    { mel: N.G4,  dur: 0.24, chord: [], vel: 0.08 },
    { mel: N.G4,  dur: 0.65, chord: [N.D3, N.G3, N.B3], vel: 0.10 },

    // Frase 2: "Tan, tan-ta-ran!"
    { mel: N.D4,  dur: 0.38, chord: [N.D3, N.Fs3], vel: 0.09 },
    { mel: N.A4,  dur: 0.72, chord: [N.D3, N.A3, N.Fs4], vel: 0.13 },
    { mel: N.Fs4, dur: 0.24, chord: [], vel: 0.08 },
    { mel: N.G4,  dur: 0.95, chord: [N.G2, N.G3, N.B3], vel: 0.12 },

    // Frase 3: Ascenso melódico nupcial
    { mel: N.D4,  dur: 0.36, chord: [N.G2, N.D3], vel: 0.09 },
    { mel: N.G4,  dur: 0.44, chord: [N.G3, N.B3], vel: 0.10 },
    { mel: N.B4,  dur: 0.44, chord: [N.D3, N.G3], vel: 0.11 },
    { mel: N.D5,  dur: 0.72, chord: [N.G3, N.B3, N.G4], vel: 0.13 },
    { mel: N.B4,  dur: 0.36, chord: [], vel: 0.09 },

    // Frase 4: Cadencia de resolución
    { mel: N.G4,  dur: 0.44, chord: [N.C3, N.E3, N.G3, N.C4], vel: 0.11 },
    { mel: N.A4,  dur: 0.44, chord: [N.D3, N.Fs3, N.A3], vel: 0.11 },
    { mel: N.Fs4, dur: 0.44, chord: [N.D3, N.A3], vel: 0.10 },
    { mel: N.G4,  dur: 1.45, chord: [N.G2, N.D3, N.G3, N.B3], vel: 0.13 },

    // Frase 5: Sección central lírica emotiva
    { mel: N.B4,  dur: 0.44, chord: [N.G2, N.D3, N.G3], vel: 0.10 },
    { mel: N.C5,  dur: 0.36, chord: [], vel: 0.09 },
    { mel: N.D5,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.12 },
    { mel: N.E5,  dur: 0.36, chord: [N.C3, N.G3, N.C4], vel: 0.11 },
    { mel: N.D5,  dur: 0.58, chord: [N.C3, N.E3, N.G3], vel: 0.10 },
    { mel: N.C5,  dur: 0.36, chord: [], vel: 0.09 },
    { mel: N.B4,  dur: 0.58, chord: [N.G2, N.D3, N.G3], vel: 0.10 },
    { mel: N.A4,  dur: 0.36, chord: [N.D3, N.Fs3, N.A3], vel: 0.09 },
    { mel: N.G4,  dur: 1.35, chord: [N.G2, N.G3, N.B3], vel: 0.12 },

    // Frase 6: Reprise solemne final
    { mel: N.D4,  dur: 0.38, chord: [N.G2, N.D3], vel: 0.09 },
    { mel: N.G4,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.13 },
    { mel: N.G4,  dur: 0.24, chord: [], vel: 0.08 },
    { mel: N.G4,  dur: 0.65, chord: [N.D3, N.G3, N.B3], vel: 0.10 },
    { mel: N.D4,  dur: 0.38, chord: [N.D3, N.Fs3], vel: 0.09 },
    { mel: N.A4,  dur: 0.72, chord: [N.D3, N.A3, N.Fs4], vel: 0.13 },
    { mel: N.Fs4, dur: 0.24, chord: [], vel: 0.08 },
    { mel: N.G4,  dur: 1.75, chord: [N.G2, N.D3, N.G3, N.B3, N.D4], vel: 0.14 }
  ];

  let currentMarchIndex = 0;

  // Voz de Trompeta Nupcial (Brass Fanfare)
  function playTrumpetVoice(freq, startTime, duration, velocity = 0.065) {
    if (!audioContext || !isPlaying) return;
    try {
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const filter = audioContext.createBiquadFilter();
      const gain = audioContext.createGain();

      // Oscilador 1: Diente de sierra característico de instrumentos de metal / viento
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Oscilador 2: Segundo instrumento ligeramente desafinado para dar efecto de coro/fanfarria
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq, startTime);
      osc2.detune.setValueAtTime(4.5, startTime);

      // Filtro de metal: ataque brillante que abre a 2600Hz y se asienta
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(2.0, startTime);
      filter.frequency.setValueAtTime(700, startTime);
      filter.frequency.linearRampToValueAtTime(2600, startTime + 0.045);
      filter.frequency.exponentialRampToValueAtTime(1200, startTime + duration);

      // Envolvente de trompeta: ataque vivo y sostenido señorial
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(velocity, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
    } catch (e) {
      console.warn('Trumpet voice error:', e);
    }
  }

  // Voz de Piano de Cola Acústico
  function playPianoVoice(freq, startTime, duration, velocity = 0.08) {
    if (!audioContext || !isPlaying) return;
    try {
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // Oscilador 1: Cuerpo cálido de piano
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Oscilador 2: Armónico sutil
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      osc2.detune.setValueAtTime(3, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, startTime);
      filter.frequency.exponentialRampToValueAtTime(700, startTime + duration);
      filter.Q.setValueAtTime(1.1, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(velocity, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
    } catch (e) {
      console.warn('Piano voice error:', e);
    }
  }

  function playMarchStep() {
    if (!isPlaying) return;
    const step = weddingMarchSteps[currentMarchIndex];
    const now = audioContext.currentTime;

    // 1. Tocar melodía principal: Fusión majestuosa de Piano de cola + Toque de Trompeta nupcial
    playPianoVoice(step.mel, now, step.dur * 1.35, step.vel * 0.75);
    playTrumpetVoice(step.mel, now, step.dur * 1.15, step.vel * 0.55);

    // 2. Acordes armónicos de acompañamiento en piano
    if (step.chord && step.chord.length > 0) {
      step.chord.forEach((chordFreq, idx) => {
        playPianoVoice(chordFreq, now + (idx * 0.02), step.dur * 1.5, step.vel * 0.45);
      });
    }

    currentMarchIndex = (currentMarchIndex + 1) % weddingMarchSteps.length;
    const stepDurationMs = step.dur * 950;
    marchTimeout = setTimeout(playMarchStep, stepDurationMs);
  }

  function startMusic() {
    try {
      if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContextClass();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      isPlaying = true;
      if (musicToggleBtn) {
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.setAttribute('title', 'Pausar Música');
      }
      if (musicLabel) musicLabel.textContent = 'Pausar';
      playMarchStep();
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function pauseMusic() {
    isPlaying = false;
    clearTimeout(marchTimeout);
    if (musicToggleBtn) {
      musicToggleBtn.classList.remove('playing');
      musicToggleBtn.setAttribute('title', 'Reproducir Música');
    }
    if (musicLabel) musicLabel.textContent = 'Música';
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }

  // =========================================================
  // 5. APERTURA 3D DEL SOBRE NUPCIAL TRÍPTICO / GATEFOLD
  // Se abre lateralmente por los lados revelando los datos de Elías y Adriana
  // =========================================================
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const openEnvelopeBtn = document.getElementById('open-invitation-btn');
  const btnEnterSuite = document.getElementById('btn-enter-suite');
  const doorLeft = document.getElementById('door-left');
  const doorRight = document.getElementById('door-right');
  const gatefoldCardInside = document.getElementById('gatefold-card-inside');
  const envPromptBox = document.getElementById('env-prompt-box');
  let isEnvelopeOpened = false;

  function trigger3DEnvelopeOpen() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Iniciar música de boda
    startMusic();

    if (window.gsap) {
      const tl = gsap.timeline();

      // 1. Ocultar indicador inferior de inmediato
      if (envPromptBox) {
        tl.to(envPromptBox, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            envPromptBox.style.pointerEvents = 'none';
          }
        });
      }

      // 2. Sello de lacre salta suavemente y se desvanece
      tl.to('#wax-seal-btn', {
        scale: 1.15,
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.out'
      }, '-=0.1')
      // 3. Las solapas laterales se abren suavemente hacia los lados en 3D
      .to('#door-left', {
        rotateY: -105,
        duration: 0.65,
        ease: 'power2.inOut'
      }, '-=0.15')
      .to('#door-right', {
        rotateY: 105,
        duration: 0.65,
        ease: 'power2.inOut'
      }, '<')
      // 4. Se desvanece directamente a la pantalla con todos los datos
      .to('#envelope-overlay', {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          envelopeOverlay.style.display = 'none';
          // Revelar suite nupcial con los datos completos
          revealMainCards();
          // Lanzar confeti triunfal justo al ingresar a los datos
          launchRoyalConfetti();
        }
      }, '-=0.35');
    } else {
      // Fallback simple si GSAP tardara en responder
      if (doorLeft) doorLeft.style.transform = 'rotateY(-105deg)';
      if (doorRight) doorRight.style.transform = 'rotateY(105deg)';
      if (waxSealBtn) waxSealBtn.style.opacity = '0';
      if (envPromptBox) envPromptBox.style.display = 'none';
      setTimeout(() => {
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
          envelopeOverlay.style.display = 'none';
          revealMainCards();
          launchRoyalConfetti();
        }, 400);
      }, 500);
    }
  }

  if (waxSealBtn) waxSealBtn.addEventListener('click', trigger3DEnvelopeOpen);
  if (openEnvelopeBtn) openEnvelopeBtn.addEventListener('click', trigger3DEnvelopeOpen);

  // =========================================================
  // 6. GSAP SCROLLTRIGGER REVEAL EN TARJETAS
  // =========================================================
  function revealMainCards() {
    if (!window.gsap) return;

    gsap.utils.toArray('.gsap-reveal').forEach((card) => {
      gsap.fromTo(card, 
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // =========================================================
  // 7. INCLINACIÓN SUAVE EN FOTOS POLAROID (DESKTOP)
  // Las tarjetas principales se aceleran por GPU en CSS para 120 FPS limpios
  // =========================================================
  if (typeof VanillaTilt !== 'undefined' && window.innerWidth > 992) {
    VanillaTilt.init(document.querySelectorAll('.polaroid-card'), {
      max: 6,
      speed: 300,
      glare: true,
      'max-glare': 0.12,
      perspective: 900,
      scale: 1.02
    });
  }

  // =========================================================
  // 8. CARRUSEL TÁCTIL POLAROID (SWIPER 11)
  // =========================================================
  if (typeof Swiper !== 'undefined') {
    new Swiper('.wedding-swiper', {
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 2,
        rotate: true,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // =========================================================
  // 9. CUENTA REGRESIVA EN TIEMPO REAL (20 DE NOVIEMBRE 22:00 HS)
  // =========================================================
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const eventTime = EVENT_CONFIG.date.getTime();
    const distance = eventTime - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================================================
  // 10. MODAL PARA AGENDAR EN CALENDARIOS
  // =========================================================
  const btnAgendar = document.getElementById('btn-agendar');
  const calendarModal = document.getElementById('calendar-modal');
  const calendarCloseBtn = document.getElementById('calendar-close-btn');
  const calLinkGoogle = document.getElementById('cal-link-google');
  const calBtnUniversalIcs = document.getElementById('cal-btn-universal-ics');

  const startTime = '20261121T010000Z'; // UTC (20 Nov 22hs ARG)
  const endTime = '20261121T080000Z';
  const calTitle = encodeURIComponent('Boda de Elías & Adriana 💍');
  const calDesc = encodeURIComponent('Estás invitado a celebrar la boda de Elías y Adriana. Viernes 20 de Noviembre a las 22:00 hs. ¡Te esperamos!');

  calLinkGoogle.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${startTime}/${endTime}&details=${calDesc}`;

  if (btnAgendar) {
    btnAgendar.addEventListener('click', () => {
      calendarModal.classList.add('active');
    });
  }

  if (calendarCloseBtn) {
    calendarCloseBtn.addEventListener('click', () => {
      calendarModal.classList.remove('active');
    });
  }

  calendarModal.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
      calendarModal.classList.remove('active');
    }
  });

  function downloadIcsFile() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitacion Boda Elias y Adriana//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Boda de Elías & Adriana 💍',
      'DESCRIPTION:Estás invitado a celebrar la boda de Elías y Adriana. ¡Te esperamos para compartir una noche mágica e inolvidable!',
      'DTSTART:20261121T010000Z',
      'DTEND:20261121T080000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'boda_elias_y_adriana.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    calendarModal.classList.remove('active');
  }

  if (calBtnUniversalIcs) {
    calBtnUniversalIcs.addEventListener('click', downloadIcsFile);
  }

  // =========================================================
  // 11. CONFIRMAR ASISTENCIA (RSVP POR WHATSAPP)
  // Requisitos solicitados: Costo $26.000, Límite 10 de Noviembre
  // =========================================================
  const rsvpModal = document.getElementById('rsvp-modal');
  const btnOpenRsvpModal = document.getElementById('btn-open-rsvp-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const rsvpForm = document.getElementById('rsvp-form');
  const targetPhoneInput = document.getElementById('target-phone');
  const btnQuickGreeting = document.getElementById('btn-quick-greeting');

  btnOpenRsvpModal.addEventListener('click', () => {
    rsvpModal.classList.add('active');
  });

  modalCloseBtn.addEventListener('click', () => {
    rsvpModal.classList.remove('active');
  });

  rsvpModal.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      rsvpModal.classList.remove('active');
    }
  });

  if (btnQuickGreeting) {
    btnQuickGreeting.addEventListener('click', () => {
      const rawPhone = targetPhoneInput ? targetPhoneInput.value.replace(/\D/g, '') : EVENT_CONFIG.whatsappDefault;
      const phone = rawPhone || EVENT_CONFIG.whatsappDefault;
      const greetingMsg = encodeURIComponent('¡Hola Elías y Adriana! 💕 Les mando un abrazo enorme y mis mejores deseos para su Boda ✨💍');
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${greetingMsg}`, '_blank');
    });
  }

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('guest-fullname').value.trim();
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked').value;
    const message = document.getElementById('guest-message').value.trim();

    let rawPhone = targetPhoneInput ? targetPhoneInput.value.replace(/\D/g, '') : EVENT_CONFIG.whatsappDefault;
    if (!rawPhone || rawPhone.length < 8) {
      rawPhone = EVENT_CONFIG.whatsappDefault;
    }

    const attendanceText = attendanceRadio === 'si' 
      ? '¡Sí, con mucho gusto estaré presente! 💍🎉' 
      : 'Lamentablemente no podré asistir, pero les deseo toda la felicidad del mundo 💌';

    let whatsappText = `¡Hola Elías y Adriana! 💕\n` +
      `Queremos confirmar nuestra asistencia para su Boda 💍✨\n\n` +
      `👤 *Nombre y Apellido:* ${fullname}\n` +
      `🎉 *¿Asistirá?:* ${attendanceText}\n`;

    if (message) {
      whatsappText += `💌 *Mensaje para los novios:* ${message}\n`;
    }

    whatsappText += `\n🎟️ *Costo de entrada:* ${EVENT_CONFIG.ticketPrice}\n` +
      `📅 *Fecha límite para confirmar y saldar:* ${EVENT_CONFIG.deadline}\n`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${rawPhone}&text=${encodedText}`;

    launchRoyalConfetti();
    window.open(whatsappUrl, '_blank');
    rsvpModal.classList.remove('active');
  });

  // =========================================================
  // 12. MODAL SUGERIR CANCIÓN
  // =========================================================
  const songModal = document.getElementById('song-modal');
  const btnSuggestSong = document.getElementById('btn-suggest-song');
  const songCloseBtn = document.getElementById('song-close-btn');
  const songForm = document.getElementById('song-form');

  btnSuggestSong.addEventListener('click', () => {
    songModal.classList.add('active');
  });

  songCloseBtn.addEventListener('click', () => {
    songModal.classList.remove('active');
  });

  songModal.addEventListener('click', (e) => {
    if (e.target === songModal) {
      songModal.classList.remove('active');
    }
  });

  songForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guest = document.getElementById('song-guest-name').value.trim();
    const song = document.getElementById('song-title').value.trim();
    const rawPhone = targetPhoneInput ? targetPhoneInput.value.replace(/\D/g, '') : EVENT_CONFIG.whatsappDefault;
    const phone = rawPhone || EVENT_CONFIG.whatsappDefault;

    const text = encodeURIComponent(`¡Hola! 🎵 Les sugiero esta canción para bailar en su boda:\n\n🎶 *Canción:* ${song}\n👤 *Sugerida por:* ${guest}`);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
    songModal.classList.remove('active');
  });

  // =========================================================
  // 13. CAÑÓN DE CONFETI PROFESIONAL (CANVAS-CONFETTI)
  // Ráfagas en Oro Champagne, Dusty Blue y Blanco Seda
  // =========================================================
  const btnConfetti = document.getElementById('btn-confetti');
  if (btnConfetti) {
    btnConfetti.addEventListener('click', () => {
      launchRoyalConfetti();
    });
  }

  function launchRoyalConfetti() {
    if (typeof confetti === 'function') {
      const colors = ['#c5a572', '#e8d6b8', '#8eb0cb', '#517796', '#ffffff', '#b89150'];

      // Disparo 1: Ráfaga central
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: colors
      });

      // Disparo 2: Lateral izquierdo
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
      }, 150);

      // Disparo 3: Lateral derecho
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 300);
    }
  }

});
