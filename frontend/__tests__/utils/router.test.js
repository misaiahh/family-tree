import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Router } from '../../src/utils/router.js';

describe('Router', () => {
  let container;
  let router;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
    window.location.hash = '';
    router = new Router(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    window.location.hash = '';
  });

  it('should return the current path from the hash', () => {
    window.location.hash = 'tree';
    expect(router.currentPath).toBe('tree');
  });

  it('should default to "tree" when no hash is set', () => {
    window.location.hash = '';
    expect(router.currentPath).toBe('tree');
  });

  it('should ignore path segments after a slash', () => {
    window.location.hash = 'tree/123';
    expect(router.currentPath).toBe('tree');
  });

  it('should default to tree hash when starting with no hash', () => {
    router.start();
    expect(window.location.hash).toBe('#tree');
  });

  it('should call render() on page components that have it', () => {
    let renderCalled = false;
    const tagName = 'test-render-page';

    class TestPage extends HTMLElement {
      render() {
        renderCalled = true;
      }
    }
    customElements.define(tagName, TestPage);

    router.route('test', tagName);
    router.navigate('test');
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(renderCalled).toBe(true);
  });

  it('should replace container content when navigating', () => {
    const tagName = 'test-replace-page';
    class TestPage extends HTMLElement {}
    customElements.define(tagName, TestPage);

    router.route('test', tagName);
    router.navigate('test');
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(container.querySelectorAll(tagName).length).toBe(1);
  });

  it('should render not-found-page when navigating to an unregistered route', () => {
    const notFoundTag = 'not-found-page';
    class NotFoundPage extends HTMLElement {}
    customElements.define(notFoundTag, NotFoundPage);

    // Only register 'tree', then navigate to 'unknown'
    router.route('tree', 'tree');
    router.navigate('unknown');
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(container.querySelector(notFoundTag)).toBeTruthy();
  });

  it('should clear previous content before rendering new page', () => {
    const tagA = 'test-page-a';
    const tagB = 'test-page-b';

    class PageA extends HTMLElement {}
    class PageB extends HTMLElement {}
    customElements.define(tagA, PageA);
    customElements.define(tagB, PageB);

    router.route('a', tagA).route('b', tagB);

    router.navigate('a');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(container.querySelector(tagA)).toBeTruthy();

    router.navigate('b');
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(container.querySelector(tagA)).toBeFalsy();
    expect(container.querySelector(tagB)).toBeTruthy();
  });
});
