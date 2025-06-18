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

// Música
const music = document.getElementById('bg-music');
document.getElementById('music-btn').addEventListener('click', () => {
  music.volume = 0.3;
  music.play();
  document.getElementById('music-btn').style.display = 'none';
});

// Galería fade-in al scroll
const imgs = document.querySelectorAll('.gallery img');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.3});

imgs.forEach(img => observer.observe(img));

// Confirmar asistencia y WhatsApp
const lista = [];
function confirmar() {
  const n = document.getElementById('nombre').value.trim();
  if (!n) return;
  lista.push(n);
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${n}</td>`;
  document.getElementById('tabla-asistencia').appendChild(tr);
  document.getElementById('nombre').value = '';

  const mensaje = `Hola soy ${encodeURIComponent(n)} y nos vemos en tu fiesta!`;
  const numero = '2218095921';
  window.open(`https://wa.me/52${numero}?text=${mensaje}`, '_blank');
}
