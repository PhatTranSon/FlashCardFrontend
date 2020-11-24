import React from 'react';
import Loader from 'react-loader-spinner';


class Loading extends React.Component {
    render() {
        return (
            <div className="loader-wrapper">
                <Loader
                    type="Puff"
                    color="#2A9D8F"
                    height={100}
                    width={100}/>
            </div>
        );
    }
}

export default Loading;