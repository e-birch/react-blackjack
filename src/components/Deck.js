import React from 'react';
import Card from './Card';


export function createShoe(num){
    var shoeArray = [];

    for (let i=0; i<num; i++){
        var singleDeck = createDeck();
        for (let j=0;j<singleDeck.length;j++){
            shoeArray.push(singleDeck[j])
        }
    }
    return shuffleDeck(shoeArray)
}

function createDeck(){
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    var cardsArray = [];

    for (let i = 0; i < suits.length; i++){
        for (let j=0; j < values.length; j++){
            var newArray = cardsArray.slice();
            newArray.push(<Card
                            suit={suits[i]}
                            value={values[j]}
                            picture={(j>10)}
            />)
            cardsArray = newArray;
        }
    }
    return cardsArray
}

export function displayCards(cards){
    var cardsDisplay = []
    for (let i = 0; i<cards.length; i++){
        var newCardsDisplay = cardsDisplay.slice();
        let cardName = "";
        
        cardName = (cards[i].props.value === 1) ? "Ace of " + cards[i].props.suit : 
                    (cards[i].props.value === 11) ? "Jack of " + cards[i].props.suit :
                    (cards[i].props.value === 12) ? "Queen of " + cards[i].props.suit :
                    (cards[i].props.value === 13) ? "King of " + cards[i].props.suit :
                    cards[i].props.value + " of " + cards[i].props.suit

        newCardsDisplay.push(cardName);
        cardsDisplay = newCardsDisplay;
    }
return cardsDisplay
}

function shuffleDeck(cards){
    var unshuffledDeck = cards;
    var shuffledDeck = [];

    const deckLength = cards.length;

    for (let i = 0; i<deckLength;i++){
        const cardIndex = Math.floor(Math.random() * (deckLength - i));
        shuffledDeck.push(unshuffledDeck[cardIndex]);
        unshuffledDeck.splice(cardIndex,1);

    }
return shuffledDeck
}
