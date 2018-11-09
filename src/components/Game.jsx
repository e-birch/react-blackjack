import React from 'react';
import Player from './Player';
import { createShoe, displayCards } from './Deck.js';

type GameState = {
    players: object[];
    playerName: string;
    deckNumber: number;
    shoe: object[];
    dealerCards: object[];
}

class Game extends React.Component<{}, GameState> {

    constructor() {
        super();
        this.state = { 
            players: [],
            playerName: "",
            deckNumber: 0,
            shoe: [],
            dealerCards: []
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
        var shoeArray = createShoe(decks);
        this.setState({shoe:shoeArray});
        this.refs.number_input.value="";
    }

    handleDealCards(players, shoe){
        for (let i=0;i<2;i++){
            for (let j=0;j<players.length;j++){
                var newPlayerCards = players[j].props.cards;
                newPlayerCards.push(shoe[0]);
                players[j].setState({cards:newPlayerCards});
                shoe.splice(0,1);
            }
        }
        this.setState({shoe:shoe});
    }

    displayPlayerCards(players){
        var playersString = "";

        for (let i=0; i<players.length; i++){
            playersString += (players[i].props.name) + ": " + displayCards(players[i].props.cards) + "\n"
        }
    
    return playersString
    }

    displayPlayers(players){
        var playersListtoString = [];
        for (let i=0; i<players.length; i++){
            playersListtoString.push(players[i].props.name)

        }
    
    return playersListtoString.join(", ")
    }

    render() {
        console.log(this.state);
        return(
            <div>
                <h2>Enter player name: </h2>
                <input type="text" ref="name_input" onChange={this.handlePlayerChange}/>
                <button onClick={() => this.handlePlayerSubmit(this.state.players) }>Submit</button>

                <h3>Players list:</h3>

                <p>{this.displayPlayers(this.state.players) }</p>
                <p>~*~*~</p>
                <h2>Enter number of decks in play: </h2>
                <input type="text" ref="number_input" onChange={this.handleDeckChange}/>

                <button onClick={() => this.handleDecksSubmit(this.state.deckNumber) }>Submit</button>
                <p>~*~*~</p>
                There <b>{this.state.deckNumber !== 1 ? "are " + this.state.deckNumber + " decks " : "is 1 deck"}</b> in play.

                {(this.state.shoe.length > 0 && this.state.players.length > 0) &&
                    <button onClick={() => this.handleDealCards(this.state.players, this.state.shoe)}>Deal!</button>
                }

                { (this.state.players.length > 0 && this.state.players[0].cards.length > 0) &&
                <div>
                    <p>~*~*~</p>
                    <p>{this.displayPlayerCards(this.state.players)}</p>
                </div>
                }

            </div>
        );

    }
}


export default Game;