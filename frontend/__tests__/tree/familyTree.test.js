import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/tree/components/familyTree.js';

describe('FamilyTree', () => {
  let tree;

  beforeEach(() => {
    tree = document.createElement('family-tree');
    document.body.appendChild(tree);
  });

  afterEach(() => {
    document.body.removeChild(tree);
  });

  it('should have a shadow root', () => {
    expect(tree.shadowRoot).toBeTruthy();
  });

  it('should render a heading when family data is provided', () => {
    tree.family = {
      parents: [{ name: 'Micky', role: 'Dad' }],
      children: [],
    };

    const h2 = tree.shadowRoot.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Our Family');
  });

  it('should render a family-group component', () => {
    tree.family = {
      parents: [{ name: 'Micky', role: 'Dad' }],
      children: [],
    };

    const familyGroup = tree.shadowRoot.querySelector('family-group');
    expect(familyGroup).toBeTruthy();
  });

  it('should show empty message when no family data', () => {
    tree.family = null;

    const empty = tree.shadowRoot.querySelector('.empty');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toBe('No family data available');
  });

  it('should show empty message when family is undefined', () => {
    tree.family = undefined;

    const empty = tree.shadowRoot.querySelector('.empty');
    expect(empty).toBeTruthy();
  });

  it('should render parents and children in the family group', () => {
    tree.family = {
      parents: [
        { name: 'Micky', role: 'Dad', birthYear: 1985 },
        { name: 'Jen', role: 'Mom', birthYear: 1987 },
      ],
      children: [
        { name: 'Olivia', role: 'Daughter', birthYear: 2010 },
        { name: 'Olenna', role: 'Daughter', birthYear: 2012 },
      ],
    };

    const familyGroup = tree.shadowRoot.querySelector('family-group');
    expect(familyGroup).toBeTruthy();
  });
});
