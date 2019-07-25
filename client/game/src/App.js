import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import MainMenu from './Components/MainMenu'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Route exact path="/in-game" component={Game} />
        <Route exact path="/main-menu" component={MainMenu} />
      </BrowserRouter>
    </div>
  );
}

export default App;
