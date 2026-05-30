import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/tree/components/familyGroup.js';

describe('FamilyGroup', () => {
  let group;

  beforeEach(() => {
    group = document.createElement('family-group');
    document.body.appendChild(group);
  });

  afterEach(() => {
    document.body.removeChild(group);
  });

  it('should have a shadow root', () => {
    expect(group.shadowRoot).toBeTruthy();
  });

  it('should render a couple row with parent cards', () => {
    group.parents = [
      { name: 'Micky', role: 'Dad' },
      { name: 'Jen', role: 'Mom' },
    ];

    const coupleRow = group.shadowRoot.querySelector('.couple-row');
    expect(coupleRow).toBeTruthy();

    const cards = coupleRow.querySelectorAll('person-card');
    expect(cards.length).toBe(2);
  });

  it('should render a connector between parents', () => {
    group.parents = [
      { name: 'Micky', role: 'Dad' },
      { name: 'Jen', role: 'Mom' },
    ];

    const connector = group.shadowRoot.querySelector('.connector-h');
    expect(connector).toBeTruthy();
  });

  it('should render a children section when children are provided', () => {
    group.parents = [
      { name: 'Micky', role: 'Dad' },
      { name: 'Jen', role: 'Mom' },
    ];
    group.childrenData = [
      { name: 'Olivia', role: 'Daughter' },
      { name: 'Olenna', role: 'Daughter' },
    ];

    const childrenWrapper = group.shadowRoot.querySelector('.children-wrapper');
    expect(childrenWrapper).toBeTruthy();

    const cards = childrenWrapper.querySelectorAll('person-card');
    expect(cards.length).toBe(2);
  });

  it('should hide the children section when no children', () => {
    group.parents = [
      { name: 'Micky', role: 'Dad' },
      { name: 'Jen', role: 'Mom' },
    ];

    const section = group.shadowRoot.querySelector('.children-section');
    expect(section).toBeTruthy();
    expect(section.classList.contains('hidden')).toBe(true);
  });

  it('should render person card data correctly', () => {
    group.parents = [{ name: 'Micky', role: 'Dad', birthYear: 1985 }];
    group.childrenData = [{ name: 'Olivia', role: 'Daughter', birthYear: 2010 }];

    const allCards = group.shadowRoot.querySelectorAll('person-card');
    expect(allCards.length).toBe(2);
  });

  it('should handle empty parents array', () => {
    group.parents = [];
    group.childrenData = [];

    const coupleRow = group.shadowRoot.querySelector('.couple-row');
    expect(coupleRow).toBeTruthy();
  });
});
