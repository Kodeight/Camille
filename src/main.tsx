try {
  let realFetch = window.fetch ? window.fetch.bind(window) : null;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get: () => realFetch,
    set: (val) => {
      realFetch = val;
    },
  });
} catch (_) {
  // Ignore
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
