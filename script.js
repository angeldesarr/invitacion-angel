// Lista de malas palabras (personalízala)
const malasPalabras = ["p3nd3jo", "pndjo", "p3n#jo", "pendejo","pendeja",
"ch1ng4tu", "ching4d4", "ch1ngad4", "chingatumadre", "ching@","chinga tu madre",
"put0", "pvt0", "pvt@", "put@", "püt0", "no mames",
"m4m0n", "mam0n", "mamón", "mam4n",
"culer0", "culer@", "kulero", "cul0", "kul0","qlero",
"v3rg4", "v3rga", "verga", "vrg@", "vrg4",
"n0m4m3s", "nomames", "n0m@m3s", "no m4m3s",
"pinche puta", "p1nch3", "pnch3", "p!nch3",
"h1j0d3pvt4", "hijodeputa", "hijodpt4", "h1j@d3l@ch1ng4d@", "hdp", "mamador","m4m4d0r","pito", "pit0","p1t0",
"vergu3r0", "verg4z0", "vergazo", "verga",
"putaz0", "putazo", "putaz@", "ptz0",
"cabron", "c4br0n", "kbron", "c@brón",
"cul0n", "culon", "kul0n", "kvlon", "kvlo",
"p3rr4", "perra", "p3rro", "perr@", "prr0","perro",
"ch1n@d4", "chin4da", "chinad@", "chngad4","puto", "pvt0", "idiota", "1D10T4"
]; 

function contieneMalasPalabras(texto) {
  texto = texto.toLowerCase();
  return malasPalabras.some(palabra => texto.includes(palabra));
}

// Configurar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLoaImy_Az6qWMcqeN8AR6Q8YH9IvA19c",
  authDomain: "invitaciongraduacion-29f0d.firebaseapp.com",
  databaseURL: "https://invitaciongraduacion-29f0d-default-rtdb.firebaseio.com/",
  projectId: "invitaciongraduacion-29f0d",
  storageBucket: "invitaciongraduacion-29f0d.appspot.com",
  messagingSenderId: "794213474986",
  appId: "1:794213474986:web:6d32fabfcb1e1d2d0526d3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fondo de partículas doradas
particlesJS("particles-js", {
  particles: {
    number: { value: 150 },
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
  strings: ["Bienvenidos", "2 de Agosto, 6:00 PM", "¡Estás cordialmente invitado!"],
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

function confirmarAsistencia() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) return alert("Por favor, escribe tu nombre");

  if (contieneMalasPalabras(nombre)) {
    return alert("Por favor, no uses lenguaje ofensivo");
  }

  const nombreNormalizado = nombre.toLowerCase();

  // Consultar todos los nombres en Firebase
  db.ref("asistentes").once("value").then(snapshot => {
    const datos = snapshot.val();
    if (datos) {
      const nombresExistentes = Object.values(datos).map(a => a.nombre?.toLowerCase().trim());
      const yaExiste = nombresExistentes.includes(nombreNormalizado);
      
      if (yaExiste) {
        return alert("✨ Tu nombre ya está confirmado :)");
      }
    }

    // Si no existe, guardar el nombre
    db.ref("asistentes").push({ nombre })
      .then(() => {
        console.log("Nombre guardado exitosamente");

        const msg = `Hola, soy ${nombre}. ¡Nos vemos en tu fiesta de graduación! 🎓`;
        const link = `https://wa.me/5212218095921?text=${encodeURIComponent(msg)}`;
        window.open(link, "_blank");
      })
      .catch(error => {
        console.error("Error al guardar en Firebase:", error);
        alert("Hubo un error al guardar tu nombre. Intenta de nuevo.");
      });
  }).catch(error => {
    console.error("Error al verificar nombres:", error);
    alert("Ocurrió un error al verificar tu nombre. Intenta más tarde.");
  });
}


function confirmarAsistencia2() {
  db.ref("asistentes").once("value").then(snapshot => {
    const datos = snapshot.val();

    if (!datos) {
      alert("No hay invitados confirmados todavía. confirma con tu nombre :)");
      return;
    }

    const lista = Object.values(datos).filter(x => x.nombre && x.nombre !== "NADA");

    if (lista.length === 0) {
      alert("No hay invitados confirmados todavía. confirma con tu nombre :)");
      return;
    }

    ajustarCanvas();

    estrellas = lista.map(a => ({
      nombre: a.nombre,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5
    }));

    if (!animacionIniciada) {
      animacionIniciada = true;
      animarConstelacion();
    }
  }).catch(error => {
    console.error("Error al leer asistentes:", error);
    alert("Ocurrió un error al obtener los invitados.");
  });
}

// ⏳ Contador regresivo hasta el 2 de agosto a las 6:00 PM
const fechaEvento = new Date("2025-08-02T18:00:00-06:00");
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaEvento - ahora;

  if (diferencia <= 0) {
    document.getElementById("cuenta-regresiva").innerHTML = "🎉 ¡Ya comenzó el evento!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  diasEl.textContent = String(dias).padStart(2, '0');
  horasEl.textContent = String(horas).padStart(2, '0');
  minutosEl.textContent = String(minutos).padStart(2, '0');
  segundosEl.textContent = String(segundos).padStart(2, '0');
}

setInterval(actualizarContador, 1000);
actualizarContador();

// 🌌 Constelación interactiva de invitados

const canvas = document.getElementById("constelacion-canvas");
const ctx = canvas.getContext("2d");

function ajustarCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

let animacionIniciada = false;
let estrellas = [];
// leer desde la base de datos
db.ref("asistentes").on("value", snapshot => {
  const datos = snapshot.val() || {};
  const lista = Object.values(datos);

  ajustarCanvas();

  // Mapa para estrellas actuales por nombre
  const mapaEstrellas = {};
  estrellas.forEach(e => {
    mapaEstrellas[e.nombre] = e;
  });

  const nuevasEstrellas = [];

  lista.forEach(a => {
    if (mapaEstrellas[a.nombre]) {
      nuevasEstrellas.push(mapaEstrellas[a.nombre]);
    } else {
      nuevasEstrellas.push({
        nombre: a.nombre,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }
  });

  estrellas = nuevasEstrellas;

  if (!animacionIniciada) {
    animacionIniciada = true;
    animarConstelacion();
  }
});

function animarConstelacion() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  estrellas.forEach(e => {
    // Mover estrella
    e.x += e.vx;
    e.y += e.vy;

    // Rebotar contra los bordes del canvas
    if (e.x < 0 || e.x > canvas.width) e.vx *= -1;
    if (e.y < 0 || e.y > canvas.height) e.vy *= -1;

    // Dibujar estrella
    ctx.beginPath();
    ctx.arc(e.x, e.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFD700";
    ctx.fill();

    // Dibujar nombre
    ctx.font = "13px Montserrat";
    ctx.fillStyle = "#fff";
    ctx.fillText(e.nombre, e.x + 6, e.y - 6);
  });

  // Dibujar conexiones entre estrellas cercanas
  for (let i = 0; i < estrellas.length; i++) {
    for (let j = i + 1; j < estrellas.length; j++) {
      const dx = estrellas[i].x - estrellas[j].x;
      const dy = estrellas[i].y - estrellas[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(estrellas[i].x, estrellas[i].y);
        ctx.lineTo(estrellas[j].x, estrellas[j].y);
        ctx.strokeStyle = "rgba(255, 215, 0, 0.2)";
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animarConstelacion);
}

const videoDivertido = document.getElementById("video-divertido");

videoDivertido.addEventListener("play", () => {
  if (!musica.paused) musica.pause();
});

videoDivertido.addEventListener("ended", () => {
  musica.play();
});
