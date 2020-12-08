import React from 'react';
import './style.css';
import Modal from 'react-modal';

import { CirclePicker } from 'react-color';

import {
    getPhonetic
} from '../../../Common/Helpers';

class UpdateCardModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: false, 
            errorMessage: null
        }

        //Set the root of modal component
        Modal.setAppElement('body');

        //Binding
        this.colorChosen = this.colorChosen.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSuccessButtonClicked = this.onSuccessButtonClicked.bind(this);
        this.onPhoneticChange = this.onPhoneticChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.generatePhonetic = this.generatePhonetic.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.color !== nextState.color) {
            return false;
        }
        return true;
    }

    //Handle color chosen
    colorChosen(color) {
        //Get the hex value of color by getting rid of the # at the begining
        color = color.hex.slice(1);

        //Set state
        this.setState({
            color
        });
    }

    onFormSubmit(event) {
        //Get props
        const { id } = this.props;

        //Prevent form reload
        event.preventDefault();

        //Get form data
        const formData = new FormData(event.target);

        //Get title, color and description
        const title = formData.get('title');
        const description = formData.get('description');
        const phonetic = formData.get('phonetic');
        const color = this.state.color;

        //Reset the title and phonetic
        this.setState({
            title: "",
            phonetic: ""
        });

        //Call props method
        this.props.onEditCard(id, title, description, phonetic, color);
    }

    onSuccessButtonClicked() {
        this.props.onSuccessButtonClicked();
    }

    onPhoneticChange(event) {
        this.setState({
            phonetic: event.target.value
        });
    }

    onTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    generatePhonetic() {
        //Get the title
        const title = this.state.title;

        //Set loading
        this.setState({
            loading: true
        });

        //Generate phonetics
        getPhonetic(title, (error, phonetic) => {
            if (!phonetic) {
                //Error handling - TODO
                this.setState({
                    error: true,
                    errorMessage: "Error generating phonetic"
                });
            } else {
                //Get phonetic
                this.setState({
                    phonetic,
                    loading: false, //Loading done
                    errorMessage: null,
                    error: false
                });
            }   
        });
    }

    render() {
        //Get the props
        const { isOpen, error, success, errorMessage, title, description, color, phonetic } = this.props;
        const { loading } = this.state;

        //Get the internally generated error
        const phoneticError = this.state.error;
        const phoneticErrorMessage = this.state.errorMessage;

        //Custom modal style
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              width                 : "50vw",
              maxHeight                : "80%"
            }
        };

        //Custom colors
        const colors = [
            "#264653",
            "#f4a261",
            "#e76f51",
            "#1d3557",
            "#457b9d",
            "#b5838d",
            "#83c5be",
            "#06d6a0",
            "#cdb4db",
            "#3a0ca3",
            "#5a189a"
        ]
          

        return (
            <Modal 
                isOpen={isOpen}
                style={customStyles}>
                <div className="create-collection-modal">
                    {
                        success ? 
                        <div className="modal-success">
                            <h1 className="modal-success-title">Successfully updated card</h1>
                            <a
                                className="button blue-button"
                                style={{background: '#2a9d8f', display: "inline-block"}}
                                onClick={() => this.onSuccessButtonClicked()}>
                                Return
                            </a>
                        </div> :
                        <>
                            <h1 className="collection-modal-title">Update flashcard</h1>
                            {
                                (error || phoneticError) ? 
                                <p className="form-error-message">{ errorMessage || phoneticErrorMessage }</p> :
                                null
                            }
                            <form onSubmit={this.onFormSubmit}>
                                <div className="field">
                                    <label className="label blue-label">Word and Phonetic</label>
                                    <div className="control">
                                        <input name="title" 
                                            className="input round-input" 
                                            type="text" 
                                            placeholder="Choose word"
                                            defaultValue={title}/>
                                    </div>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <input name="phonetic" 
                                            className="input round-input" 
                                            type="text" 
                                            placeholder="Generate phonetic" 
                                            defaultValue={phonetic}/>
                                    </div>
                                    <p className="control">
                                        <a 
                                            className="button blue-button"
                                            onClick={this.generatePhonetic}>
                                            {
                                                loading ? "Generating" : "Generate phonetic"
                                            }
                                        </a>    
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="label blue-label">Color</label>
                                    <CirclePicker 
                                        width="100%"
                                        colors={colors} 
                                        onChangeComplete={this.colorChosen}/>
                                </div>

                                <div className="field">
                                    <label className="label blue-label">Description</label>
                                    <div className="control">
                                        <textarea 
                                            name="description" 
                                            className="textarea round-input" 
                                            type="text" 
                                            placeholder="Choose description"
                                            defaultValue={description}/>
                                    </div>
                                </div>

                                <div className="control">
                                    <button 
                                        type="submit" 
                                        className="button blue-button"
                                        style={{width: "100%"}}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                    
                </div>
            </Modal>
        )
    }
}

export default UpdateCardModal;