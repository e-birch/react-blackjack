import React from 'react';
import Player from './Player';
import Deck from './Deck';

type GameState = {
    players: Object[];
    playerName: string;
    deckNumber: number;
    shoe: Object[];
}

class Game extends React.Component<{}, GameState> {

    constructor() {
        super();
        this.state = { 
            players: [],
            playerName: "",
            deckNumber: 0,
            shoe: []
        }
    }

    handlePlayerChange = (event: SyntheticInputEvent<EventTarget>) => {
        this.setState({playerName: event.target.value});
    }

    handleDeckChange = (event: SyntheticInputEvent<EventTarget>) => {
        this.setState({deckNumber: event.target.value});
    }

    handlePlayerSubmit(players) {
        var playersList = players;
        playersList.push(<Player name={this.state.playerName}/>);
        this.setState({players: playersList});
        this.refs.name_input.value = "";
    }

    handleDecksSubmit(decks) {
        console.log("handleDecksSubmit");
        console.log(decks);
        var shoeDeck = <Deck decksNumber={decks}/>
        var shoeArray = shoeDeck.props.cards;
        this.setState({shoe:shoeArray});
        this.refs.number_input.value="";
    }

    displayPlayers(players){
        var playersListtoString = [];
        for (let i=0; i<players.length; i++){
            playersListtoString.push(players[i].props.name)

        }
    
    return playersListtoString.join(", ")
    }

    render() {
        console.log(this.state.players)
        return(
            <div>
                <h2>Enter player name: </h2>
                <input type="text" ref="name_input" onChange={this.handlePlayerChange}/>
                <button onClick={() => this.handlePlayerSubmit(this.state.players) }>Submit</button>
                <h3>Players list:</h3>
                <p>{this.displayPlayers(this.state.players) }</p>
                <h2>Enter number of decks in play: </h2>
                <input type="text" ref="number_input" onChange={this.handleDeckChange}/>
                <button onClick={() => this.handleDecksSubmit(this.state.deckNumber) }>Submit</button>
                {this.state.shoe > 0 &&
                    <div>
                        There <b>{this.state.deckNumber !== 1 ? "are " + this.state.deckNumber + " decks " : "is 1 deck"}</b> in play.
                        <button>Deal!</button>
                    </div>  
                }
            </div>
        );

    }
}


export default Game;