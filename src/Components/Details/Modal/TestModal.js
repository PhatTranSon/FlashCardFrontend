import React from 'react';
import './style.css';
import Modal from 'react-modal';
import { formatColor, shuffleArray } from '../../../Common/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear, faSmileWink } from '@fortawesome/free-solid-svg-icons';

import Loader from 'react-loader-spinner';

class TestModal extends React.Component {
    answerTime = 15000;
    
    constructor(props) {
        super(props);

        //State for the games
        this.state = {
            //Collection details
            collection: this.props.collection,

            //Card details:
            cards: this.props.cards,

            //Interval id
            intervalId: null,

            //Game state
            started: false, //If game has started
            ended: false,   //If game has ended

            currentQuestion: null,                      //Save the current question to display
            currentQuestionNumber: 0,                   //Current number of question answer
            currentTime: 0,                             //5 seconds timer
            currentScore: 0,                            //Current score of user
            totalQuestion: this.props.cards.length,     //Number of question == Number of cards

            //Icon to display right or wrong
            justAnswer: false,
            isRight: false,
            answer: "",

            //Submitting state
            //submitting: false
        }

        //Set the root of modal component
        Modal.setAppElement('body');

        //Method binding
        this.renderStartScreen = this.renderStartScreen.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.startGame = this.startGame.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.onAnswer = this.onAnswer.bind(this);
        this.captureAnswer = this.captureAnswer.bind(this);
    }

    //Helper method to render
    renderStartScreen() {
        //Get collection name
        const collectionName = this.state.collection.title;
        const collectionColor = this.state.collection.color;

        //Get the number of questions
        const numberOfQuestions = this.props.cards.length;

        return (
            <div 
                className="start-screen"
                style={{color: formatColor(collectionColor)}}>
                <h1>Quiz</h1>
                <p>There will be {numberOfQuestions} {numberOfQuestions > 1 ? "questions" : "question"} for the {collectionName} collection</p>
                <button 
                    className="button blue-button" 
                    style={{background: formatColor(collectionColor)}}
                    onClick={() => this.startGame()}>
                    Start
                </button>
            </div>
        )
    }

    renderResult() {
        //Get the collection color
        const collectionColor = this.state.collection.color;

        //Get the result
        const { totalQuestion, currentScore } = this.state;

        //Display the result
        return (
            <div
                className="result-screen"
                style={{color: formatColor(collectionColor)}}>
                <h1>Result</h1>
                <p>{ currentScore } / { totalQuestion }</p>
                <button 
                    className="button blue-button"
                    style={{background: formatColor(collectionColor)}}
                    onClick={() => this.props.onDoneClicked(currentScore, totalQuestion)}>
                    Done
                </button>
            </div>
        );
    }

    //On answer question
    onAnswer(event) {
        if (event.key === 'Enter') {
            //Check if the answer is correct
            const isCorrect = this.state.answer.toLowerCase() === this.state.currentQuestion.answer.toLowerCase();
            if (isCorrect) {
                this.setState({
                    justAnswer: true,
                    isRight: true
                }, () => {
                   setTimeout(() => {
                       this.setState({
                           justAnswer: false,
                           isRight: false,
                           answer: "",
                           currentTime: 0,
                           currentScore: this.state.currentScore + 1
                       })
                   }, 1000);
                });
            } else {
                this.setState({
                    justAnswer: true,
                    isRight: false
                }, () => {
                   setTimeout(() => {
                       this.setState({
                           justAnswer: false,
                           isRight: false,
                           answer: "",
                           currentTime: 0
                       })
                   }, 1000);
                });
            }
        }
    }

    captureAnswer(event) {
        this.setState({
            answer: event.target.value
        });
    }

    renderQuestion() {
        //Get the question and time
        const { 
            currentQuestion, 
            currentQuestionNumber, 
            currentTime, 
            collection,
            justAnswer,
            isRight,
            answer
         } = this.state;

        const collectionColor = collection.color;

        //Calculate the progress
        const timeProgress = 100 - Math.floor(currentTime * 100 / this.answerTime);
        
        //Display
        return (
            currentQuestion ? 
            <div 
                className="question-screen"
                style={{color: formatColor(collectionColor)}}>
                <h1>Question {currentQuestionNumber}</h1>

                <p>{ currentQuestion.question }</p>

                <input 
                    className="input round-input" 
                    placeholder="Answer and Enter" 
                    onKeyDown={this.onAnswer}
                    onChange={this.captureAnswer}
                    value={answer}/>

                <p>
                {
                    justAnswer ? 
                    <FontAwesomeIcon 
                        icon={ isRight ? faSmileWink : faSadTear } 
                        size="2x" 
                        style={{color: formatColor(collectionColor)}}/>:
                    null
                }
                </p>
                
                <progress 
                    className="progress is-primary" 
                    max="100" 
                    value={timeProgress}>
                    {timeProgress}%
                </progress>
            </div> : null
        )
    }

    renderLoading() {
        return (
            <div className="loader-wrapper">
                <Loader
                    type="Puff"
                    color="#2A9D8F"
                    height={100}
                    width={100}/>
            </div>
        )
    }

    componentDidMount() {
        //Create interval task -> Get the id
        const intervalId = setInterval(this.updateQuestion, 500);

        //Set the id
        this.setState({
            intervalId
        });
    }

    componentWillUnmount() {
        //Get interval id and clear
        const { intervalId } = this.state;
        clearInterval(intervalId);
    }

    updateQuestion() {
        if (this.state.started && !this.state.ended) {
            //Only update when game has started but not ended
            const { currentTime, currentQuestionNumber, cards, intervalId, justAnswer } = this.state;
            const totalQuestion = this.props.cards.length;

            if (currentQuestionNumber >= totalQuestion && currentTime <= 0) {
                //We ran through all question -> Stop the game
                this.setState({
                    ended: true
                });

                //Stop the interval
                clearInterval(intervalId);
            } else {
                if (currentTime > 0) {
                    //There is still time -> Updating the time only
                    if (!justAnswer) {
                        //Stop timer when user just answer
                        this.setState({
                            currentTime: currentTime - 500
                        });
                    } 
                } else {
                    //There is no time left -> Updating to new question
                    const card = cards[currentQuestionNumber];

                    //Create question
                    const question = {
                        type: 1,
                        question: card.description,
                        answer: card.title
                    }

                    //Set question, reset time and currentQuestionNumber
                    this.setState({
                        currentQuestion: question,
                        currentQuestionNumber: currentQuestionNumber + 1,
                        currentTime: this.answerTime,
                    });
                }
            }
        }
    }

    startGame() {
        //Shuffle card array
        let { cards } = this.props;
        shuffleArray(cards);

        //Create interval task -> Get the id
        const intervalId = setInterval(this.updateQuestion, 500);

        //Now set state
        this.setState({
            intervalId,
            started: true,
            ended: false,
            cards
        }, () => this.updateQuestion());
    }

    render() {
        //Get the isOpen from props
        const { isOpen, submitting } = this.props;

        //Get the state
        const { started, ended } = this.state;

        //Custom modal style
        const customStyles = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            },
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              width                 : "50vw",
              height                : "50%",
              display               : "flex",
              alignItems            : "center",
              justifyContent        : "center"
            }
        };

        return (
            <Modal 
                style={customStyles} 
                isOpen={isOpen}>
                {
                    !started ? 
                    this.renderStartScreen() :
                    (
                        !ended ? 
                        this.renderQuestion() :
                        (
                            submitting ?
                            this.renderLoading() :
                            this.renderResult()
                        )
                    )
                }
            </Modal>
        )
    }
}

export default TestModal;