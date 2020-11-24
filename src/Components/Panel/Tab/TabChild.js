import React from 'react';

class TabChild extends React.Component {
    render() {
        return (
            <div className="tab-child">
            {
                this.props.children
            }
            </div>
        )
    }
}

export default TabChild;