/**
 * Repository — single source of truth for family tree data.
 * Abstracts away whether data comes from the API or mock.
 * Components call repository methods, not the API directly.
 */
import { fetchFamily, fetchPerson } from './api.js';

const repository = {
  /**
   * Get the full family tree.
   * @returns {Promise<{ parents: import('./models.js').Person[], children: import('./models.js').Person[] }>}
   */
  async getFamily() {
    return fetchFamily();
  },

  /**
   * Get a single person by ID.
   * @param {string} id
   * @returns {Promise<import('./models.js').Person | null>}
   */
  async getPerson(id) {
    return fetchPerson(id);
  },
};

export default repository;
