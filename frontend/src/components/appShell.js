/**
 * App shell — top-level layout component with navigation bar.
 * Renders <nav> + <main> where <main> holds the current page component.
 */
export class AppShell extends HTMLElement {
  #main = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          color: #1a1a1a;
          background: #fafafa;
        }

        nav {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          align-items: center;
        }

        nav a {
          color: #1a1a1a;
          text-decoration: none;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background 0.15s;
        }

        nav a:hover {
          background: #f0f0f0;
        }

        nav a.active {
          background: #e8f0fe;
          color: #1a73e8;
        }

        nav .brand {
          font-weight: 700;
          font-size: 1.1rem;
          margin-right: auto;
          color: #1a1a1a;
          text-decoration: none;
        }

        main {
          flex: 1;
          padding: 2rem 1.5rem;
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
        }
      </style>

      <nav>
        <a href="#tree" class="brand">Family Tree</a>
        <a href="#tree" data-nav>Tree</a>
      </nav>

      <main></main>
    `;

    this.#main = this.shadowRoot.querySelector('main');

    // Highlight active nav link
    this.#updateActiveNav();
    window.addEventListener('hashchange', () => this.#updateActiveNav());
  }

  #updateActiveNav() {
    const current = window.location.hash.slice(1) || 'tree';
    this.shadowRoot.querySelectorAll('[data-nav]').forEach((link) => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === current.split('/')[0]);
    });
  }

  /** Replace the main content area with a child element. Called by the router. */
  setPage(element) {
    this.#main.innerHTML = '';
    this.#main.appendChild(element);
  }
}

customElements.define('app-shell', AppShell);
