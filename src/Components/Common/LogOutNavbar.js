import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.onClickLogOut = this.onClickLogOut.bind(this);
    }

    onClickLogOut() {
        this.props.onLogout();
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                </div>

                <div className="navbar-menu">
                    <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button blue-button" 
                                    style={{background: '#FCBF49'}}
                                    onClick={this.onClickLogOut}>
                                Log out
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;