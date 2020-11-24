import { faEdit, faPlus, faVials } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class IconPanel extends React.Component {
    render() {
        //Get the props
        const size = this.props.size;
        const style = {
            margin: "0 2vh"
        }

        //Get event handler
        const { onAdd, onEdit, onTest } = this.props;

        return (
            <div className="icon-panel">
                <FontAwesomeIcon icon={faPlus} size={size} style={style} onClick={() => onAdd()}/>
                <FontAwesomeIcon icon={faEdit} size={size} style={style} onClick={() => onEdit()}/>
                <FontAwesomeIcon icon={faVials} size={size} style={style} onClick={() => onTest()}/>
            </div>
        )
    }
}

export default IconPanel;