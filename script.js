// Partículas doradas
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#FFD700" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 4 },
    move: { enable: true, speed: 1.5 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  }
});

// Typed.js animación
new Typed('#titulo', {
  stringsElement: null,
  strings: ["Graduación Ángel Pérez Santos", "1º de Agosto, 6:00 PM", "¡Estás cordialmente invitado!"],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});

// Transición e inicio de música
const boton = document.getElementById("btn-invitacion");
const musica = document.getElementById("bg-music");

boton.addEventListener("click", () => {
  musica.volume = 0.3;
  musica.play();
  document.querySelector('.entrada').style.display = "none";
  document.querySelector('.contenido').classList.add("visible");
});

// WhatsApp Confirmación
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
