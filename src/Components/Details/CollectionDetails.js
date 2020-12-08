import React from 'react';

import './style.css';

import {
    Redirect
} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import './style.css';
import Navbar from '../Common/LogOutNavbar';

import { 
    getOneCollection,
    getCardsFromCollection,
    createCard,
    updateCard,
    likeCard,
    unlikeCard,
    deleteCard,
    submitScore,
    getCollectionScores
} from '../../Common/Operations';

import {
    formatColor
} from '../../Common/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import FlashCards from '../Panel/Card/Cards';
import IconPanel from './IconPanel';
import CollectionModal from './Modal/UpdateCollectionModal';

import {
    getUserId
} from '../../Common/Authentication';

import {
    updateCollection
} from '../../Common/Operations';
import CardModal from './Modal/AddCardPanel';
import TestModal from './Modal/TestModal';
import UpdateCardModal from './Modal/UpdateCardModal';
import TabParent from '../Panel/Tab/TabParent';
import TabChild from '../Panel/Tab/TabChild';
import CollectionResultTable from './Table/CollectionResultTable';
import Loading from '../Common/Loading';
import Empty from '../Common/Empty';

class CollectionDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //Collection loading state
            collectionLoading: false,

            //Collection data
            id: null,
            userId: null,
            title: null,
            color: null,
            description: null,
            liked: null,
            likes: null,

            //Card loading
            cardsLoading: false,
            cards: [],

            //Return flag
            back: false,

            //Collection modal open or not
            updateModalOpen: false,
            updateModalSuccess: false,
            updateModalError: false,
            updateModalMessage: "",

            //Card modal open or not
            cardModalOpen: false,
            cardModalSuccess: false,
            cardModalError: false,
            cardModalMessage: false,

            //Test modal open or not
            testModalOpen: false,
            testModalToggle: 0,
            testModalSubmitting: false,

            //Update card modal open or not
            cardUpdateModalOpen: false,
            cardUpdateModalSuccess: false,
            cardUpdateModalError: false,
            cardUpdateModalMessage: false,

            //Data for update card
            updateCardId: null,
            updateCardIndex: null,

            //Scores
            scores: [],
            scoresLoading: false
        }

        this.loadCollection = this.loadCollection.bind(this);
        this.loadCards = this.loadCards.bind(this);
        this.loadScores = this.loadScores.bind(this);
        this.returnHome = this.returnHome.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onTest = this.onTest.bind(this);
        this.onEditCard = this.onEditCard.bind(this);
        this.updateCollection = this.updateCollection.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.closeCardModal = this.closeCardModal.bind(this);
        this.closeTestModal = this.closeTestModal.bind(this);
        this.closeCardUpdateModal = this.closeCardUpdateModal.bind(this);
        this.createCard = this.createCard.bind(this);
        this.likeCard = this.likeCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);
    }

    componentDidMount() {
        this.loadCollection();
    }

    loadCollection() {
        //Get collection id from collection
        const { collectionId } = this.props.match.params;

        //Set to loading first
        this.setState({
            collectionLoading: true
        });
        
        //Get the collection
        getOneCollection(collectionId)
            .then(response => {
                //Get
                const collection = response.data;

                //Set state
                this.setState({ 
                    ...collection,
                    collectionLoading: false
                }, () => {
                    //Call load cards and results
                    this.loadCards();
                    this.loadScores();
                });
            })
            .catch(error => {
                //Error handling
                this.setState({
                    error: true
                });
            });
    }

    loadCards() {
        //Get the collection id
        const { collectionId } = this.props.match.params;

        //Set loading to true
        this.setState({
            cardsLoading: true
        });

        //Get cards
        getCardsFromCollection(collectionId)
            .then(response => {
                //Get cards
                const cards = response.data.cards;

                //Set cards
                this.setState({
                    cards,
                    cardsLoading: false
                });
            })
            .catch(error => {
                //Error handling
                this.setState({
                    error: true,
                    cardsLoading: false
                });
            });
    }

    loadScores() {
        //Get the collection id
        const collectionId = this.state.id;

        //Set score loading
        this.setState({
            scoresLoading: true
        });

        //Get scores
        getCollectionScores(collectionId)
            .then(response => {
                //Scores loaded -> Display
                const scores = response.data;

                //Set scores
                this.setState({
                    scores,
                    scoresLoading: false
                });
            })
            .catch(error => {
                //Get status
                const status = error.response.status;

                //TODO: Error Handling
                this.setState({
                    scoresLoading: false
                });
            });
    }

    returnHome() {
        this.setState({
            back: true
        });
    }

    //Event handlers for icon
    onAdd() {
        this.setState({
            cardModalOpen: true
        });
    }

    onEdit() {
        //Open
        this.setState({
            updateModalOpen: true
        });
    }

    onTest() {
        //Open test modal
        this.setState({
            testModalOpen: true,
            testModalToggle: !this.state.testModalToggle
        });
    }

    onEditCard(id, index) {
        //Open modal
        this.setState({
            updateCardId: id,
            updateCardIndex: index,
            cardUpdateModalOpen: true
        });
    }

    //Method to update collection
    updateCollection(data) {
        //Get the id
        const { id } = this.state;

        //Expand to get data
        const { title, description, color } = data;

        //Call update method
        updateCollection(id, title, description, color)
            .then(response => {
                //Successfully update the collection
                this.setState({
                    updateModalSuccess: true,
                    title,
                    description,
                    color
                });
            })
            .catch(error => {
                //Error -> Get message
                const data = error.response.data;

                //Display message
                this.setState({
                    updateModalError: true,
                    updateModalMessage: data.message
                });
            });
    }

    //Create card
    createCard(data) {
        //Get the collection id
        const collectionId = this.state.id;

        //Expand to get the data
        const { title, phonetic, description, color } = data;

        //Make request
        createCard(collectionId, title, phonetic, description, color)
            .then(response => {
                //Get data from reponse
                const card = response.data;

                //Set state
                this.setState({
                    cards: [...this.state.cards, card],
                    cardModalSuccess: true
                });
            })
            .catch(error => {
                //Error handing - Set error
                const data = error.response.data;

                //Set error and error message
                this.setState({
                    cardModalError: true,
                    cardModalMessage: data.message
                });
            })
    }

    //Close update modal
    closeUpdateModal() {
        //Reset modal
        this.setState({
            updateModalOpen: false,
            updateModalSuccess: false,
            updateModalError: false,
            updateModalMessage: false
        });
    }

    closeCardModal() {
        this.setState({
            cardModalOpen: false,
            cardModalSuccess: false,
            cardModalError: false,
            cardModalMessage: false
        });
    }

    closeTestModal(rightQuestions, totalQuestions) {
        //Get collection id
        const { id } = this.state;

        //On close modal -> Submit score
        this.setState({
            testModalSubmitting: true
        });

        //Save result -> Close modal
        submitScore(id, rightQuestions, totalQuestions)
            .then(response => {
                //Get the score
                const score = response.data;

                //Add to scores -> TODO
                const { scores } = this.state;

                //Set loading to off and close modal
                this.setState({
                    testModalSubmitting: false,
                    testModalOpen: false,
                    scores: [...scores, score]
                });
            })
            .catch(error => {
                //Debug
                console.log(error);

                //Error handling -> TODO
                const status = error.response.status;

                //Close modal
                this.setState({
                    testModalOpen: false
                });
            });
    }

    closeCardUpdateModal() {
        this.setState({
            cardUpdateModalOpen: false
        });
    }

    editCard(id, title, description, phonetic, color) {
        //Make request
        updateCard(id, title, description, phonetic, color)
            .then(response => {
                //Update card
                const card = response.data;
                const { updateCardIndex, cards } = this.state;

                //Set 
                cards[updateCardIndex] = {...card, ...cards[updateCardIndex]}

                //Set state
                this.setState({
                    cards,
                    cardUpdateModalSuccess: true
                });
            })
            .catch(error => {
                const { message } = error.response.data;
                this.setState({
                    cardUpdateModalError: true,
                    cardUpdateModalMessage: message
                });
            });
    }

    //Method to delete and like cards
    deleteCard(id, index) {
        //Get cards
        const cards = this.state.cards;

        deleteCard(id)
            .then(response => {
                //Successfully deleted card
                cards.splice(index, 1);

                //Set state
                this.setState({
                    cards
                });
            })
            .catch(error => {
                //Error Handling -> TODO
                console.log(error);
            });
    }

    likeCard(id, index) {
        //Check if card is liked
        const cards = this.state.cards;
        
        //Get the card
        const card = cards[index];

        if (card.liked === 0) {
            //Not liked -> Like
            likeCard(card.id)
                .then(response => {
                    //Successfully liked card -> Modify liked status
                    card.liked = 1;
                    card.likes += 1;

                    //Set state
                    this.setState({
                        cards
                    });
                })
                .catch(error => {
                    //Error handling -> TODO
                    console.log(error);
                });
        } else {
            //Liked -> Unliked
            unlikeCard(card.id)
                .then(response => {
                    //Successfully unliked card -> Modify unlike
                    card.liked = 0;
                    card.likes -= 1;

                    //Set state
                    this.setState({
                        cards
                    });
                })
                .catch(error => {
                    //Error handling -> TODO
                    console.log(error);
                });
        }
    }

    render() {
        //Expand state
        const { 
            userId, id, title, color, description, liked, likes, collectionLoading,
            cards, cardsLoading,
            back,
            updateModalOpen, updateModalSuccess, updateModalError, updateModalMessage,
            cardModalOpen, cardModalSuccess, cardModalError, cardModalMessage,
            cardUpdateModalOpen, cardUpdateModalSuccess, cardUpdateModalError, cardUpdateModalMessage,
            updateCardId, updateCardIndex,
            testModalOpen, testModalToggle, testModalSubmitting,
            scores, scoresLoading
        } = this.state;


        //Get the update card target if exists
        const updateCard = updateCardIndex !== null ? cards[updateCardIndex] : null

        //Check if user is owner
        const owner = userId == getUserId();

        //Render
        return (
            back ? 
            <Redirect to="/panel"/> :
            <div>
                <Navbar/>
                {
                    collectionLoading ? 
                    <div className="loader-wrapper">
                        <Loader
                            type="Puff"
                            color="#2A9D8F"
                            height={100}
                            width={100}/>
                    </div> : 
                    (
                        id ? 
                        <div className="collection-details-panel">
                            <div style={{ marginBottom: "3vh" }}>
                                <FontAwesomeIcon 
                                    icon={ faLongArrowAltLeft } 
                                    size="3x"
                                    onClick={() => this.returnHome()}/>
                            </div>

                            <div className="columns">
                                <div className="column is-four-fifths">
                                    <h1 className="collection-details-title"
                                        style={{ 
                                            borderBottom: `5px solid ${formatColor(color)}`,
                                            color: formatColor(color)
                                        }}>
                                        { title }
                                    </h1>
                                </div>

                                {
                                    owner ? 
                                    <div className="column is-one-fifth icon-panel-wrapper">
                                        <IconPanel size="1x" onAdd={this.onAdd} onEdit={this.onEdit} onTest={this.onTest}/>
                                    </div> :
                                    null
                                }
                            </div>

                            <p className="collection-details-description">
                                { description }
                            </p>

                            <TabParent>
                                <TabChild name="Cards">
                                    {
                                        cardsLoading ?
                                        <Loading /> : 
                                        (
                                            cards.length > 0 ?
                                            <FlashCards 
                                                cards={cards}
                                                showDelete={owner}
                                                showEdit={owner}
                                                onDeleteCard={this.deleteCard}
                                                onLikeCard={this.likeCard}
                                                onEditCard={this.onEditCard}/> :
                                            <Empty title="This collection have no cards"/>
                                        )
                                    }
                                </TabChild>

                                <TabChild name="Quiz">
                                    <div
                                        style={{ textAlign: "center" }}>
                                        <div style={{marginTop: "5vh"}}>
                                            <FontAwesomeIcon icon={ faFileAlt } size="5x" style={{ color: "#2A9D8F" }}/>
                                        </div>
                                        
                                        <button 
                                            className="button blue-button"
                                            style={{display: "inline-block", margin: "5vh 0", background: "#2A9D8F"}}
                                            onClick={() => this.onTest()}>Take quiz</button>
                                        {
                                            scoresLoading ?
                                            <Loading /> : 
                                            (
                                                scores.length > 0 ?
                                                <CollectionResultTable scores={scores}/> :
                                                <Empty title="You have not done the collection quiz"/>
                                            )
                                        }
                                    </div>
                                </TabChild>
                            </TabParent>
                            {
                                owner ? 
                                <CollectionModal 
                                    isOpen={updateModalOpen}
                                    success={updateModalSuccess}
                                    error={updateModalError}
                                    errorMessage={updateModalMessage}
                                    title={title}
                                    description={description}
                                    onUpdateCollection={this.updateCollection}
                                    onSuccessButtonClicked={this.closeUpdateModal}/> :
                                null
                            }
                            {
                                owner ?
                                <CardModal 
                                    isOpen={cardModalOpen}
                                    success={cardModalSuccess}
                                    error={cardModalError}
                                    errorMessage={cardModalMessage}
                                    onCreateCard={this.createCard}
                                    onSuccessButtonClicked={this.closeCardModal}/> :
                                null
                            }
                            {
                                owner ?
                                <UpdateCardModal
                                    isOpen={cardUpdateModalOpen}
                                    success={cardUpdateModalSuccess}
                                    error={cardUpdateModalError}
                                    errorMessage={cardUpdateModalMessage}
                                    {...updateCard}
                                    onEditCard={this.editCard}
                                    onSuccessButtonClicked={this.closeCardUpdateModal}/> :
                                null
                            }
                            <TestModal 
                                key={testModalToggle}
                                isOpen={testModalOpen}
                                cards={cards}
                                collection={{userId, id, title, color, description, liked, likes }}
                                onDoneClicked={this.closeTestModal}
                                submitting={testModalSubmitting}/>
                        </div> :
                        null
                    )
                }
            </div>
        )
    }
}

export default CollectionDetails;