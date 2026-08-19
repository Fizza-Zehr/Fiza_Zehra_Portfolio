"use strict";

const NAV_LINKS = [
  { page: "home", label: "Home", href: "index.html" },
  { page: "projects", label: "Projects", href: "projects.html" },
  { page: "about", label: "About", href: "about.html" },
  { page: "contact", label: "Contact", href: "contact.html" },
];

function renderNavbar(currentPage) {
  const links = NAV_LINKS.map((link) => {
    const isActive = link.page === currentPage;
    return `<li>
      <a href="${link.href}" class="navbar__link${isActive ? " is-active" : ""}"${isActive ? ' aria-current="page"' : ""}>
        ${link.label}
      </a>
    </li>`;
  }).join("");

  return `
    <div class="navbar">
      <a href="index.html" class="navbar__brand">
        <span class="navbar__brand-mark" aria-hidden="true">✺</span>
        Fiza&nbsp;Zehra
      </a>

      <button type="button" class="navbar__toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </button>

      <nav aria-label="Primary">
        <ul class="navbar__menu" id="navMenu">
          ${links}
        </ul>
      </nav>
    </div>
  `;
}

function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <div class="footer">
      <div class="footer__brand">
        <span class="navbar__brand-mark" aria-hidden="true">✺</span>
        <p>Designing thoughtful experiences and building practical software solutions.</p>
      </div>

      <nav class="footer__links" aria-label="Footer">
        <a href="index.html">Home</a>
        <a href="projects.html">Projects</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>

      <div class="footer__social" aria-label="Social links">
        <a href="https://github.com/Fizza-Zehr" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/fizza-zehra" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:syedafizzazehra.me@gmail.com">Email</a>
      </div>
    </div>
    <p class="footer__copy">© ${year} Fiza Zehra. Built with HTML, CSS &amp; JavaScript.</p>
  `;
}

function initSharedLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const currentPage = document.body.dataset.page || "home";

  if (header) header.innerHTML = renderNavbar(currentPage);
  if (footer) footer.innerHTML = renderFooter();

  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", initSharedLayout);
