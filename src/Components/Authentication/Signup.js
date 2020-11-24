import React from 'react';
import Panel from './Panel';

import {
    Redirect
} from 'react-router-dom';

import { signup } from '../../Common/Authentication';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage: "",
            loggedIn: false
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        //console.log('yes');
        //Prevent form reload
        event.preventDefault();

        //Get the data from form data
        const formData = new FormData(event.target);

        //Get data from form
        const name = formData.get("name");
        const password =  formData.get("password");
        const passwordConfirmation = formData.get("password-confirm");

        //console.log(name, password, passwordConfirmation);

        //Check if confirm password and password matches
        if (password !== passwordConfirmation) {
            this.setState({
                error: true,
                errorMessage: "Password confirmation does not match"
            });
        } else {
            //If match -> Call signup
            signup(name, password)
                .then(response => {
                    //Successful sign up -> Redirect
                    this.setState({
                        loggedIn: true
                    });
                })
                .catch(error => {
                    //console.log(error);
                    //Extract info
                    const data = error.response.data;
                    const status = error.response.status;

                    //Check error code
                    if (status === 500) {
                        this.setState({
                            error: true,
                            errorMessage: data.message
                        });
                    } else {
                        this.setState({
                            error: true,
                            errorMessage: "Something went wront. Please try again."
                        })
                    }
                });
        }
    }

    render() {
        return (
            this.state.loggedIn ? <Redirect to="/panel"/> :
            <Panel>
                <div>
                    <h1 id="right-panel-title">Sign up to <span className="blue-underlined">MyCard</span></h1>
                    {
                        this.state.error ? 
                            <div className="form-error-message">
                                {this.state.errorMessage}
                            </div> : null
                    }
                    <form onSubmit={this.onFormSubmit}>
                        <div className="field authentication-field">
                            <label className="label blue-label">Username</label>
                            <div className="control">
                                <input name="name" className="input round-input" type="text" placeholder="Choose username"/>
                            </div>
                        </div>

                        <div className="field authentication-field">
                            <label className="label blue-label">Password</label>
                            <div className="control">
                                <input name="password" className="input round-input" type="password" placeholder="Choose username"/>
                            </div>
                        </div>

                        <div className="field authentication-field">
                            <label className="label blue-label">Confirm password</label>
                            <div className="control">
                                <input name="password-confirm" className="input round-input" type="password" placeholder="Choose username"/>
                            </div>
                        </div>

                        <div className="control">
                            <button 
                                type="submit" 
                                className="button blue-button"
                                style={{width: "100%"}}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </Panel>
        )
    }
}

export default Signup;