import React from 'react';
import './style.css';

import Card from './Card';

class CardPanel extends React.Component {
    constructor(props) {
        super(props);

        //Bind methods
        this.onDelete = this.onDelete.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    onDelete(id, index) {
        //Test
        this.props.onDeleteCard(id, index);
    }

    onLike(id, index) {
        //Test
        this.props.onLikeCard(id, index);
    }

    render() {
        //Get the cards from props
        const { cards, title, showDelete } = this.props

        return (
            <div>
                <h1 className="flashcard-panel-title">{ title }</h1>
                <div className="flashcard-panel">
                {
                    cards.map((card, index) => {
                        return (
                            <Card 
                                showDelete={showDelete}
                                key={index}
                                {...card}
                                onDelete={id => this.onDelete(id, index)}
                                onLike={id => this.onLike(id, index)}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default CardPanel;