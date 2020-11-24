import React from 'react';
import './style.css';

import { formatColor } from '../../../Common/Helpers';
import Like from '../Collection/Like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

class Card extends React.Component {
    constructor(props) {
        super(props);

        //State
        this.state = {
            hover: false
        }

        //Bind methods
        this.onDelete = this.onDelete.bind(this);
        this.onLike = this.onLike.bind(this);
        this.speak = this.speak.bind(this);
    }

    onLike(id) {
        this.props.onLike(id);
    }

    onDelete(id) {
        this.props.onDelete(id);
    }

    speak() {
        //Get the word
        const { title } = this.props;

        //Call speech
        const msg = new SpeechSynthesisUtterance(title);
        window.speechSynthesis.speak(msg);
    }

    render() {
        //Get the data
        const { id, title, phonetic, description, liked, likes, color, showDelete } = this.props;

        return (
            <div 
                className="flashcard card"
                style={{ background: formatColor(color) }}>

                    <h1 className="flashcard-title">
                        <span style={{ marginRight: "1vh" }}>{ title }</span>
                        <FontAwesomeIcon 
                            icon={ faVolumeUp } 
                            onClick={() => this.speak() }/>
                    </h1>
                    <p className="flashcard-phonetic">{ phonetic }</p>
                    <p className="flashcard-description">{ description }</p>

                    <Like 
                        showDelete={showDelete}
                        likes={likes}
                        liked={liked}
                        onDelete={() => this.onDelete(id)}
                        onLike={() => this.onLike(id)}/>
            </div>
        )
    }
}

export default Card;