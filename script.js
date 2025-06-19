// Fondo de partículas doradas
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
    events: { onhover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 140, line_linked: { opacity: 1 } } }
  }
});

// Apertura del sobre con animación
function abrirInvitacion(boton) {
  const sobre = document.getElementById("sobre");
  sobre.classList.add("abierto");
  boton.style.display = "none";

  const musica = document.getElementById("bg-music");
  musica.volume = 0.3;
  musica.play().catch(() => {});

  setTimeout(() => {
    document.getElementById("pantalla-sobre").style.display = "none";
    document.getElementById("contenido-invitacion").style.display = "flex";
  }, 1200);
}

// Confirmación vía WhatsApp
function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) {
    alert("Por favor, escribe tu nombre.");
    return;
  }
  const mensaje = encodeURIComponent(`Hola, soy ${nombre} y confirmo mi asistencia. ¡Nos vemos en tu fiesta Ángel 🎓!`);
  const numero = "2218095921";
  window.open(`https://wa.me/52${numero}?text=${mensaje}`, "_blank");
}
