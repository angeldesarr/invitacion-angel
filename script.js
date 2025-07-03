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
            // 🧼 Limpiar el input después de confirmar
    document.getElementById("nombre").value = "";
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
  const minutosPasados = Math.floor((ahora - fechaEvento) / (1000 * 60));

  if (minutosPasados >= 60) {
    document.getElementById("cuenta-regresiva").innerHTML = `
      🍻 ¡Ya vas tarde, pero aún alcanzas Azulitos! ¡Apúrate! 😜
    `;
  } else {
    document.getElementById("cuenta-regresiva").innerHTML = `
      🎉 ¡Ya comenzó la fiesta!
    `;
  }

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


// Coordenadas del salón
const LAT_SALON = 19.0623576;
const LON_SALON = -98.2972204;
// Calcula distancia entre dos puntos geográficos (en metros)
function distanciaEnMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000; // radio de la Tierra en metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function detectarUbicacion() {
  const mensaje = document.getElementById("mensaje-proximidad");

  if (!navigator.geolocation) {
    mensaje.textContent = "❌ Tu navegador no permite geolocalización 😢";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const distancia = distanciaEnMetros(lat, lon, LAT_SALON, LON_SALON);
      const ahora = new Date();
      const diferencia = fechaEvento - ahora;
      const minutosPasados = Math.floor((ahora - fechaEvento) / (1000 * 60));
      const diasAntes = diferencia > 0;

      console.log("Distancia al salón:", distancia, "metros");

     if (diasAntes) {
  mensaje.textContent = "⏳ Aún hay tiempo, la fiesta todavía no comienza...";
} else {
  // Evento ya empezó
  if (minutosPasados <= 30) {
    if (distancia < 100) {
      mensaje.textContent = "🎉 ¡Ya llegaste justo a tiempo! Ven a abrazarme 😄";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 300) {
      mensaje.textContent = "🚶‍♂️ ¡Genial! ya casi llegas, justo a tiempo 🎊";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 700) {
      mensaje.textContent = "📍 ¡Estás cerca! Apresúrate que ya empezó 🎉";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 1500) {
      mensaje.textContent = "🛣️ Vas a la mitad, aún llegas con estilo 😎";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 3000) {
      mensaje.textContent = "🕒 ¿A qué hora llegas? Te estamos esperando!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else {
      mensaje.textContent = "🗺️ ¿Te perdiste? ¡La fiesta ya empezó!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    }
  } else if (minutosPasados <= 60) {
    if (distancia < 100) {
      mensaje.textContent = "🎉 ¡llegaste! Ven a abrazarme";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 300) {
      mensaje.textContent = "😅 Más vale tarde que nunca, ya casi llegas";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 700) {
      mensaje.textContent = "📍 Ya casi, pero apúrate, ¡se están acabando los azulitos!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 1500) {
      mensaje.textContent = "🚗 ¡Vamos! Ya pasó una hora, pero aún hay fiesta!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 3000) {
      mensaje.textContent = "⏰ Ya pasó una hora y sigues lejos, apúrate 🏃‍♂️";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else {
      mensaje.textContent = "🗺️ ¡Sigue el mapa! Aquí seguimos esperándote 🎈";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    }
  } else if (minutosPasados <= 120) {
    if (distancia < 100) {
      mensaje.textContent = "🍸 ¡Bien! Llegaste tarde pero alcanzaste los azulitos!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 300) {
      mensaje.textContent = "🍸 Ya casi llegas, todavía alcanzas los azulitos!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 700) {
      mensaje.textContent = "🍹 Estás cerca, corre que ya comenzó lo bueno!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 1500) {
      mensaje.textContent = "🚗 Ya llevas 2 horas de retraso, ¡apurate!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 3000) {
      mensaje.textContent = "📍 Estás lejos, pero si te apuras aún llegas a brindar!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else {
      mensaje.textContent = "🗺️ ¿A poco ya te rendiste? ¡Aquí seguimos celebrando!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    }
  } else if (minutosPasados <= 180) {
    if (distancia < 100) {
      mensaje.textContent = "😎 ¡llegaste Con 3 horas de retraso! Pero aún hay alcohol 🥳";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 300) {
      mensaje.textContent = "😎 si llegas, te falta nada";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 700) {
      mensaje.textContent = "🍺 Estás cerca, ¡ven la fiesta se puso buena!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 1500) {
      mensaje.textContent = "🚗 ¡Corre! Todavía alcanzas el final del cumbión 🕺";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 3000) {
      mensaje.textContent = "🕳️ ¿Te perdiste? ¡Aquí seguimos enfiestados, no tardes!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else {
      mensaje.textContent = "🥴 La fiesta esta en lo mero bueno y tu lejos apurale";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    }
  } else {
    if (distancia < 100) {
      mensaje.textContent = "🎉 ¡Ya llegaste! Aunque un poquito tarde Bienvenido 😅";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 300) {
      mensaje.textContent = "🥳 Llegaste tarde... pero el abrazo sigue en pie 😄";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 700) {
      mensaje.textContent = "🎶 Ya casi llegas, ¡aún hay música y risas!";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 1500) {
      mensaje.textContent = "🚕 ¡Tarde pero seguro! Dale que todavía hay recuerdos por crear.";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else if (distancia < 3000) {
      mensaje.textContent = "🥴 ¡Se te fue la fiesta! Pero si llegas, aún hay comida 🎵";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    } else {
      mensaje.textContent = "🧭 La fiesta ya lleva rato, pero aquí seguimos dale, !conduce con cuidado¡ ❤️";
      mensaje.textContent += ` Estás a ${Math.round(distancia)} metros.`;
    }
  }
}
    },
    (error) => {
      mensaje.textContent = "❗ No se pudo obtener tu ubicación. Activa permisos 🧭";
      console.error(error);
    }
  );
}

