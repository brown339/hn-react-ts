import './App.css';

import React from 'react';

import Main from './components/main/Main';
import Nav from './components/nav/Nav';

interface Props { }

const App = (props: Props) => (
  <div className="container">
    <Nav />
    <Main />
  </div>
);

export default App;
