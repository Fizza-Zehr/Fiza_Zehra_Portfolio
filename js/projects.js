"use strict";

function getAllTags(projects) {
  const tagSet = new Set();
  projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)));
  return ["All", ...Array.from(tagSet).sort()];
}

function renderProjectCard(project) {
  const tagChips = project.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");

  const links = project.repoUrl
    ? `<a href="${project.repoUrl}" class="project-card__link" target="_blank" rel="noopener noreferrer">View on GitHub →</a>`
    : `<span class="project-card__link project-card__link--muted">Portfolio project</span>`;

  return `
    <article class="project-card" data-tags="${project.tags.join("|")}">
      <div class="project-card__top">
        <span class="project-card__glyph" aria-hidden="true">${project.glyph}</span>
        <span class="project-card__year">${project.year}</span>
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__summary">${project.summary}</p>
      <div class="project-card__tags">${tagChips}</div>
      <div class="project-card__links">
        ${links}
      </div>
    </article>
  `;
}

function renderFilterChips(tags, activeTag) {
  const filterBar = document.getElementById("filterBar");
  if (!filterBar) return;

  filterBar.innerHTML = tags
    .map(
      (tag) => `
      <button type="button" class="filter-chip${tag === activeTag ? " is-active" : ""}" data-tag="${tag}">
        ${tag}
      </button>`
    )
    .join("");

  filterBar.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBar.querySelectorAll(".filter-chip").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderProjects(btn.dataset.tag);
    });
  });
}

function renderProjects(activeTag) {
  const grid = document.getElementById("projectGrid");
  const emptyState = document.getElementById("projectsEmpty");
  if (!grid) return;

  const filtered =
    !activeTag || activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.tags.includes(activeTag));

  grid.innerHTML = filtered.map(renderProjectCard).join("");

  if (emptyState) {
    emptyState.hidden = filtered.length > 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tags = getAllTags(PROJECTS);
  renderFilterChips(tags, "All");
  renderProjects("All");
});
