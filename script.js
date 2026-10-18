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

// Gráfico do hero: anima quando aparece na tela
const chartStrip = document.querySelector('.chart-strip');
if (
  chartStrip &&
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  chartStrip.classList.add('anim');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chartStrip.classList.add('is-visible');
          obs.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(chartStrip);
}

// Abertura: some sozinha e só aparece uma vez por sessão
const abertura = document.getElementById('abertura');
if (abertura) {
  if (document.documentElement.classList.contains('com-abertura')) {
    try { sessionStorage.setItem('abertura-vista', '1'); } catch (e) {}
    setTimeout(() => {
      abertura.classList.add('saiu');
      setTimeout(() => {
        document.documentElement.classList.remove('com-abertura');
      }, 700);
    }, 2600);
  } else {
    abertura.remove();
  }
}

// Menu: sombra ao rolar, barra de progresso e link ativo
const headerEl = document.querySelector('header');
const progressoEl = document.querySelector('.scroll-progress');
const linksMenu = [...document.querySelectorAll('.nav-links nav a[href^="#"]')];
const linkInicio = linksMenu.find((a) => a.getAttribute('href') === '#');

// pares link + seção (ignora o link "#" do Início)
const secoesMenu = linksMenu
  .filter((a) => a.getAttribute('href').length > 1)
  .map((a) => ({ link: a, secao: document.querySelector(a.getAttribute('href')) }))
  .filter((item) => item.secao);

function atualizarMenu() {
  const y = window.scrollY;

  headerEl.classList.toggle('scrolled', y > 10);

  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (progressoEl && total > 0) {
    progressoEl.style.setProperty('--progresso', (y / total).toFixed(3));
  }

  // seção atual: a última cujo topo já passou da linha do menu
  const linha = y + 120;
  let atual = linkInicio;
  secoesMenu.forEach(({ link, secao }) => {
    const topo = secao.getBoundingClientRect().top + y;
    if (topo <= linha) atual = link;
  });
  linksMenu.forEach((l) => l.classList.toggle('is-active', l === atual));
}

window.addEventListener('scroll', atualizarMenu, { passive: true });
window.addEventListener('resize', atualizarMenu);
atualizarMenu();