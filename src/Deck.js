import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck"

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        const deck = await axios.get(`${API_BASE_URL}/new/shuffle`)
        this.setState({
            deck: deck.data
        })
    }

    async getCard() {
        //make request using deck id
        let id = this.state.deck.deck_id

        try {
            let cardURL = `${API_BASE_URL}/${id}/draw/`
            //get cards from API
            let cardRes = await axios.get(cardURL)

            if (!cardRes.data.success) { //API returns false if cards run over 52 cards
                throw new Error("No card remaining!")
            }

            console.log(cardRes.data)
            let card = cardRes.data.cards[0] //everytime API returns array[0]
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        //only get necessary data from cardRes.data.card[0]
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch (err) {
            alert(err)
        }
    }

    render() {
        let cards = this.state.drawn.map(c => (
            <Card
                key={c.id}
                image={c.image}
                name={c.name}
            />
        ))
        return (
            <div className='Deck'>
                <h1 className="Deck-title">Draw a Random Card</h1>
                <h2 className="Deck-title subtitle">Powered by React fetching API</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card</button>
                <div className="Deck-cardarea">{cards}</div>
            </div>
        );
    }
}

export default Deck;