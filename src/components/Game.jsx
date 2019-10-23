import React from 'react';
import Player from './Player';
import { createShoe, displayCards } from './Deck.js';

type GameState = {
    players: object[];
    playerName: string;
    deckNumber: number;
    shoe: object[];
    dealerCards: object[];
    dealerScore: [];
    currentPlayer: object;
    currentPlayerIndex:number;
    scoringHistory:[];
}

class Game extends React.Component<{}, GameState> {

    constructor() {
        super();
        this.state = { 
            players: [],
            playerName: "",
            deckNumberInput: 0,
            deckNumberActual: 0,
            shoe: [],
            dealerCards: [],
            dealerSCore: [0],
            currentPlayer: Object,
            currentPlayerIndex: -1,
            scoringHistory: [],
        }
    }

    handlePlayerChange = (event: SyntheticInputEvent<EventTarget>) => {
        this.setState({playerName: event.target.value});
    }

    handleDeckChange = (event: SyntheticInputEvent<EventTarget>) => {
        this.setState({deckNumberInput: parseInt(event.target.value)});
    }

    handlePlayerSubmit(players) {
        var playersList = players;
        playersList.push(<Player name={this.state.playerName} balance={100} cards ={[]} status={"inPlay"} score={[0]} cardsScored={[0]}/>);
        this.setState({players: playersList});
        this.refs.name_input.value = "";

        if (!this.state.currentPlayer.props){
            this.setState({currentPlayer: playersList[0], currentPlayerIndex: 0})
        }
    }

    handleDecksSubmit() {
        var decks = this.state.deckNumberInput
        var shoeArray = createShoe(decks);
        this.setState({shoe: shoeArray});
        this.setState({deckNumberActual: decks})
        this.refs.number_input.value="";
    }

    handleDealCards(players, shoe){
        for (let i=0;i<2;i++){
            for (let j=0;j<players.length;j++){
                var allPlayers = players;
                allPlayers[j].props.cards.push(shoe[0]);
                this.setState({players: allPlayers});
                shoe.splice(0,1);
            }
        }
        var dealerCardOne = [];
        dealerCardOne.push(shoe[0]);
        shoe.splice(0,1);
        this.setState({dealerCards:dealerCardOne});
        this.setState({shoe:shoe});
    }

    handlePlayerHit(currPlayer, shoe){
        currPlayer.props.cards.push(shoe[0]);
        this.setState({currentPlayer: currPlayer})

        var allPlayers = this.state.players;
        allPlayers[this.state.currentPlayerIndex] = currPlayer;
        this.setState({players: allPlayers})

        shoe.splice(0,1);
        this.setState({shoe: shoe});
    }

    handlePlayerStand(players){

        var playerState = [];
        playerState.push(this.state.currentPlayer.props.name)
        playerState.push(displayCards(this.state.currentPlayer.props.cards).join(", "))
        playerState.push(this.state.currentPlayer.props.score)

        var playerStateHistory = this.state.scoringHistory;
        playerStateHistory.push(playerState);
        this.setState({scoringHistory: playerStateHistory})

        var newIndex = this.state.currentPlayerIndex + 1

        if (newIndex < players.length) {

            var currPlayer = players[newIndex]
            this.setState({currentPlayer: currPlayer, currentPlayerIndex: newIndex})
        } else {
            this.handleDealerTurn()
        }
    }

    handleDealerTurn(){
        var shoe = this.state.shoe;
        var dealerCards = this.state.dealerCards;
        dealerCards.push(shoe[0]);
        shoe.splice(0,1);
        this.setState({shoe: shoe, dealerCards: dealerCards})
    }

    calcPlayerScore(player, playerIndex){
        var newPlayer = player
        var playerScore = newPlayer.props.score;
        var newScores = []

        if (newPlayer.props.cardsScored[0] === 0){
            if (newPlayer.props.cards[0].props.value === 1){
                newScores.push(1);
                newScores.push(11);
            }
            else if (newPlayer.props.cards[0].props.value > 10){
                newScores.push(10);
            }
            else {
                newScores.push(newPlayer.props.cards[0].props.value);
            }
        }

        else if (newPlayer.props.cardsScored[0] === newPlayer.props.cards.length) {
            return newPlayer.props.score;
        }

        else {
            var cardsIndex = newPlayer.props.cards.length - 1
            var newCard = newPlayer.props.cards[cardsIndex];
            for (let i = 0; i < playerScore.length; i++){
                if (newCard.props.value === 1) {
                    newScores.push(playerScore[i] + 1);
                    newScores.push(playerScore[i] + 11);
                }
                else if (newCard.props.value > 10) {
                    newScores.push(playerScore[i] + 10);
                }
                else {
                    newScores.push(playerScore[i] + newCard.props.value);
                }
            }
        }

        var numCards = newPlayer.props.cardsScored[0] + 1
        newPlayer.props.cardsScored.splice(0,1);
        newPlayer.props.cardsScored.push(numCards);
        newPlayer.props.score.splice(0,newPlayer.props.score.length);

        for (let i = 0; i < newScores.length; i++){
            newPlayer.props.score.push(newScores[i])
        }
        this.setState({currentPlayer: newPlayer})

        var allPlayers = this.state.players;
        allPlayers[playerIndex] = newPlayer;
        this.setState({players: allPlayers});

        return newScores
    }

    // calcDealerScore(dealerCards, dealerScore){

    //     if (newPlayer.props.cardsScored[0] === 0){
    //         if (newPlayer.props.cards[0].props.value === 1){
    //             newScores.push(1);
    //             newScores.push(11);
    //         }
    //         else if (newPlayer.props.cards[0].props.value > 10){
    //             newScores.push(10);
    //         }
    //         else {
    //             newScores.push(newPlayer.props.cards[0].props.value);
    //         }
    //     }

    //     else if (newPlayer.props.cardsScored[0] === newPlayer.props.cards.length) {
    //         return newPlayer.props.score;
    //     }

    //     else {
    //         var cardsIndex = newPlayer.props.cards.length - 1
    //         var newCard = newPlayer.props.cards[cardsIndex];
    //         for (let i = 0; i < playerScore.length; i++){
    //             if (newCard.props.value === 1) {
    //                 newScores.push(playerScore[i] + 1);
    //                 newScores.push(playerScore[i] + 11);
    //             }
    //             else if (newCard.props.value > 10) {
    //                 newScores.push(playerScore[i] + 10);
    //             }
    //             else {
    //                 newScores.push(playerScore[i] + newCard.props.value);
    //             }
    //         }
    //     }

    //     var numCards = newPlayer.props.cardsScored[0] + 1
    //     newPlayer.props.cardsScored.splice(0,1);
    //     newPlayer.props.cardsScored.push(numCards);
    //     newPlayer.props.score.splice(0,newPlayer.props.score.length);

    //     for (let i = 0; i < newScores.length; i++){
    //         newPlayer.props.score.push(newScores[i])
    //     }
    //     this.setState({currentPlayer: newPlayer})

    //     var allPlayers = this.state.players;
    //     allPlayers[playerIndex] = newPlayer;
    //     this.setState({players: allPlayers});

    //     return newScores
    // }

    displayPlayerCards(players, dealerHand){
        var playersString = "";

        for (let i=0; i<players.length; i++){
            playersString += (players[i].props.name) + ": " + displayCards(players[i].props.cards).slice(0,2).join(", ") + "\n"
        }

        playersString += "Dealer: " + displayCards(dealerHand) + "\n"
    
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
                {/* input player names */}
                {(this.state.dealerCards.length === 0) &&
                <div>
                <h2>Enter player name: </h2>
                <input type="text" ref="name_input" onChange={this.handlePlayerChange}/>
                <button onClick={() => this.handlePlayerSubmit(this.state.players) }>Submit</button>
                </div>
                }
                

                {/* display player names */}
                {(this.state.players.length > 0) &&
                <div>
                <h3>Players list:</h3>
                <p>{this.displayPlayers(this.state.players) }</p>
                <p>~*~*~</p>
                </div>
                }


                {/* input number of decks */}
                {(this.state.players.length > 0 && this.state.deckNumberActual === 0) &&
                <div>
                <h2>Enter number of decks in play: </h2>
                <input type="text" ref="number_input" onChange={this.handleDeckChange}/>

                <button onClick={() => this.handleDecksSubmit() }>Submit</button>
                <p>~*~*~</p>
                </div>
                }


                {/* display number of decks in play */}
                {(this.state.players.length > 0 && this.state.deckNumberActual !== 0) &&
                <div>

                There <b>{(this.state.deckNumberActual !== 1) ? "are " + this.state.deckNumberActual + " decks " : "is 1 deck"}</b> in play.
                </div>
                }


                {/* Deal cards */}
                {(this.state.shoe.length > 0 && this.state.players.length > 0 && this.state.dealerCards.length === 0) &&
                    <button onClick={() => this.handleDealCards(this.state.players, this.state.shoe)}>Deal!</button>
                }



                {/* Display cards */}
                { (this.state.players.length > 0 && this.state.players[0].props.cards.length > 0) &&
                <div>
                    <p>~*~*~</p>
                    <h3>Player starting hands</h3>
                    <p>{this.displayPlayerCards(this.state.players, this.state.dealerCards)}</p>
                </div>
                }



                {/* Begin game */}
                { (this.state.dealerCards && 0 < this.state.dealerCards.length) &&
                <div>
                    <p>~*~*~</p>
                    <p> { this.state.scoringHistory.join(", ") }</p>

                    { (this.state.dealerCards.length < 2) && 
                    <div>
                        <p>{ this.state.currentPlayer.props.name } 's turn!</p>
                        <p>{ displayCards(this.state.currentPlayer.props.cards).join(", ") }</p>
                        <p>Possible scores: { this.calcPlayerScore(this.state.currentPlayer, this.state.currentPlayerIndex).join(", ") }</p>
                    </div>
                    }
                    { (this.state.dealerCards.length > 1) &&
                        <div>
                            <p>Dealer's turn!</p>
                            <p>{ displayCards(this.state.dealerCards).join(", ") }</p>
                            <p>Dealer's score: { this.calcDealerScore(this.state.dealerCards, this.state.dealerScore) }</p>
                        </div>
                    }
                    <button onClick={() => this.handlePlayerHit(this.state.currentPlayer, this.state.shoe)}>Hit!</button>
                    <button onClick={() => this.handlePlayerStand(this.state.players)}>Stand...</button>
                </div>
                }

            </div>
        );

    }
}


export default Game;