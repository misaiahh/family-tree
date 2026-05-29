/**
 * Tree page — visual family tree viewer.
 * Placeholder: will be replaced with actual tree rendering logic.
 */
export class TreePage extends HTMLElement {
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
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          border: 2px dashed #ddd;
          border-radius: 8px;
          color: #999;
          font-size: 0.95rem;
        }
      </style>

      <h1>Family Tree</h1>
      <div class="placeholder">
        Tree visualization will render here
      </div>
    `;
  }
}

customElements.define('tree-page', TreePage);
