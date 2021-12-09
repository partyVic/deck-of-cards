import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
    constructor(props){
        super(props)

        //make the cards have random position
        let angle = Math.random() * 90 - 45
        let xPos = Math.random() * 40 - 20
        let yPos = Math.random() * 40 - 20

        //use this.xxx makes the variable can be accessed outside of constructor
        //constructor only render once, thus the previous cards don't change the position again 
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
    }

    render() {
        return (
            <img
                //this.xxx from constructor can be used in here
                style={{ transform: this._transform }}
                className='Card'
                src={this.props.image}
                alt={this.props.name}
            >
            </img>
        );
    }
}

export default Card;