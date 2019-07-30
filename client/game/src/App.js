import React from 'react';
import './App.css';
import Game from './Components/Game'
import MainMenu from './Components/MainMenu'
import LoadingScreen from './Components/LoadingScreen'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'
 
class App extends React.Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter >
          <Route exact path="/in-game/:queue" component={Game}/>
          <Route exact path="/main-menu" component={MainMenu}/>
          <Route exact path="/loading-screen" component={LoadingScreen} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
