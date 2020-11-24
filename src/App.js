//Univerisal Bulma CSS library
import 'bulma/css/bulma.min.css';

//Loader css library
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//React router dom for navigation
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Custom protected route
import PrivateRoute from './Common/ProtectedRoute';

//Pages for each route
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import UserPanel from './Components/Panel/UserPanel';
import CollectionDetails from './Components/Details/CollectionDetails';
import Home from './Components/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/collections/:collectionId" component={CollectionDetails}/>
          <Route path="/signup" render={(props) => <Signup {...props}/>}/>
          <Route path="/login" render={(props) => <Login {...props}/>}/>
          <PrivateRoute path="/panel" component={UserPanel}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
