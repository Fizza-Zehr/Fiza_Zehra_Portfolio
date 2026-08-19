# Fiza Zehra — Portfolio Site

A four-page personal portfolio for Fiza Zehra (Home, Projects, About, Contact) built with plain HTML, CSS, and JavaScript — traditional multi-page structure, no framework, no client-side router.

## Pages

- **Home** (`index.html`) — hero intro, three highlight cards, a callout into Projects
- **Projects** (`projects.html`) — project cards rendered from a JS data array, with tag filtering
- **About** (`about.html`) — bio, skills list, short timeline
- **Contact** (`contact.html`) — a contact form with client-side validation and a simulated success state

## Structure

```
Portfolio-Site/
├── index.html
├── projects.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── components.js      # shared navbar + footer, injected on every page
│   ├── projects-data.js   # the project array — edit this to add projects
│   ├── projects.js        # renders project cards + tag filter from the array
│   └── contact.js         # contact form validation
└── README.md
```

## How to Run

Open `index.html` in any modern browser — everything is static, no build step or server required. (A local server such as `python3 -m http.server` also works if you prefer serving it.)

## How the Navbar/Footer Stay Consistent Without Repetition

The navbar and footer markup exists in exactly one place: `js/components.js`. Each page only includes two empty placeholders — `<header id="site-header"></header>` and `<footer id="site-footer"></footer>` — plus a `data-page` attribute on `<body>` naming that page. On load, `components.js` builds the navbar and footer HTML from a single `NAV_LINKS` array and injects it into those placeholders, using the page's `data-page` value to mark the matching link as active. Because the actual markup is generated from one function instead of being copy-pasted into four HTML files, a change to the nav (a new link, a footer update) only has to be made once and it's reflected everywhere. The same script also wires up the mobile hamburger toggle after injecting the markup, since the menu doesn't exist in the DOM until that point.

## Notes on the Dynamic Projects Page

`js/projects-data.js` exports a single `PROJECTS` array of plain objects (title, summary, tags, year, links). `js/projects.js` reads that array, builds the tag-filter chips from whatever tags actually exist in the data, and renders one `.project-card` per entry with a template string — there's no hand-written project HTML anywhere. Adding a new project means adding one object to the array; nothing else needs to change.

## Submission Checklist (for you to complete)

- [ ] Record a 1–2 min screen recording navigating every page on both desktop and mobile viewport sizes
- [ ] Upload the video to LinkedIn and tag **Neurofive Solutions**
- [ ] Push this project to a GitHub repo and include the link in your submission
