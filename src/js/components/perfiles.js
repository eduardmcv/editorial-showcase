export function initPerfiles() {
  const botones = document.querySelectorAll(".perfiles__btn");
  const polaroids = document.querySelectorAll(".perfiles__polaroid");
  const bloques = document.querySelectorAll(".perfiles__bloque");
  const canvas = document.getElementById("perfilesCanvas");

  if (!botones.length || !canvas) return;

  // Navegación entre perfiles
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const perfil = btn.dataset.perfil;

      // Actualizar botones
      botones.forEach((b) => b.classList.remove("activa"));
      btn.classList.add("activa");

      // Actualizar polaroids
      polaroids.forEach((p) => p.classList.remove("activa"));
      const polaroidActiva = document.querySelector(
        `.perfiles__polaroid[data-perfil="${perfil}"]`,
      );
      // Pequeño delay para que se note la salida antes de la entrada
      setTimeout(() => {
        if (polaroidActiva) polaroidActiva.classList.add("activa");
      }, 150);

      // Actualizar textos
      bloques.forEach((b) => b.classList.remove("activa"));
      const bloqueActivo = document.querySelector(
        `.perfiles__bloque[data-perfil="${perfil}"]`,
      );
      if (bloqueActivo) {
        bloqueActivo.classList.add("activa");
        // Ajustar altura del contenedor suavemente
        const textos = document.querySelector(".perfiles__textos");
        textos.style.height = bloqueActivo.offsetHeight + "px";
      }
    });
  });

  // Activar primer botón
  botones[0].classList.add("activa");

  // Canvas — Rejilla barrel distortion
  initCanvas(canvas);

  // Altura inicial del primer bloque
  const textos = document.querySelector(".perfiles__textos");
  const primerBloque = document.querySelector(".perfiles__bloque.activa");
  if (textos && primerBloque) {
    textos.style.height = primerBloque.offsetHeight + "px";
  }
}

function initCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  let width, height;
  let offsetX = 0;
  let offsetY = 0;

  const gridSize = 50;
  const speedX = 0.3;
  const speedY = 0.4;
  const distortionStrength = 0.2;
  const lineColor = "#131313";
  const stepDetail = 4;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  window.addEventListener("resize", resize);
  resize();

  function distort(x, y) {
    const scale = Math.max(width, height);
    const nx = (2 * x - width) / scale;
    const ny = (2 * y - height) / scale;
    const r2 = nx * nx + ny * ny;
    const factor = 1 + distortionStrength * r2;
    return {
      x: (nx * factor * scale) / 2 + width / 2,
      y: (ny * factor * scale) / 2 + height / 2,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.15,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7,
    );
    vignette.addColorStop(0, "rgb(11, 11, 11)");
    vignette.addColorStop(1, "rgba(10, 10, 10, 1)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    const margin = gridSize * 6;

    for (let y = -margin; y < height + margin; y += gridSize) {
      ctx.beginPath();
      const currentY = y - (offsetY % gridSize);
      for (let x = -margin; x <= width + margin; x += stepDetail) {
        const p = distort(x, currentY);
        if (x === -margin) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (let x = -margin; x <= width + margin; x += gridSize) {
      ctx.beginPath();
      const currentX = x - (offsetX % gridSize);
      for (let y = -margin; y <= height + margin; y += stepDetail) {
        const p = distort(currentX, y);
        if (y === -margin) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    offsetX += speedX;
    offsetY += speedY;
    requestAnimationFrame(draw);
  }

  draw();
}
