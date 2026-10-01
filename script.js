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
    title: 'Nuestra Boda',
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sincronizar Lenis con GSAP ScrollTrigger
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
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
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(197, 165, 114, 0.6)';

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
  // La canción de casamiento más icónica del mundo ("Here Comes the Bride")
  // Sintetizada con timbre cálido de piano de cola acústico y resonancia nupcial
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
    { mel: N.D4,  dur: 0.38, chord: [N.G2, N.D3], vel: 0.08 },
    { mel: N.G4,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.12 },
    { mel: N.G4,  dur: 0.24, chord: [], vel: 0.07 },
    { mel: N.G4,  dur: 0.65, chord: [N.D3, N.G3, N.B3], vel: 0.09 },

    // Frase 2: "Tan, tan-ta-ran!"
    { mel: N.D4,  dur: 0.38, chord: [N.D3, N.Fs3], vel: 0.08 },
    { mel: N.A4,  dur: 0.72, chord: [N.D3, N.A3, N.Fs4], vel: 0.12 },
    { mel: N.Fs4, dur: 0.24, chord: [], vel: 0.07 },
    { mel: N.G4,  dur: 0.95, chord: [N.G2, N.G3, N.B3], vel: 0.11 },

    // Frase 3: Ascenso melódico nupcial
    { mel: N.D4,  dur: 0.36, chord: [N.G2, N.D3], vel: 0.08 },
    { mel: N.G4,  dur: 0.44, chord: [N.G3, N.B3], vel: 0.09 },
    { mel: N.B4,  dur: 0.44, chord: [N.D3, N.G3], vel: 0.10 },
    { mel: N.D5,  dur: 0.72, chord: [N.G3, N.B3, N.G4], vel: 0.12 },
    { mel: N.B4,  dur: 0.36, chord: [], vel: 0.08 },

    // Frase 4: Cadencia de resolución
    { mel: N.G4,  dur: 0.44, chord: [N.C3, N.E3, N.G3, N.C4], vel: 0.10 },
    { mel: N.A4,  dur: 0.44, chord: [N.D3, N.Fs3, N.A3], vel: 0.10 },
    { mel: N.Fs4, dur: 0.44, chord: [N.D3, N.A3], vel: 0.09 },
    { mel: N.G4,  dur: 1.45, chord: [N.G2, N.D3, N.G3, N.B3], vel: 0.12 },

    // Frase 5: Sección central lírica emotiva
    { mel: N.B4,  dur: 0.44, chord: [N.G2, N.D3, N.G3], vel: 0.09 },
    { mel: N.C5,  dur: 0.36, chord: [], vel: 0.08 },
    { mel: N.D5,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.11 },
    { mel: N.E5,  dur: 0.36, chord: [N.C3, N.G3, N.C4], vel: 0.10 },
    { mel: N.D5,  dur: 0.58, chord: [N.C3, N.E3, N.G3], vel: 0.09 },
    { mel: N.C5,  dur: 0.36, chord: [], vel: 0.08 },
    { mel: N.B4,  dur: 0.58, chord: [N.G2, N.D3, N.G3], vel: 0.09 },
    { mel: N.A4,  dur: 0.36, chord: [N.D3, N.Fs3, N.A3], vel: 0.08 },
    { mel: N.G4,  dur: 1.35, chord: [N.G2, N.G3, N.B3], vel: 0.11 },

    // Frase 6: Reprise solemne final
    { mel: N.D4,  dur: 0.38, chord: [N.G2, N.D3], vel: 0.08 },
    { mel: N.G4,  dur: 0.72, chord: [N.G3, N.B3, N.D4], vel: 0.12 },
    { mel: N.G4,  dur: 0.24, chord: [], vel: 0.07 },
    { mel: N.G4,  dur: 0.65, chord: [N.D3, N.G3, N.B3], vel: 0.09 },
    { mel: N.D4,  dur: 0.38, chord: [N.D3, N.Fs3], vel: 0.08 },
    { mel: N.A4,  dur: 0.72, chord: [N.D3, N.A3, N.Fs4], vel: 0.12 },
    { mel: N.Fs4, dur: 0.24, chord: [], vel: 0.07 },
    { mel: N.G4,  dur: 1.75, chord: [N.G2, N.D3, N.G3, N.B3, N.D4], vel: 0.13 }
  ];

  let currentMarchIndex = 0;

  // Sintetizador de nota con timbre acústico de piano nupcial
  function playPianoVoice(freq, startTime, duration, velocity = 0.09) {
    if (!audioContext || !isPlaying) return;
    try {
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // Oscilador 1: Cuerpo cálido de piano
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Oscilador 2: Armónico sutil ligeramente desafinado para efecto acústico de cuerdas de piano
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      osc2.detune.setValueAtTime(4, startTime);

      // Filtro acústico: ataque brillante que decae suavemente
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, startTime);
      filter.frequency.exponentialRampToValueAtTime(750, startTime + duration);
      filter.Q.setValueAtTime(1.1, startTime);

      // Envolvente de piano: ataque percusivo y decaimiento natural
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
      console.warn('Audio voice error:', e);
    }
  }

  function playMarchStep() {
    if (!isPlaying) return;
    const step = weddingMarchSteps[currentMarchIndex];
    const now = audioContext.currentTime;

    // 1. Tocar nota de la melodía principal
    playPianoVoice(step.mel, now, step.dur * 1.35, step.vel);

    // 2. Tocar acordes armónicos de acompañamiento
    if (step.chord && step.chord.length > 0) {
      step.chord.forEach((chordFreq, idx) => {
        playPianoVoice(chordFreq, now + (idx * 0.02), step.dur * 1.5, step.vel * 0.55);
      });
    }

    currentMarchIndex = (currentMarchIndex + 1) % weddingMarchSteps.length;
    // Espacio entre notas según duración
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
      musicToggleBtn.classList.add('playing');
      musicLabel.textContent = 'Pausar';
      playMarchStep();
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  function pauseMusic() {
    isPlaying = false;
    clearTimeout(marchTimeout);
    musicToggleBtn.classList.remove('playing');
    musicLabel.textContent = 'Música';
  }

  musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  });

  // =========================================================
  // 5. APERTURA 3D DEL SOBRE NUPCIAL CON GSAP (ESTILO INSTAGRAM)
  // =========================================================
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const openEnvelopeBtn = document.getElementById('open-invitation-btn');
  let isEnvelopeOpened = false;

  function trigger3DEnvelopeOpen() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Iniciar música
    startMusic();

    // Lanzar ráfagas de confeti con canvas-confetti
    launchRoyalConfetti();

    if (window.gsap) {
      const tl = gsap.timeline();

      // 1. Sello de lacre salta y se desvanece suavemente
      tl.to('#wax-seal-btn', {
        scale: 1.25,
        opacity: 0,
        y: -15,
        duration: 0.45,
        ease: 'power2.out'
      })
      // 2. Solapa triangular superior se rebate en 3D (180 grados hacia arriba)
      .to('#env-top-flap', {
        rotateX: 180,
        duration: 0.75,
        ease: 'power2.inOut'
      }, '-=0.2')
      // 3. Tarjeta interior se desliza hacia arriba saliendo del sobre
      .to('#env-card', {
        y: -230,
        scale: 1.04,
        zIndex: 50,
        duration: 0.85,
        ease: 'power3.out'
      }, '-=0.35')
      // 4. Todo el sobre se eleva con zoom suave y da paso a la suite nupcial
      .to('#envelope-overlay', {
        opacity: 0,
        scale: 1.06,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          envelopeOverlay.style.display = 'none';
          // Disparar animaciones de revelado de las tarjetas en la página principal
          revealMainCards();
        }
      });
    } else {
      // Fallback simple si GSAP tardara en responder
      envelopeOverlay.style.opacity = '0';
      setTimeout(() => {
        envelopeOverlay.style.display = 'none';
      }, 700);
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
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // =========================================================
  // 7. INICIALIZAR VANILLA-TILT (INCLINACIÓN 3D Y REFLEJO FOIL)
  // =========================================================
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.card-stationery'), {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.18,
      perspective: 1000,
      scale: 1.01
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
  const calTitle = encodeURIComponent('Nuestra Boda 💍');
  const calDesc = encodeURIComponent('Estás invitado a celebrar nuestra boda. ¡Te esperamos para compartir una noche inolvidable!');

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
      'PRODID:-//Invitacion Nuestra Boda//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Nuestra Boda 💍',
      'DESCRIPTION:Estás invitado a celebrar nuestra boda. ¡Te esperamos para compartir una noche inolvidable!',
      'DTSTART:20261121T010000Z',
      'DTEND:20261121T080000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'nuestra_boda.ics');
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
      const greetingMsg = encodeURIComponent('¡Hola! 💕 Les mando un abrazo enorme y mis mejores deseos para su Boda ✨💍');
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

    let whatsappText = `¡Hola! 💕\n` +
      `Queremos confirmar nuestra asistencia para la Boda 💍✨\n\n` +
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
