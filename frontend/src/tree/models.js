/**
 * Data models for the family tree.
 * These types mirror what the SQLite backend will expose via the API.
 */

/**
 * @typedef {Object} Person
 * @property {string} id - Unique identifier (e.g. 'micky', 'jen')
 * @property {string} name - Display name
 * @property {string} role - Relationship role (e.g. 'Dad', 'Mom', 'Daughter', 'Son')
 * @property {number} [birthYear] - Year of birth
 * @property {string} [deathYear] - Year of death (if deceased)
 * @property {string} [photo] - URL to photo asset
 * @property {string} [bio] - Short biography
 * @property {string} [notes] - Additional notes
 */

/**
 * @typedef {Object} Family
 * @property {Person[]} parents - Parent/couple entries
 * @property {Person[]} children - Children entries
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {Family} [data] - Present on success
 * @property {string} [error] - Present on failure
 */

/**
 * Default family data used when no backend is available.
 * Replace with API calls once the backend is running.
 */
export const defaultFamily = {
  parents: [
    {
      id: 'micky',
      name: 'Micky',
      role: 'Dad',
      birthYear: 1985,
      photo: null,
    },
    {
      id: 'jen',
      name: 'Jen',
      role: 'Mom',
      birthYear: 1987,
      photo: null,
    },
  ],
  children: [
    {
      id: 'olivia',
      name: 'Olivia',
      role: 'Daughter',
      birthYear: 2010,
      photo: null,
    },
    {
      id: 'olenna',
      name: 'Olenna',
      role: 'Daughter',
      birthYear: 2012,
      photo: null,
    },
  ],
};
