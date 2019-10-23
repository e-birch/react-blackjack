import React from 'react';

type PlayerState = {
    name: string;
    balance: number;
    cards: object[];
    status: string;
    score: number[];
    cardsScored: number[];
}

class Player extends React.Component<{}, PlayerState> {

    constructor(props) {
        super(props);
        this.state = { 
            name: "", 
            balance: 100,
            cards: [],
            status: "",
            score: [],
            cardsScored: [],
        };
    }

}



export default Player;