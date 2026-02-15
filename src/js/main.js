import "../scss/main.scss";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";

document.querySelector("#header").appendChild(createHeader());
document.querySelector("#footer").appendChild(createFooter());

// Efecto reveal de imagen con scroll
function initImageReveal() {
  const reveal = document.querySelector(".imagen-reveal");
  if (!reveal) return;

  const base = reveal.querySelector(".imagen-reveal__base");
  const overlay = reveal.querySelector(".imagen-reveal__overlay");

  window.addEventListener("scroll", () => {
    const rect = reveal.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progressRaw = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1,
    );
    const progress = Math.min(progressRaw * 2.5, 1);

    // Base: gana escala de grises y pierde opacidad
    base.style.filter = `grayscale(${progress * 100}%)`;
    base.style.opacity = 1 - progress * 0.55;

    // Overlay: aparece gradualmente
    overlay.style.opacity = progress;
  });
}

initImageReveal();

function initImageCapas() {
  const capas = document.querySelector(".imagen-capas");
  if (!capas) return;

  const base = capas.querySelector(".imagen-capas__base");
  const patron = capas.querySelector(".imagen-capas__patron");

  // Configuración del patrón
  const patronConfig = {
    direction: 1, // -1 = sube, 1 = baja
    distance: 400, // px de recorrido total
    startBottom: 10, // posición inicial en % desde abajo
  };

  // Posición inicial del patrón
  patron.style.bottom = patronConfig.startBottom + "%";

  window.addEventListener("scroll", () => {
    const rect = capas.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progressRaw = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1,
    );
    const progress = Math.min(progressRaw * 1, 1);

    // Casa-abalos desaparece
    base.style.opacity = 0.5 - progress;

    // Patrón se desplaza
    const offset = progress * patronConfig.distance * patronConfig.direction;
    patron.style.transform = `translateX(-50%) translateY(${offset}px) rotate(1.5deg)`;
  });
}

initImageCapas();
