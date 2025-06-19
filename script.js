// Inicializa fondo de partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#e0b84f" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: { enable: true, color: "#e0b84f" },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" }
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } }
    }
  }
});

// Confirmación por WhatsApp
function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) {
    alert("Por favor, escribe tu nombre para confirmar.");
    return;
  }
  const mensaje = encodeURIComponent(`Hola, soy ${nombre} y confirmo mi asistencia. ¡Nos vemos en tu fiesta Ángel 🎓!`);
  const numero = "2218095921";
  window.location.href = `https://wa.me/52${numero}?text=${mensaje}`;
}
