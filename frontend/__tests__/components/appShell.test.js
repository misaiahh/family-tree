import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/components/appShell.js';

describe('AppShell', () => {
  let appShell;

  beforeEach(() => {
    appShell = document.createElement('app-shell');
    document.body.appendChild(appShell);
  });

  afterEach(() => {
    document.body.removeChild(appShell);
  });

  it('should have a shadow root', () => {
    expect(appShell.shadowRoot).toBeTruthy();
  });

  it('should render a nav element in shadow DOM', () => {
    expect(appShell.shadowRoot.querySelector('nav')).toBeTruthy();
  });

  it('should render a main element in shadow DOM', () => {
    expect(appShell.shadowRoot.querySelector('main')).toBeTruthy();
  });

  it('should have a brand link with "Family Tree" text', () => {
    const brand = appShell.shadowRoot.querySelector('nav .brand');
    expect(brand).toBeTruthy();
    expect(brand.textContent).toBe('Family Tree');
    expect(brand.getAttribute('href')).toBe('#tree');
  });

  it('should have navigation links with data-nav attribute', () => {
    const navLinks = appShell.shadowRoot.querySelectorAll('[data-nav]');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have a Tree navigation link', () => {
    const treeLink = [...appShell.shadowRoot.querySelectorAll('[data-nav]')].find(
      (link) => link.textContent.trim() === 'Tree'
    );
    expect(treeLink).toBeTruthy();
    expect(treeLink.getAttribute('href')).toBe('#tree');
  });

  it('should set the active class on the nav link matching the current hash', () => {
    window.location.hash = '#tree';

    // Re-render to pick up the hash change
    appShell.shadowRoot.querySelector('nav').innerHTML = `
      <a href="#tree" data-nav>Tree</a>
    `;

    // Trigger hashchange to update active state
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    const activeLink = appShell.shadowRoot.querySelector('[data-nav].active');
    expect(activeLink.textContent.trim()).toBe('Tree');
  });

  it('should replace main content via setPage', () => {
    const testElement = document.createElement('div');
    testElement.className = 'test-content';
    testElement.textContent = 'Test content';

    appShell.setPage(testElement);

    const main = appShell.shadowRoot.querySelector('main');
    expect(main.querySelector('.test-content')).toBeTruthy();
    expect(main.querySelector('.test-content').textContent).toBe('Test content');
  });

  it('should clear main content before setting a new page', () => {
    const firstContent = document.createElement('div');
    firstContent.className = 'first';
    firstContent.textContent = 'First';
    appShell.setPage(firstContent);

    const secondContent = document.createElement('div');
    secondContent.className = 'second';
    secondContent.textContent = 'Second';
    appShell.setPage(secondContent);

    const main = appShell.shadowRoot.querySelector('main');
    expect(main.querySelector('.first')).toBeFalsy();
    expect(main.querySelector('.second')).toBeTruthy();
  });
});
