import React from 'react';

type PlayerState = {
    name: string;
    balance: number;
}

class Player extends React.Component<{}, PlayerState> {

    constructor(props) {
        super(props);
        this.state = { 
            name: "", 
            balance: 100
        };
    }

}









export default Player;