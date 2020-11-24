import React from 'react';
import './style.css';

import {
    formatColor
} from '../../../Common/Helpers';

import Like from './Like';

class Card extends React.Component {
    constructor(props) {
        super(props);

        //Bind methods
        this.onDelete = this.onDelete.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onDelete(id) {
        //Call parent method
        this.props.onDelete(id);
    }   

    onLike(id) {
        //Call parent method
        this.props.onLike(id);
    }

    onClick(id) {
        //Call parent method
        if (this.props.onCardClick) {
            this.props.onCardClick(id);
        }
    }

    render() {
        //Get the name, description and like
        const { id, title, description, likes, liked, color, showDelete } = this.props;
        const inverted = this.props.inverted || false;

        //Render components
        return (
            <div 
                className="card collection-card" 
                style={ inverted ? { background: formatColor(color) } : null}
                onClick={() => this.onClick(id)}>
                <p 
                    className="collection-card-title"
                    style={
                        inverted ? 
                        {
                            color: 'white',
                            borderBottom: `3px solid white`
                        } :
                        {
                            color: formatColor(color),
                            borderBottom: `3px solid ${formatColor(color)}`
                        }
                    }>
                    { title }
                </p>

                <p 
                    className="collection-card-content"
                    style={
                        inverted ? { color: 'white' } : { color: formatColor(color) }
                    }>
                    { description }
                </p>

                <Like 
                    inverted={inverted}
                    showDelete={showDelete} 
                    liked={liked} 
                    likes={likes}
                    onDelete={() => this.onDelete(id)}
                    onLike={() => this.onLike(id)}/>
            </div>
        )
    }
}

export default Card;