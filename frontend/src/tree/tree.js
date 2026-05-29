/**
 * Tree page — renders the family tree visualization.
 * Loads data via the repository and delegates rendering to child web components.
 */
import repository from './repository.js';
import './components/personCard.js';
import './components/familyGroup.js';
import './components/familyTree.js';

export class Tree extends HTMLElement {
  #familyData = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#loadData();
  }

  async #loadData() {
    try {
      this.#familyData = await repository.getFamily();
      this.#render();
    } catch {
      this.#renderError();
    }
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .subtitle {
          text-align: center;
          color: #888;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .tree-container {
          max-width: 800px;
          margin: 0 auto;
          overflow-x: auto;
          padding: 1rem 0;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: #999;
        }

        .error {
          text-align: center;
          padding: 3rem;
          color: #c0392b;
        }
      </style>

      <h1>Family Tree</h1>
      <p class="subtitle">First generation</p>

      <div class="tree-container">
        <family-tree></family-tree>
      </div>
    `;

    // Assign data via property (not HTML attribute — standard web components
    // don't support Lit-style property binding like .prop='value')
    const familyTree = this.shadowRoot.querySelector('family-tree');
    familyTree.family = this.#familyData;
  }

  #renderError() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .error {
          text-align: center;
          padding: 3rem;
          color: #c0392b;
        }
      </style>

      <h1>Family Tree</h1>
      <p class="error">Failed to load family data.</p>
    `;
  }
}

customElements.define('tree-view', Tree);
