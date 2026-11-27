import { initTheme } from './theme.js';
import { initCatalog } from './catalog.js';
import { initBuild } from './build.js';
import { initCompare } from './compare.js';

initTheme();
const page = document.body.className;
if (page === 'page-catalog') initCatalog();
if (page === 'page-build') initBuild();
if (page === 'page-compare') initCompare();
