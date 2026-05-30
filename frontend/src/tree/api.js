/**
 * API client for family tree data.
 * Connects to the Rust backend via /api (proxied in dev, direct in prod).
 */
const BASE_URL = '';

/**
 * Fetch the family tree data.
 * @returns {Promise<import('./models.js').Family>}
 */
export async function fetchFamily() {
  const res = await fetch(`${BASE_URL}/api/family`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json.data;
}

/**
 * Fetch a single person by ID.
 * @param {string} id
 * @returns {Promise<import('./models.js').Person | null>}
 */
export async function fetchPerson(id) {
  const res = await fetch(`${BASE_URL}/api/family/person/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  if (!json.success) return null;
  return json.data;
}

/**
 * Check if a backend is available.
 * @returns {Promise<boolean>}
 */
export async function isBackendAvailable() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
