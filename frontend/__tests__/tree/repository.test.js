import { describe, it, expect, vi, beforeEach } from 'vitest';
import repository from '../../src/tree/repository.js';

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

describe('Repository', () => {
  describe('getFamily', () => {
    it('should return family data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await repository.getFamily();
      expect(family).toHaveProperty('parents');
      expect(family).toHaveProperty('children');
    });

    it('should return the correct family structure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await repository.getFamily();
      expect(family.parents.length).toBe(2);
      expect(family.children.length).toBe(2);
    });

    it('should return persons with id, name, and role', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockFamily }),
      });

      const family = await repository.getFamily();
      const allPersons = [...family.parents, ...family.children];
      allPersons.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('role');
      });
    });
  });

  describe('getPerson', () => {
    it('should return a person by ID', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockPeople[2] }),
      });

      const person = await repository.getPerson('olivia');
      expect(person).toBeTruthy();
      expect(person.name).toBe('Olivia');
    });

    it('should return null for unknown ID', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      const person = await repository.getPerson('unknown');
      expect(person).toBeNull();
    });
  });
});
