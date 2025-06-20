// Activar partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#FFD700" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 3 },
    move: { enable: true, speed: 1 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  }
});

const botonVer = document.getElementById('ver-invitacion');
const main = document.querySelector('.contenido');
const musica = document.getElementById('bg-music');

botonVer.addEventListener('click', () => {
  main.classList.add('visible');
  musica.volume = 0.3;
  musica.play();
  document.querySelector('.hero').style.display = 'none';
});

function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) {
    alert("Por favor, escribe tu nombre.");
    return;
  }
  const mensaje = `Hola, soy ${nombre}. ¡Nos vemos en tu fiesta de graduación! 🎓`;
  const url = `https://wa.me/5212218095921?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
