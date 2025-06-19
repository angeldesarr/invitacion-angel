// Mostrar partículas solo después de abrir carta
function abrirCarta() {
  const sobre = document.getElementById('envelope');
  const contenido = document.getElementById('contenido');
  const music = document.getElementById('bg-music');

  sobre.style.display = 'none';
  contenido.classList.remove('hidden');
  document.getElementById('particles-js').classList.remove('hidden');

  // Iniciar música
  music.volume = 0.3;
  music.play();

  // Iniciar partículas
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#e0b84f" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#e0b84f", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

// Cuenta regresiva
const countdownEl = document.getElementById('countdown');
const targetDate = new Date('2025-08-01T00:00:00');

function updateCountdown() {
  const diff = targetDate - new Date();
  if (diff <= 0) {
    countdownEl.textContent = '¡Hoy es el gran día!';
    return;
  }
  const d = Math.floor(diff / 86400000),
        h = Math.floor((diff % 86400000) / 3600000),
        m = Math.floor((diff % 3600000) / 60000),
        s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Confirmación por WhatsApp
function confirmar() {
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) return alert("Por favor, escribe tu nombre.");
  const mensaje = `Hola soy ${encodeURIComponent(nombre)} y nos vemos en tu fiesta 🎓🎉`;
  const numero = '2218095921';
  window.open(`https://wa.me/52${numero}?text=${mensaje}`, '_blank');
}
