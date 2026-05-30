/**
 * Family tree — renders the entire tree from data.
 * Takes a `family` property with { parents: [...], children: [...] }.
 */
export class FamilyTree extends HTMLElement {
  #family = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  /** Set the full family data object. */
  set family(value) {
    this.#family = value;
    this.#render();
  }

  get family() {
    return this.#family;
  }

  #render() {
    if (!this.#family) {
      this.shadowRoot.innerHTML = `
        <style>
          .empty {
            text-align: center;
            padding: 3rem;
            color: #999;
          }
        </style>
        <div class="empty">No family data available</div>
      `;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        h2 {
          text-align: center;
          font-size: 1.25rem;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }
      </style>

      <h2>Our Family</h2>
    `;

    // Create family-group element and set properties directly
    const familyGroup = document.createElement('family-group');
    familyGroup.parents = this.#family.parents;
    familyGroup.childrenData = this.#family.children;
    this.shadowRoot.appendChild(familyGroup);
  }
}

customElements.define('family-tree', FamilyTree);
