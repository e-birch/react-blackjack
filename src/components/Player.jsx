import React from 'react';

type PlayerState = {
    name: string;
    balance: number;
    cards: object[];
}

class Player extends React.Component<{}, PlayerState> {

    constructor(props) {
        super(props);
        this.state = { 
            name: "", 
            balance: 100,
            cards: []
        };
    }

}



export default Player;