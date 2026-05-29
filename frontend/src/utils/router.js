/**
 * Lightweight hash-based SPA router.
 * Maps URL hash fragments to web component custom element names.
 */
export class Router {
  #routes = new Map();
  #container = null;

  constructor(container) {
    this.#container = container;
    window.addEventListener('hashchange', () => this.#navigate());
  }

  /**
   * Register a route.
   * @param {string} path - URL hash fragment (e.g. 'home', 'tree')
   * @param {string} tagName - Custom element name to render (e.g. 'home-page')
   */
  route(path, tagName) {
    this.#routes.set(path, tagName);
    return this;
  }

  /** Navigate to a registered path. */
  navigate(path) {
    window.location.hash = path;
  }

  /** Get the current active path (without '#'). */
  get currentPath() {
    return (window.location.hash.slice(1) || 'home').split('/')[0];
  }

  /** Start listening for hash changes and perform initial navigation. */
  start() {
    // If no hash is set, default to home
    if (!window.location.hash) {
      window.location.hash = 'home';
      return;
    }
    this.#navigate();
  }

  #navigate() {
    const path = this.currentPath;
    const tagName = this.#routes.get(path);

    if (!tagName) {
      this.#renderNotFound();
      return;
    }

    // Remove all current page components
    this.#container.innerHTML = '';

    // Create and append the page component
    const page = document.createElement(tagName);
    this.#container.appendChild(page);

    // If the component has a connectedCallback-based init, it runs automatically.
    // Some components may need an explicit render call after insertion.
    if (typeof page.render === 'function') {
      page.render();
    }

  }

  #renderNotFound() {
    this.#container.innerHTML = '';
    const notFound = document.createElement('not-found-page');
    this.#container.appendChild(notFound);
  }
}
