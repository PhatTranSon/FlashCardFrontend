import React from 'react';
import './style.css';

import {
    Link
} from 'react-router-dom';

import {
    isLoggedIn
} from '../../Common/Authentication';

import CardCarousel from '../Panel/Carousel/CardCarousel';
import CollectionCarousel from '../Panel/Carousel/CollectionCarousel';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {
                    "id": 1,
                    "title": "Learn",
                    "color": "264653",
                    "phonetic": "/lərn/",
                    "description": "gain or acquire knowledge of or skill in (something) by study, experience, or being taught.",
                    "liked": 1,
                    "likes": 20
                },
                {
                    "id": 2,
                    "title": "Card",
                    "color": "2a9d8f",
                    "phonetic": "/kärd/",
                    "description": "a piece of thick, stiff paper or thin pasteboard, in particular one used for writing or printing on.",
                    "liked": 1,
                    "likes": 20
                },
                {
                    "id": 3,
                    "title": "Collection",
                    "color": "e9c46a",
                    "phonetic": "/kəˈlekSH(ə)n/",
                    "description": "the action or process of collecting someone or something.",
                    "liked": 1,
                    "likes": 20,
                },
                {
                    "id": 4,
                    "title": "Explore",
                    "color": "f4a261",
                    "phonetic": "/ikˈsplôr/",
                    "description": "travel in or through (an unfamiliar country or area) in order to learn about or familiarize oneself with it.",
                    "liked": 1,
                    "likes": 20
                }
            ],
            collections: [
                {
                    "id": 1,
                    "title": "Sports",
                    "color": "ffba08",
                    "description": "Words on the world of sports",
                    "liked": 1,
                    "likes": 10
                },
                {
                    "id": 2,
                    "title": "Science",
                    "color": "457b9d",
                    "description": "Discover science jargons",
                    "liked": 1,
                    "likes": 10
                },
                {
                    "id": 3,
                    "title": "Movies",
                    "color": "fca311",
                    "description": "Learn through movies",
                    "liked": 1,
                    "likes": 10
                },
                {
                    "id": 4,
                    "title": "Psychology",
                    "color": "40916c",
                    "description": "Discover the world of Psychology",
                    "liked": 1,
                    "likes": 10
                }
            ]
        }
    }   
    render() {
        //Get the cards and collections
        const { cards, collections } = this.state;

        return (
            <div className="home">
                <div className="home-section" id="intro">
                    <h1>MyCards</h1>
                    <p>Create and share beautiful English flashcards</p>
                    <div className="columns">
                        <div className="column">
                            <Link 
                                className="button blue-button" 
                                to="/signup">
                                Sign up
                            </Link>   
                        </div>

                        <div className="column">
                            {
                                isLoggedIn() ?
                                <Link className="button blue-button" to="/panel">
                                    Panel
                                </Link> :
                                <Link className="button blue-button" to="/login">
                                    Log in
                                </Link>
                            }
                        </div>
                    </div>
                </div>

                <div className="home-section" id="flashcards">
                    <h1>
                        Create beautiful flashcards
                    </h1>
                    <h2>
                        Learn the meaning and pronunciation
                    </h2>
                    <div style={{ width: "80%" }}>
                        <CardCarousel 
                            cards={cards}
                            onCardLike={() => {}}/>
                    </div>
                </div>  

                <div className="home-section" id="collections">
                    <h1>... And collections</h1>
                    <h2>Group flashcards into topics and share them</h2>
                    <div style={{ width: "80%" }}>
                        <CollectionCarousel
                            collections={collections}
                            inverted={false}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;