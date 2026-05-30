/**
 * Person card — renders a single person's photo, name, and role.
 */
export class PersonCard extends HTMLElement {
  #person = null;

  static get observedAttributes() {
    return ['name', 'role', 'birth-year'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  /** Set person data as a property (preferred over attributes). */
  set person(value) {
    this.#person = value;
    this.#render();
  }

  get person() {
    return this.#person;
  }

  #render() {
    const { name = 'Unknown', role = '', birthYear = '' } = this.#person || {};

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          text-align: center;
          width: 140px;
        }

        .card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 1rem 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          transition: box-shadow 0.15s;
        }

        .card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .photo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #e8f0fe;
          margin: 0 auto 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #1a73e8;
          overflow: hidden;
        }

        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name {
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.15rem;
        }

        .role {
          font-size: 0.8rem;
          color: #888;
        }

        .birth-year {
          font-size: 0.75rem;
          color: #aaa;
          margin-top: 0.25rem;
        }
      </style>

      <div class="card">
        <div class="photo">
          ${this.#person?.photo
            ? `<img src="${this.#person.photo}" alt="${name}" />`
            : '👤'}
        </div>
        <div class="name">${name}</div>
        <div class="role">${role}</div>
        ${birthYear ? `<div class="birth-year">b. ${birthYear}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('person-card', PersonCard);
