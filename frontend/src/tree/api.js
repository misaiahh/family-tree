/**
 * API client for family tree data.
 * Currently returns mock data. Swap the BASE_URL to connect to a real backend.
 */
import { defaultFamily } from './models.js';

const BASE_URL = ''; // Set to '/api' when backend is running

/**
 * Fetch the family tree data.
 * @returns {Promise<import('./models.js').Family>}
 */
export async function fetchFamily() {
  // When the backend is ready, replace with:
  //   const res = await fetch(`${BASE_URL}/api/family`);
  //   if (!res.ok) throw new Error(`API error: ${res.status}`);
  //   return res.json();

  // Mock: return local data
  return Promise.resolve(defaultFamily);
}

/**
 * Fetch a single person by ID.
 * @param {string} id
 * @returns {Promise<import('./models.js').Person | null>}
 */
export async function fetchPerson(id) {
  // When the backend is ready:
  //   const res = await fetch(`${BASE_URL}/api/family/person/${id}`);
  //   if (!res.ok) return null;
  //   return res.json();

  const family = defaultFamily;
  const person = [
    ...family.parents,
    ...family.children,
  ].find((p) => p.id === id);

  return person || null;
}

/**
 * Check if a backend is available.
 * @returns {Promise<boolean>}
 */
export async function isBackendAvailable() {
  try {
    // When the backend is ready:
    //   const res = await fetch(`${BASE_URL}/api/health`);
    //   return res.ok;
    return false; // No backend yet — use mock data
  } catch {
    return false;
  }
}
