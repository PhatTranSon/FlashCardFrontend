import React from 'react';
import Navbar from '../Common/LogOutNavbar';
import Content from './Content';

import {
    Redirect
} from 'react-router-dom';

import { 
    logout
} from '../../Common/Authentication';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedOut: false
        }

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        //First log out
        logout();

        //Then redirect
        this.setState({
            loggedOut: true
        });
    }

    render() {
        return (
            this.state.loggedOut ? 
            <Redirect path="/"/> :
            <div>
                <Navbar onLogout={this.onLogout}/>
                <Content/>
            </div>
        );
    }
}

export default UserPanel;