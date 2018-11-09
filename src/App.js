import React, { Component } from 'react';
import './App.css';
import Deck from './components/Deck';
import Game from './components/Game';

class App extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <p>
              Blackjack
            </p>
          </header>
        </div>
        <div className="AppBody">
          <Game/>
        </div>
      </div>
    );
  }
}

export default App;
