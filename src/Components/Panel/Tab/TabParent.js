import React from 'react';
import './style.css';

import {
    Animated
} from 'react-animated-css';

class TabParent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0, //Save active panel
            direction: 0, //Current direction of slide: 0 - No, 1 - Left, 2 - Right
            toggle: false
        }

        this.constructHeaders = this.constructHeaders.bind(this);
        this.constructPanel = this.constructPanel.bind(this);
        this.onTabChosen = this.onTabChosen.bind(this);

        this.animationRef = React.createRef();
    }

    onTabChosen(index) {
        //Check previous active and index
        const { active, toggle } = this.state;
        let direction;
        if (index < active) {
            direction = 1
        } else if (index > active) {
            direction = 2
        } else {
            direction = 0;
        }

        //Set activate tab
        this.setState({
            active: index,
            direction,
            toggle: !toggle
        });
    }

    constructHeaders() {
        //Get the children from props
        const { children } = this.props;

        //Get the active tab
        const active = this.state.active;

        //Map the children to get only the name and key
        const names = children.map(child => {
            return child.props.name;
        });

        /*
        const keys = React.Children.map((children, child) => {
            return child.props.key;
        });
        */

        //Then create a list containing the panels' title
        return (
            <div className="tab-header columns">
            {
                names.map((name, index) => {
                    return (
                        <div 
                            className={`tab-header-child column ${index === active ? "tab-header-active" : ""}`}
                            key={index}
                            onClick={() => (this.onTabChosen.bind(this))(index)}>
                            {
                                name
                            }
                        </div>
                    )
                })
            }
            </div>
        )
    }

    constructPanel() {
        //Get the children from props
        const { children } = this.props;

        //Get the current active index
        const { active, direction, toggle } = this.state;
        const inType = direction === 1 ? "slideInRight" : "slideInLeft";

        //Choose the children with the index
        const child = children[active];

        //Render child
        return (
            direction === 0 ? 
            <div className="tab-panel">
                {
                    child.props.children
                }
            </div> :
            <div
                className={`animated ${inType}`} 
                style={{animationDelay: "0ms", animationDuration: "200ms", pointerEvents: "all"}}
                key={toggle}>
                <div className="tab-panel">
                    {
                        child.props.children
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="tab-parent">
                {
                    /*Render headers*/
                    this.constructHeaders()
                }
                {
                    /*Render panel*/
                    this.constructPanel()
                }
            </div>
        )
    }
}

export default TabParent;