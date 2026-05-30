import { Router } from './utils/router.js';
import './components/appShell.js';
import './tree/tree.js';
import './styles/global.css';

// Wait for custom elements to be upgraded, then get the main container
// from inside app-shell's shadow DOM.
customElements.whenDefined('app-shell').then(() => {
  const appShell = document.querySelector('app-shell');
  const main = appShell?.shadowRoot?.querySelector('main');

  // Register routes: path → custom element tag name
  const router = new Router(main);
  router.route('tree', 'tree-view');

  // Boot — default to tree view
  router.start();
});
