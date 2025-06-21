// Fondo de partículas doradas
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

// Typed.js para título
new Typed("#typed-text", {
  strings: ["Graduación Ángel Pérez Santos", "1º de Agosto, 6:00 PM", "¡Estás cordialmente invitado!"],
  typeSpeed: 50,
  backSpeed: 25,
  loop: true
});

// Mostrar contenido + iniciar música
const boton = document.getElementById("btn-ver");
const musica = document.getElementById("bg-music");

boton.addEventListener("click", () => {
  musica.volume = 0.4;
  musica.play();
  document.querySelector(".entrada").style.display = "none";
  document.querySelector(".contenido").classList.add("visible");

  // Animar secciones con GSAP
  gsap.utils.toArray(".scroll").forEach(section => {
    gsap.fromTo(section, 
      { opacity: 0, y: 40 }, 
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        duration: 1
      }
    );
  });
});

// Confirmar asistencia por WhatsApp
function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) return alert("Por favor, escribe tu nombre");
  const msg = `Hola, soy ${nombre}. ¡Nos vemos en tu fiesta de graduación! 🎓`;
  const link = `https://wa.me/5212218095921?text=${encodeURIComponent(msg)}`;
  window.open(link, "_blank");
}
