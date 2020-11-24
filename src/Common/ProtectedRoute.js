import {
    Redirect,
    Route
} from 'react-router-dom';

import {
    isLoggedIn
} from '../Common/Authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            isLoggedIn() ? 
            <Component {...props} /> : 
            <Redirect 
                to={{
                    pathname: "/login",
                    state: { message: "Please log in first" }
                }}
                />
        )} />
    )
}

export default PrivateRoute;