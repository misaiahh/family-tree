import { Router } from './utils/router.js';
import './components/appShell.js';
import './pages/homePage.js';
import './pages/treePage.js';
import './styles/global.css';

// Register routes: path → custom element tag name
const router = new Router(document.querySelector('main'));
router
  .route('home', 'home-page')
  .route('tree', 'tree-page');

// Boot
router.start();
