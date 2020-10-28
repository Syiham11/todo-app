import React from 'react';
import { Helmet } from 'react-helmet-async';

import MenuBar from './components/MenuBar';
import Board from './components/Board';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Todo App</title>
      </Helmet>
      <MenuBar />
      <Board />
      <Footer />
    </React.Fragment>
  );
}

export default App;