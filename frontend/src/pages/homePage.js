/**
 * Home page — landing view with overview and quick links.
 */
export class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        p {
          color: #555;
          line-height: 1.6;
          max-width: 600px;
        }

        .actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        .btn {
          display: inline-block;
          padding: 0.6rem 1.25rem;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: background 0.15s, transform 0.1s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-primary {
          background: #1a73e8;
          color: #fff;
        }

        .btn-primary:hover {
          background: #1557b0;
        }

        .btn-secondary {
          background: #e8f0fe;
          color: #1a73e8;
        }

        .btn-secondary:hover {
          background: #d2e3fc;
        }
      </style>

      <h1>Welcome to Family Tree</h1>
      <p>
        Explore your family history. View your tree, search for individuals,
        and manage your genealogical data — all locally on your machine.
      </p>

      <div class="actions">
        <a href="#tree" class="btn btn-primary">View Tree</a>
        <a href="#tree" class="btn btn-secondary">Add Person</a>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
