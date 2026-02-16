import "../scss/main.scss";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { initPerfiles } from "./components/perfiles.js";

// =============================================
// Componentes — Header y Footer
// =============================================
document.querySelector("#header").appendChild(createHeader());
document.querySelector("#footer").appendChild(createFooter());

// =============================================
// Efectos de scroll — Configuración
// =============================================
const reveal = document.querySelector(".imagen-reveal");
const revealBase = reveal?.querySelector(".imagen-reveal__base");
const revealOverlay = reveal?.querySelector(".imagen-reveal__overlay");

const capas = document.querySelector(".imagen-capas");
const capasBase = capas?.querySelector(".imagen-capas__base");
const capasPatron = capas?.querySelector(".imagen-capas__patron");

// Configuración del patrón UCO
const patronConfig = {
  direction: 1, // -1 = sube, 1 = baja
  distance: 400, // px de recorrido total
  startBottom: 10, // posición inicial en % desde abajo
};

if (capasPatron) {
  capasPatron.style.bottom = patronConfig.startBottom + "%";
}

// =============================================
// Utilidad — Cálculo de progreso en viewport
// =============================================
function getScrollProgress(element, speed = 1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const raw = Math.min(
    Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
    1,
  );
  return Math.min(raw * speed, 1);
}

// =============================================
// Efectos de scroll — Actualización
// =============================================
function updateImageReveal() {
  if (!reveal || !revealBase || !revealOverlay) return;

  const progress = getScrollProgress(reveal, 2.5);

  revealBase.style.filter = `grayscale(${progress * 100}%)`;
  revealBase.style.opacity = 1 - progress * 0.55;
  revealOverlay.style.opacity = progress;
}

function updateImageCapas() {
  if (!capas || !capasBase || !capasPatron) return;

  const progress = getScrollProgress(capas, 1);

  capasBase.style.opacity = 0.5 - progress;

  const offset = progress * patronConfig.distance * patronConfig.direction;
  capasPatron.style.transform = `translateX(-50%) translateY(${offset}px) rotate(1.5deg)`;
}

// =============================================
// Scroll listener optimizado con rAF
// =============================================
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateImageReveal();
      updateImageCapas();
      ticking = false;
    });
    ticking = true;
  }
});

initPerfiles();
