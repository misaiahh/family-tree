import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/tree/components/personCard.js';

describe('PersonCard', () => {
  let card;

  beforeEach(() => {
    card = document.createElement('person-card');
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  it('should have a shadow root', () => {
    expect(card.shadowRoot).toBeTruthy();
  });

  it('should render a card element', () => {
    expect(card.shadowRoot.querySelector('.card')).toBeTruthy();
  });

  it('should render a photo placeholder when no photo is set', () => {
    card.person = { name: 'Test', role: 'Child' };
    const photo = card.shadowRoot.querySelector('.photo');
    expect(photo).toBeTruthy();
  });

  it('should render the person name', () => {
    card.person = { name: 'Olivia', role: 'Daughter', birthYear: 2010 };
    const name = card.shadowRoot.querySelector('.name');
    expect(name.textContent).toBe('Olivia');
  });

  it('should render the person role', () => {
    card.person = { name: 'Micky', role: 'Dad' };
    const role = card.shadowRoot.querySelector('.role');
    expect(role.textContent).toBe('Dad');
  });

  it('should render the birth year when provided', () => {
    card.person = { name: 'Jen', role: 'Mom', birthYear: 1987 };
    const birthYear = card.shadowRoot.querySelector('.birth-year');
    expect(birthYear.textContent).toBe('b. 1987');
  });

  it('should not render birth year when not provided', () => {
    card.person = { name: 'Olenna', role: 'Daughter' };
    const birthYear = card.shadowRoot.querySelector('.birth-year');
    expect(birthYear).toBeFalsy();
  });

  it('should render a photo image when photo URL is provided', () => {
    card.person = {
      name: 'Micky',
      role: 'Dad',
      photo: '/photos/micky.jpg',
    };
    const img = card.shadowRoot.querySelector('.photo img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/photos/micky.jpg');
  });

  it('should render default avatar emoji when no photo', () => {
    card.person = { name: 'Test' };
    const photo = card.shadowRoot.querySelector('.photo');
    expect(photo.textContent).toContain('👤');
  });
});
