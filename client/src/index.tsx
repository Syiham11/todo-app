import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import { StateProvider, reducer } from './state';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={ reducer }>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);