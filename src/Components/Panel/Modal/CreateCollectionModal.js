import React from 'react';
import './style.css';
import Modal from 'react-modal';

import { CirclePicker } from 'react-color';

class CollectionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: ""
        }

        //Set the root of modal component
        Modal.setAppElement('body');

        //Binding
        this.colorChosen = this.colorChosen.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSuccessButtonClicked = this.onSuccessButtonClicked.bind(this);
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
        //Prevent form reload
        event.preventDefault();

        //Get form data
        const formData = new FormData(event.target);

        //Get title, color and description
        const title = formData.get('title');
        const description = formData.get('description');
        const color = this.state.color;

        //Call props method
        this.props.onCreateCollection({ title, description, color });
    }

    onSuccessButtonClicked() {
        this.props.onSuccessButtonClicked();
    }

    render() {
        //Get the props
        const { isOpen, error, success, errorMessage } = this.props;

        console.log(errorMessage);

        //Custom modal style
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              width                 : "50vw"
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
                            <h1 className="modal-success-title">Successfully created collection</h1>
                            <a
                                className="button blue-button"
                                style={{background: '#2a9d8f', display: "inline-block"}}
                                onClick={() => this.onSuccessButtonClicked()}>
                                Return
                            </a>
                        </div> :
                        <>
                            <h1 className="collection-modal-title">Create flashcard collection</h1>
                            {
                                error ? 
                                <p className="form-error-message">{ errorMessage }</p> :
                                null
                            }
                            <form onSubmit={this.onFormSubmit}>
                                <div className="field">
                                    <label className="label blue-label">Title</label>
                                    <div className="control">
                                        <input name="title" className="input round-input" type="text" placeholder="Choose title"/>
                                    </div>
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
                                        <textarea name="description" className="textarea round-input" type="text" placeholder="Choose description"/>
                                    </div>
                                </div>

                                <div className="control">
                                    <button 
                                        type="submit" 
                                        className="button blue-button"
                                        style={{width: "100%"}}
                                    >
                                        Create
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

export default CollectionModal;