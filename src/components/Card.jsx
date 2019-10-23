import React from 'react';

type CardState = {
    suit: string;
    value: number
}

class Card extends React.Component<{}, CardState> {

    constructor(props) {
        super(props);
        this.state = { 
            suit: props.suit, 
            value: props.value
        }
    }

}


export default Card;