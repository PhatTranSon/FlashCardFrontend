import React from 'react';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    faTrash,
    faHeart,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

import {
    faHeart as faHeartRegular
} from '@fortawesome/free-regular-svg-icons'

class Like extends React.Component {
    constructor(props) {
        super(props);

        //Binding
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onLikeClicked = this.onLikeClicked.bind(this);
    }

    onDeleteClicked(e) {
        e.stopPropagation();
        //Call passed method
        this.props.onDelete();
    }

    onEditClicked(e) {
        e.stopPropagation();
        this.props.onEdit();
    }

    onLikeClicked(e) {
        e.stopPropagation();
        //Call passed method
        this.props.onLike();
    }

    render() {
        //Display if show delete button or not
        const { showDelete, showEdit, liked, likes } = this.props;
        const inverted = this.props.inverted || false;

        //Render 
        return (
            <div className="like-panel">
                {
                    /*Display delete button or not*/
                    showDelete ? 
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="green-icon"
                        style={{ marginRight: "2vh"}}
                        onClick={(e) => this.onDeleteClicked(e)}/> 
                    : null
                }
                {
                    showEdit ?
                    <FontAwesomeIcon 
                        icon={faEdit} 
                        className="yellow-icon"
                        style={{ marginRight: "2vh"}}
                        onClick={(e) => this.onEditClicked(e)}/> 
                    : null
                }
                {
                    liked ?
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        style={{ marginRight: "1vh"}} 
                        className="red-icon"
                        onClick={(e) => this.onLikeClicked(e)}/>:
                    <FontAwesomeIcon 
                        icon={faHeartRegular} 
                        style={{ marginRight: "1vh"}}
                        className="red-icon"
                        onClick={(e) => this.onLikeClicked(e)}/>
                }
                <span style={ inverted ? { color: 'white' }: null}>{likes}</span>
            </div>
        )
    }
}

export default Like;