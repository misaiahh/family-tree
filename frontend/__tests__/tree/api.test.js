import { describe, it, expect } from 'vitest';
import { fetchFamily, fetchPerson, isBackendAvailable } from '../../src/tree/api.js';

describe('API Client', () => {
  describe('fetchFamily', () => {
    it('should return family data with parents and children', async () => {
      const family = await fetchFamily();
      expect(family).toHaveProperty('parents');
      expect(family).toHaveProperty('children');
    });

    it('should return the correct number of people', async () => {
      const family = await fetchFamily();
      expect(family.parents.length).toBe(2);
      expect(family.children.length).toBe(2);
    });

    it('should return persons with required fields', async () => {
      const family = await fetchFamily();
      const person = family.parents[0];
      expect(person).toHaveProperty('id');
      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('role');
    });
  });

  describe('fetchPerson', () => {
    it('should return a person by ID', async () => {
      const person = await fetchPerson('micky');
      expect(person).toBeTruthy();
      expect(person.name).toBe('Micky');
    });

    it('should return null for unknown ID', async () => {
      const person = await fetchPerson('nonexistent');
      expect(person).toBeNull();
    });
  });

  describe('isBackendAvailable', () => {
    it('should return false when no backend is configured', async () => {
      const available = await isBackendAvailable();
      expect(available).toBe(false);
    });
  });
});
