import React from 'react';
import './global.scss';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

console.log('ссылка на PR  https://github.com/AmdreiMash/Online-Store/pull/6');
