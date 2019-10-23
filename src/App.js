import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';

class App extends Component {

  constructor(){
    super()
    this.state = {currTime: null,
    }

  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
          currTime: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        })
      },1000)
  }
  
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <p>
              Blackjack { new Date().getFullYear() } { this.state.currTime }
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
