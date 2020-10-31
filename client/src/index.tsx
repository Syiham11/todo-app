import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import { StateProvider, reducer } from './state';

ReactDOM.render(
  <StateProvider reducer={ reducer }>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StateProvider>,
  document.getElementById('root')
);