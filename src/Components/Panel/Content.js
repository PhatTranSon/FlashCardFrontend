import React from 'react';
import './style.css';

import TabChild from './Tab/TabChild';
import TabParent from './Tab/TabParent';

import CollectionCards from './Collection/CollectionCards';
import FlashCards from './Card/Cards';

import Modal from './Modal/CreateCollectionModal';

import CollectionCarousel from './Carousel/CollectionCarousel';
import CardCarousel from './Carousel/CardCarousel';

import {
    //Collection operations
    getAllCollections,
    createCollection,
    getMyCollections,
    deleteCollection,
    likeCollection,
    unlikeCollection,

    //Card operations
    getAllCards,
    getMyCards,
    likeCard,
    unlikeCard,
    getLikedCollections,
    deleteCard,
    getLikedCards,
    getAllScores
} from '../../Common/Operations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Empty from '../Common/Empty';
import ResultTable from './Table/ResultTable';
import Loading from '../Common/Loading';

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //My collections and cards
            myCollections: [],
            myCards: [],
            myScores: [],

            //Hot collections and cards
            hotCollectionsLoading: false,
            hotCollections: [],
            hotCardsLoading: false,
            hotCards: [],

            //Liked collections and cards
            likedCollections: [],
            likedCards: [],

            //Redirecting
            unauthorized: false,

            //Show card create modal
            showCollectionModal: false,
            modalSuccess: false,
            modalError: false,
            modalErrorMessage: "",

            //Chosen collection to go to details
            chosenCollection: null
        }

        //Bind
        this.loadMyCollections = this.loadMyCollections.bind(this);
        this.loadMyCards = this.loadMyCards.bind(this);
        this.loadMyResults = this.loadMyResults.bind(this);
        this.loadHotCollections = this.loadHotCollections.bind(this);
        this.loadHotCards = this.loadHotCards.bind(this);
        this.loadLikedCollections = this.loadLikedCollections.bind(this);
        this.loadLikedCards = this.loadLikedCards.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.createCollection = this.createCollection.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onModalSuccessButton = this.onModalSuccessButton.bind(this);
        this.onDeleteCollection = this.onDeleteCollection.bind(this);
        this.onLikeOwnCollection = this.onLikeOwnCollection.bind(this);
        this.onLikeOwnCard = this.onLikeOwnCard.bind(this);
        this.unlikeLikedCollection = this.unlikeLikedCollection.bind(this);
        this.unlikeLikedCard = this.unlikeLikedCard.bind(this);
        this.onHotCollectionLiked = this.onHotCollectionLiked.bind(this);
        this.onHotCardLiked = this.onHotCardLiked.bind(this);
        this.onCollectionCliked = this.onCollectionCliked.bind(this);
    }

    //Component mounted -> Get data
    componentDidMount() {
        //Load my cards, collections and results
        this.loadMyCollections();
        this.loadMyCards();
        this.loadMyResults();

        //Load hot cards and collections
        this.loadHotCollections();
        this.loadHotCards();

        //Load liked cards and collections
        this.loadLikedCollections();
        this.loadLikedCards();
    }

    //Load datasets
    loadMyCollections() {
        getMyCollections()
            .then((response) => {
                //Get the collections
                const collections = response.data.collections;

                //Set state
                this.setState({
                    myCollections: collections
                });
            })
            .catch((error) => {
                //Extract error mesage and status
                const status = error.response.status;
                //console.log(error);

                //console.log(error.response.data);

                //TODO: Error handling
                if (status === 403) {
                    //Unauthorized error -> Nagivate back to Login
                    this.setState({
                        unauthorized: true
                    });
                }
            });
    }

    loadMyCards() {
        getMyCards()
            .then((response) => {
                //Get the cards
                const cards = response.data.cards;

                //Set state
                this.setState({
                    myCards: cards
                })
            })
            .catch((error) => {
                //Extract error mesage and status
                const status = error.response.status;

                //TODO: Error handling
            });
    }

    loadMyResults() {
        getAllScores()
            .then(response => {
                //Get the scores
                const scores = response.data;
                
                //Set scores
                this.setState({
                    myScores: scores
                });
            })
            .catch(error => {
                //Extract error mesage and status
                const status = error.response.status;
                //TODO: Error handling
            });
    }

    loadHotCollections() {
        //Set loading to true
        this.setState({
            hotCollectionsLoading: true
        });

        //Get all collections sorted by likes
        getAllCollections()
            .then(response => {
                //Successfully retrieved the collections -> Display
                const collections = response.data.collections;

                //Set state
                this.setState({
                    hotCollections: collections,
                    hotCollectionsLoading: false,
                });
            })
            .catch(error => {
                //Extract error mesage and status
                const status = error.response.status;
                //TODO: Error handling
            });
    }

    loadHotCards() {
        //Set loading
        this.setState({
            hotCardsLoading: true
        });

        //Get all cards sorted by likes
        getAllCards()
            .then((response) => {
                //Get the cards
                const cards = response.data.cards;

                console.log(cards);

                //Set state
                this.setState({
                    hotCards: cards,
                    hotCardsLoading: false
                })
            })
            .catch((error) => {
                //Extract error mesage and status
                const status = error.response.status;

                //TODO: Error handling
            });
    }

    loadLikedCollections() {
        getLikedCollections()
            .then(response => {
                //Get the collections 
                const collections = response.data.collections;

                //Set state
                this.setState({
                    likedCollections: collections
                });
            })
            .catch(error => {
                //Extract error mesage and status
                const status = error.response.status;
                
                //TODO: Error handling
            });
    }

    loadLikedCards() {
        getLikedCards()
            .then(response => {
                //Get cards
                const cards = response.data.cards;

                //Set state
                this.setState({
                    likedCards: cards
                });
            })
            .catch(error => {
                //Extract error mesage and status
                const status = error.response.status;
                
                //TODO: Error handling
            });
    }

    //Handle user interactions
    toggleModal() {
        this.setState({
            showCollectionModal: true
        });
    }

    closeModal() {
        this.setState({
            showCollectionModal: false,
            modalSuccess: false,
            modalError: false,
            modalErrorMessage: ""
        });
    }

    onModalSuccessButton() {
        this.closeModal();
    }

    createCollection({ title, color, description }) {
        //Log
        //console.log(title, color, description);
        createCollection(title, description, color)
            .then(response => {
                //Get the newly created collection
                const newCollection = {
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    color: response.data.color,
                    likes: response.data.likes,
                    liked: response.data.liked
                }

                //Add to state, set modal success
                this.setState({
                    myCollections: [...this.state.myCollections, newCollection],
                    modalSuccess: true,
                    modalError: false
                });
            })
            .catch(error => {
                //Get the error
                const status = error.response.status;
                const data = error.response.data;
                
                //Get the error message
                const errorMessage = data.message;

                //Set the modal error
                this.setState({
                    modalSuccess: false,
                    modalError: true,
                    modalErrorMessage: errorMessage
                });
            })
    }

    //Handle card like and delete
    onDeleteCollection(id, index) {
        //Just log
        //console.log(id, index);
        deleteCollection(id)
            .then(response => {
                //Successfully deleted card -> Remove
                let myCollections = this.state.myCollections;

                //Remove from collection
                myCollections.splice(index, 1);

                //Set state
                this.setState({
                    myCollections
                });
            })
            .catch(error => {
                //Get message
                const status = error.response.status;

                //Not authorized -> Expired token
                if (status === 403) {
                    this.setState({
                        unauthorized: true
                    });
                }
            });
    }

    onLikeOwnCollection(id, index) {
        //Check if unlike or like
        if (this.state.myCollections[index].liked === 0) {
            //console.log(id, index);
            likeCollection(id)
                .then(response => {
                    //Successfuly liked the collection
                    let myCollections = this.state.myCollections;
                    
                    //Modify element
                    myCollections[index] = {
                        ...myCollections[index],
                        likes: myCollections[index].likes + 1,
                        liked: 1
                    };

                    //Add liked collection to liked collections
                    let likedCollections = this.state.likedCollections;
                    let collectionIndex = myCollections.findIndex(item => item.id === id);
                    let likedCollection = { ...myCollections[collectionIndex], likes: null };
                    likedCollections = [...likedCollections, likedCollection];

                    //Set collection
                    this.setState({
                        myCollections,
                        likedCollections
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        } else {
            //console.log(id, index);
            unlikeCollection(id)
                .then(response => {
                    //Successfuly liked the collection
                    let myCollections = this.state.myCollections;
                    
                    //Modify element
                    myCollections[index] = {
                        ...myCollections[index],
                        likes: myCollections[index].likes - 1,
                        liked: 0
                    };

                    //Remove from likedCollection
                    let likedCollections = this.state.likedCollections;
                    let collectionIndex = likedCollections.findIndex(item => item.id === id);
                    likedCollections.splice(collectionIndex, 1);

                    //Set collection
                    this.setState({
                        myCollections,
                        likedCollections
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        }
    }

    onDeleteCard(id, index) {
        deleteCard(id)
            .then(response => {
                //Successfully deleted card
                let myCards = this.state.myCards;

                //Remove card from array
                myCards.splice(index, 1);

                //Set cards
                this.setState({
                    myCards
                });
            })
            .catch(error => {
                //Get message
                const status = error.response.status;

                //Not authorized -> Expired token
                if (status === 403) {
                    this.setState({
                        unauthorized: true
                    });
                }
            });
    }

    onLikeOwnCard(id, index) {
        if (this.state.myCards[index].liked === 0) {
            likeCard(id)
                .then(response => {
                    //Successfully liked card
                    let myCards = this.state.myCards;

                    //Modify my cards
                    myCards[index] = {
                        ...myCards[index],
                        liked: 1,
                        likes: myCards[index].likes + 1
                    }

                    //Add liked collection to liked collections
                    let likedCards = this.state.likedCards;
                    let cardIndex = myCards.findIndex(item => item.id === id);
                    let likedCard = { ...myCards[cardIndex], likes: null };
                    likedCards = [...likedCards, likedCard ];

                    //Set state
                    this.setState({
                        myCards,
                        likedCards
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        } else {
            unlikeCard(id)
                .then(response => {
                    //Successfully liked card
                    let myCards = this.state.myCards;

                    //Modify my cards
                    myCards[index] = {
                        ...myCards[index],
                        liked: 0,
                        likes: myCards[index].likes - 1
                    }

                    //Remove from liked cards
                    let likedCards = this.state.likedCards;
                    let cardIndex = likedCards.findIndex(item => item.id === id);
                    likedCards.splice(cardIndex, 1);

                    //Set state
                    this.setState({
                        myCards
                    });
                })
                .catch(error => {
                    //console.log(error);
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        }
    }  

    //Dislike liked collection
    unlikeLikedCollection(id, index) {
        unlikeCollection(id)
            .then(response => {
                //Remove from liked collections
                let likedCollections = this.state.likedCollections;
                likedCollections.splice(index, 1);

                //Set state
                this.setState({
                    likedCollections
                });

                //Reload my collections
                this.loadMyCollections();
                this.loadHotCollections();
            })
            .catch(error => {
                //Get message
                const status = error.response.status;

                //Not authorized -> Expired token
                if (status === 403) {
                    this.setState({
                        unauthorized: true
                    });
                }
            });
    }

    //Unlike liked card
    unlikeLikedCard(id, index) {
        unlikeCard(id)
            .then(response => {
                //Remove from liked collections
                let likedCards = this.state.likedCards;
                likedCards.splice(index, 1);

                //Set state
                this.setState({
                    likedCards
                });

                //Reload my collections
                this.loadMyCards();
                this.loadHotCards();
            })
            .catch(error => {
                //Get message
                const status = error.response.status;

                //Not authorized -> Expired token
                if (status === 403) {
                    this.setState({
                        unauthorized: true
                    });
                }
            });
    }

    //On hot collection liked
    onHotCollectionLiked(id, index) {
        //Check if liked or not
        if (this.state.hotCollections[index].liked === 0) {
            //If not liked -> Like
            likeCollection(id)
                .then(response => {
                    //Successfuly liked the collection
                    let hotCollections = this.state.hotCollections;
                    
                    //Modify element
                   hotCollections[index] = {
                        ...hotCollections[index],
                        likes: hotCollections[index].likes + 1,
                        liked: 1
                    };

                    //Add liked collection to liked collections
                    let likedCollections = this.state.likedCollections;
                    let collectionIndex = hotCollections.findIndex(item => item.id === id);
                    let likedCollection = { ...hotCollections[collectionIndex], likes: null };
                    likedCollections = [...likedCollections, likedCollection];

                    //Set collection
                    this.setState({
                        hotCollections,
                        likedCollections
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        } else {   
            //If already liked -> Unlike
            unlikeCollection(id)
                .then(reponse => {
                    //Successfuly liked the collection
                    let hotCollections = this.state.hotCollections;
                    
                    //Modify element
                    hotCollections[index] = {
                        ...hotCollections[index],
                        likes: hotCollections[index].likes - 1,
                        liked: 0
                    };

                    //Remove from likedCollection
                    let likedCollections = this.state.likedCollections;
                    let collectionIndex = likedCollections.findIndex(item => item.id === id);
                    likedCollections.splice(collectionIndex, 1);

                    //Set collection
                    this.setState({
                        hotCollections,
                        likedCollections
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        }
    }

    //On hot card liked
    onHotCardLiked(id, index) {
        if (this.state.hotCards[index].liked === 0) {
            likeCard(id)
                .then(response => {
                    //Successfully liked card
                    let hotCards = this.state.hotCards;

                    //Modify my cards
                    hotCards[index] = {
                        ...hotCards[index],
                        liked: 1,
                        likes: hotCards[index].likes + 1
                    }

                    //Add liked collection to liked collections
                    let likedCards = this.state.likedCards;
                    let cardIndex = hotCards.findIndex(item => item.id === id);
                    let likedCard = { ...hotCards[cardIndex], likes: null };
                    likedCards = [...likedCards, likedCard ];

                    //Set state
                    this.setState({
                        hotCards,
                        likedCards
                    });
                })
                .catch(error => {
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        } else {
            unlikeCard(id)
                .then(response => {
                    //Successfully liked card
                    let hotCards = this.state.hotCards;

                    //Modify my cards
                    hotCards[index] = {
                        ...hotCards[index],
                        liked: 0,
                        likes: hotCards[index].likes - 1
                    }

                    //Remove from liked cards
                    let likedCards = this.state.likedCards;
                    let cardIndex = likedCards.findIndex(item => item.id === id);
                    likedCards.splice(cardIndex, 1);

                    //Set state
                    this.setState({
                        hotCards
                    });
                })
                .catch(error => {
                    //console.log(error);
                    //Get message
                    const status = error.response.status;

                    //Not authorized -> Expired token
                    if (status === 403) {
                        this.setState({
                            unauthorized: true
                        });
                    }
                });
        }
    }

    onCollectionCliked(id) {
        //Redirect to collection details
        this.setState({
            chosenCollection: id
        });
    }

    render() {
        //Get state
        const {
            myCollections,
            myCards,
            myScores,

            hotCollections,
            hotCollectionsLoading,
            hotCards,
            hotCardsLoading,

            likedCards,
            likedCollections,

            showCollectionModal,
            modalErrorMessage,
            modalError,
            modalSuccess,

            unauthorized,
            chosenCollection
        } = this.state;

        //Spinner styling
        const spinnerStyle = `
            display: block;
            margin: 0 auto;
        `;

        return (
            unauthorized ? 
            <Redirect to={{
                pathname: '/login',
                state: { message: 'Token expired. Please log in again' }
            }}/> :
            (
                chosenCollection ? 
                <Redirect to={`/collections/${chosenCollection}`}/> :
                <div className="content-box">
                    { /* Section for tab */ }
                    <div style={{width: "60%", margin: "0 auto"}}>
                        <TabParent>
                            <TabChild name="Hot">
                                {
                                    hotCollectionsLoading ?
                                    <Loading/> : 
                                    <CollectionCarousel 
                                        collections={hotCollections}
                                        onCollectionLike={(id, index) => this.onHotCollectionLiked(id, index)}
                                        onCollectionClick={(id) => this.onCollectionCliked(id)}
                                        title="Hot collections"/>
                                }
                                {
                                    hotCardsLoading ?
                                    <Loading/> : 
                                    <CardCarousel
                                        cards={hotCards}
                                        onCardLike={(id, index) => this.onHotCardLiked(id, index)}
                                        title="Hot flashcards"/>
                                }
                            </TabChild>

                            <TabChild name="Mine">
                                { /* Collections with add icon */ }
                                <p>
                                    <span 
                                        className="section-title" 
                                        style={{marginRight: "2vh"}}>
                                        Your collections
                                    </span>

                                    <FontAwesomeIcon 
                                        icon={ faPlusCircle }
                                        onClick={() => this.toggleModal()}/>
                                </p>
                                {
                                    myCollections.length > 0 ? 
                                    <CollectionCards
                                        cards={myCollections}
                                        onDeleteCollection={(id, index) => this.onDeleteCollection(id, index)}
                                        onLikeCollection={(id, index) => this.onLikeOwnCollection(id, index)}
                                        onClickCollection={(id) => this.onCollectionCliked(id)}
                                        showDelete={true}/> :
                                    <Empty title="You have no collections" />
                                }

                                { /* Cards */ }
                                <p style={{marginTop: "3vh"}}>
                                    <span 
                                        className="section-title">
                                        Your cards
                                    </span>
                                </p>
                                {
                                    myCards.length > 0 ?
                                    <FlashCards
                                        showDelete={false}
                                        cards={myCards}
                                        showDelete={true}
                                        onLikeCard={(id, index) => this.onLikeOwnCard(id, index)}
                                        onDeleteCard={(id, index) => this.onDeleteCard(id, index)}/> :
                                    <Empty title="You have no cards"/>
                                }

                                { /* Test results */ }
                                <p style={{marginTop: "3vh", marginBottom: "2vh"}}>
                                    <span 
                                        className="section-title">
                                        Quizzes
                                    </span>
                                </p>
                                {
                                    myScores.length > 0 ?
                                    <ResultTable 
                                        scores={myScores}/> :
                                    <Empty title="You have not taken any quizzes"/>
                                }
                            </TabChild>

                            <TabChild name="Liked">
                                { /* Collections with no add icon */ }
                                <p style={{marginTop: "2vh"}}>
                                    <span 
                                        className="section-title">
                                        Liked collections
                                    </span>
                                </p>
                                {
                                    likedCollections.length > 0 ?
                                    <CollectionCards 
                                        cards={likedCollections}
                                        onLikeCollection={(id, index) => this.unlikeLikedCollection(id, index)}
                                        onClickCollection={(id) => this.onCollectionCliked(id)}
                                        showDelete={false}/> :
                                    <Empty title="You have not liked a collection"/>
                                }

                                { /* Cards */ }
                                <p style={{marginTop: "2vh"}}>
                                    <span 
                                        className="section-title">
                                        Liked cards
                                    </span>
                                </p>
                                {
                                    likedCards.length > 0 ?
                                    <FlashCards 
                                        showDelete={false}
                                        cards={likedCards}
                                        showDelete={false}
                                        onLikeCard={(id, index) => this.unlikeLikedCard(id, index)}/> :
                                    <Empty title="You have not liked a card"/>
                                }
                            </TabChild>
                        </TabParent>
                    </div>

                    { /* Section for create modal */ }
                    <Modal 
                        isOpen={showCollectionModal}
                        success={modalSuccess}
                        error={modalError}
                        errorMessage={modalErrorMessage}
                        onCreateCollection={this.createCollection}
                        onClose={this.closeModal}
                        onSuccessButtonClicked={this.onModalSuccessButton}/>
                </div>
            )
        )
    }
}

export default Content;