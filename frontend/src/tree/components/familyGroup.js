/**
 * Family group — renders a couple side by side with their children below.
 * Shows connector lines between the couple and the children.
 */
export class FamilyGroup extends HTMLElement {
  #parents = [];
  #kids = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  /** Set parents as an array of person objects. */
  set parents(value) {
    this.#parents = Array.isArray(value) ? value : [];
    this.#render();
  }

  get parents() {
    return this.#parents;
  }

  /** Set children as an array of person objects. */
  set childrenData(value) {
    this.#kids = Array.isArray(value) ? value : [];
    this.#render();
  }

  get childrenData() {
    return this.#kids;
  }

  #render() {
    const hasChildren = this.#kids.length > 0;
    const parentCount = this.#parents.length;
    const childCount = this.#kids.length;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 2rem;
        }

        .couple-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .connector-h {
          width: 40px;
          height: 2px;
          background: #ccc;
          align-self: center;
        }

        .connector-v {
          width: 2px;
          height: 64px;
          background: #ccc;
          margin: 0 auto;
        }

        .children-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .children-h-line {
          height: 2px;
          background: #ccc;
        }

        .children-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 2rem;
        }

        .child-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .child-connector {
          width: 2px;
          height: 16px;
          background: #ccc;
        }

        .hidden {
          display: none;
        }
      </style>

      <div class="couple-row"></div>
      <div class="children-section ${hasChildren ? '' : 'hidden'}">
        <div class="connector-v"></div>
        <div class="children-h-line"></div>
        <div class="children-wrapper"></div>
      </div>
    `;

    const coupleRow = this.shadowRoot.querySelector('.couple-row');
    const childrenWrapper = this.shadowRoot.querySelector('.children-wrapper');
    const childrenHLine = this.shadowRoot.querySelector('.children-h-line');

    // Create person cards for parents
    for (let i = 0; i < parentCount; i++) {
      const card = document.createElement('person-card');
      card.person = this.#parents[i];
      coupleRow.appendChild(card);
      // Add horizontal connector between parents (but not after the last one)
      if (i < parentCount - 1) {
        const conn = document.createElement('div');
        conn.className = 'connector-h';
        coupleRow.appendChild(conn);
      }
    }

    // Set horizontal line width to span from center of first child to center of last child
    if (childCount > 1) {
      const cardWidth = 140;
      const gap = 32;
      childrenHLine.style.width = `${cardWidth + gap * (childCount - 1)}px`;
    }

    // Create person cards for children in columns
    for (const child of this.#kids) {
      const col = document.createElement('div');
      col.className = 'child-col';
      const connector = document.createElement('div');
      connector.className = 'child-connector';
      const card = document.createElement('person-card');
      card.person = child;
      col.appendChild(connector);
      col.appendChild(card);
      childrenWrapper.appendChild(col);
    }
  }
}

customElements.define('family-group', FamilyGroup);
