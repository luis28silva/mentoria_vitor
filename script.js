// Vitor Pauli — Mentoria VSD
// Pequenos comportamentos da página

document.addEventListener('DOMContentLoaded', () => {

  // Atualiza o ano no rodapé automaticamente
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
