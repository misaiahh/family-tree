import { describe, it, expect } from 'vitest';
import repository from '../../src/tree/repository.js';

describe('Repository', () => {
  describe('getFamily', () => {
    it('should return family data', async () => {
      const family = await repository.getFamily();
      expect(family).toHaveProperty('parents');
      expect(family).toHaveProperty('children');
    });

    it('should return the correct family structure', async () => {
      const family = await repository.getFamily();
      expect(family.parents.length).toBe(2);
      expect(family.children.length).toBe(2);
    });

    it('should return persons with id, name, and role', async () => {
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
      const person = await repository.getPerson('olivia');
      expect(person).toBeTruthy();
      expect(person.name).toBe('Olivia');
    });

    it('should return null for unknown ID', async () => {
      const person = await repository.getPerson('unknown');
      expect(person).toBeNull();
    });
  });
});
