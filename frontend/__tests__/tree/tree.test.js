import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../src/tree/tree.js';
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
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true, data: mockFamily }),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = document.createElement('tree-view');
    document.body.appendChild(tree);
  });

  afterEach(() => {
    document.body.removeChild(tree);
  });

  it('should have a shadow root', () => {
    expect(tree.shadowRoot).toBeTruthy();
  });

  it('should render a heading after data loads', async () => {
    await waitForRender(tree);
    expect(tree.shadowRoot.querySelector('h1')).toBeTruthy();
  });

  it('should render a subtitle after data loads', async () => {
    await waitForRender(tree);
    expect(tree.shadowRoot.querySelector('.subtitle')).toBeTruthy();
  });

  it('should render a tree container after data loads', async () => {
    await waitForRender(tree);
    expect(tree.shadowRoot.querySelector('.tree-container')).toBeTruthy();
  });

  it('should render a family-tree component after data loads', async () => {
    await waitForRender(tree);
    expect(tree.shadowRoot.querySelector('family-tree')).toBeTruthy();
  });

  it('should render family data loaded from the repository', async () => {
    const familyData = await repository.getFamily();
    expect(familyData).toHaveProperty('parents');
    expect(familyData).toHaveProperty('children');
    expect(familyData.parents.length).toBe(2);
    expect(familyData.children.length).toBe(2);
  });
});

/**
 * Wait for the tree component to finish loading data and rendering.
 */
function waitForRender(el, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (el.shadowRoot?.querySelector('family-tree')) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject(new Error('Timeout waiting for tree render'));
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}
