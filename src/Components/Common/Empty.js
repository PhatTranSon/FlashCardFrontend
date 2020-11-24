import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


class Empty extends React.Component {
    render() {
        //Create styling for empty block
        const style = {
            textAlign: "center",
            paddingTop: "10vh",
            paddingBottom: "10vh"
        }

        return (
            <div className="empty" style={style}>
                <FontAwesomeIcon icon={ faFolder } size="3x"/>
                <h1>{ this.props.title }</h1>
            </div>
        )
    }
}

export default Empty;