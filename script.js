// Vitor Pauli — Mentoria VSD
// Pequenos comportamentos da página

document.addEventListener('DOMContentLoaded', () => {

  // Atualiza o ano no rodapé automaticamente
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.getElementById('nav-links');

btnMobile.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  btnMobile.classList.toggle('aberto');

  const icon = btnMobile.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');

  const isOpen = navLinks.classList.contains('active');
  btnMobile.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    btnMobile.classList.remove('aberto');

    const icon = btnMobile.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');

    btnMobile.setAttribute('aria-expanded', false);
  });
});