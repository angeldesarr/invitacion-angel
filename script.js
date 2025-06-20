const sobre = document.getElementById('sobre');
const invitacion = document.getElementById('invitacion');
const musica = document.getElementById('bg-music');

document.getElementById('btnAbrir').addEventListener('click', () => {
  sobre.classList.add('zoom');
  musica.volume = 0.4;
  musica.play().catch(() => {});
  
  setTimeout(() => {
    document.getElementById('sobre-container').remove();
    invitacion.classList.add('show');
    invitacion.hidden = false;
    document.body.style.overflow = 'auto';
  }, 1000);
});

document.getElementById('btnConfirmar').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) return alert('Escribe tu nombre.');
  window.open(
    `https://wa.me/52${'2218095921'}?text=${encodeURIComponent(`Hola, soy ${nombre} y confirmo mi asistencia 🎓`)}`,
    '_blank'
  );
});

// Configuración de partículas
particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    color: { value: '#e0b84f' },
    shape: { type: 'circle' },
    opacity: { value: 0.6 },
    size: { value: 3, random: true },
    line_linked: { enable: true, color: '#e0b84f' },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: 'grab' } }
  }
});
