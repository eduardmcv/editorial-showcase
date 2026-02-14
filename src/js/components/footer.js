export function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    <div class="footer__top">
      <div class="footer__container">
        <div class="footer__brand">20minutos</div>
        <div class="footer__copy">
          <span class="footer__text">Una publicación de:</span>
          <strong class="footer__editor">20 MINUTOS EDITORA, S.L.</strong>
        </div>
      </div>
    </div>

    <div class="footer__middle">
      <div class="footer__container">
        <nav class="footer__nav">
          <a href="#" class="footer__link">Aviso legal</a>
          <a href="#" class="footer__link">Política de privacidad</a>
          <a href="#" class="footer__link">Política de cookies</a>
          <a href="#" class="footer__link">Transparencia</a>
          <a href="#" class="footer__link">Contacto</a>
          <a href="#" class="footer__link">Quiénes somos</a>
        </nav>
        <div class="footer__social">
          <a href="#" class="footer__social-link">Facebook</a>
          <a href="#" class="footer__social-link">X</a>
          <a href="#" class="footer__social-link">Instagram</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__container">
        <span class="footer__copyright-editor">© 20 Minutos Editora, S.L.</span>
        <p class="footer__copyright-text">Queda prohibida toda reproducción sin permiso escrito de la empresa.</p>
      </div>
    </div>
  `;

  return footer;
}
