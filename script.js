// Single-page navigation: each section of the site is a <div class="page">
// with an id like "page-about". The link that opens it just points to
// "#about" — normal anchor behaviour, so back/forward and shareable links
// (e.g. yoursite.vercel.app/#projects) all keep working.
function showPageFromHash() {
  const id = (window.location.hash || '#home').replace('#', '');
  const pages = document.querySelectorAll('.page');
  let matched = false;
  pages.forEach((page) => {
    if (page.id === `page-${id}`) {
      page.classList.add('active');
      matched = true;
    } else {
      page.classList.remove('active');
    }
  });
  if (!matched) {
    const home = document.getElementById('page-home');
    if (home) home.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

window.addEventListener('hashchange', showPageFromHash);
document.addEventListener('DOMContentLoaded', showPageFromHash);

// Email link: still tries to open the visitor's mail app (mailto:), but
// also copies the address to the clipboard and shows a "Copied!" tooltip —
// so something visible happens even if no mail app is set as default.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-email').forEach((el) => {
    el.addEventListener('click', () => {
      const email = el.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).catch(() => {});
      }
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 1500);
    });
  });
});