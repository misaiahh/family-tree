import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchFamily, fetchPerson, isBackendAvailable } from '../../src/tree/api.js';

const mockPeople = [
  { id: 'micky', name: 'Micky', role: 'Dad', birth_year: 1985, death_year: null, photo: null, bio: null, notes: null },
  { id: 'jen', name: 'Jen', role: 'Mom', birth_year: 1987, death_year: null, photo: null, bio: null, notes: null },
  { id: 'olivia', name: 'Olivia', role: 'Daughter', birth_year: 2010, death_year: null, photo: null, bio: null, notes: null },
  { id: 'olenna', name: 'Olenna', role: 'Daughter', birth_year: 2012, death_year: null, photo: null, bio: null, notes: null },
];

const mockFamily = {
  parents: [mockPeople[0], mockPeople[1]],
  children: [mockPeople[2], mockPeople[3]],
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('API Client', () => {
  describe('fetchFamily', () => {
    it('should return family data with parents and children', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await fetchFamily();
      expect(family).toHaveProperty('parents');
      expect(family).toHaveProperty('children');
    });

    it('should return the correct number of people', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await fetchFamily();
      expect(family.parents.length).toBe(2);
      expect(family.children.length).toBe(2);
    });

    it('should return persons with required fields', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await fetchFamily();
      const person = family.parents[0];
      expect(person).toHaveProperty('id');
      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('role');
    });

    it('should throw on API error', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(fetchFamily()).rejects.toThrow('API error: 500');
    });
  });

  describe('fetchPerson', () => {
    it('should return a person by ID', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockPeople[0] }),
      });

      const person = await fetchPerson('micky');
      expect(person).toBeTruthy();
      expect(person.name).toBe('Micky');
    });

    it('should return null for unknown ID', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      const person = await fetchPerson('nonexistent');
      expect(person).toBeNull();
    });
  });

  describe('isBackendAvailable', () => {
    it('should return true when backend responds', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true });

      const available = await isBackendAvailable();
      expect(available).toBe(true);
    });

    it('should return false when backend is unavailable', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const available = await isBackendAvailable();
      expect(available).toBe(false);
    });
  });
});
