particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#e0b84f" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3, random: true },
    line_linked: { enable: true, color: "#e0b84f" },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "grab" } }
  }
});

function abrirInvitacion() {
  document.body.classList.remove("no-scroll");
  const sobre = document.getElementById("sobre");
  const musica = document.getElementById("bg-music");
  
  sobre.classList.add("zoom");
  musica.volume = 0.4;
  musica.play();

  setTimeout(() => {
    document.getElementById("pantalla-sobre").style.display = "none";
    document.getElementById("contenido-invitacion").style.display = "flex";
  }, 1000);
}

function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) { alert("Escribe tu nombre."); return; }

  const mensaje = encodeURIComponent(`Hola, soy ${nombre} y confirmo mi asistencia 🎓`);
  const numero = "2218095921";
  window.open(`https://wa.me/52${numero}?text=${mensaje}`, "_blank");
}
