import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import fbConnection from '../helpers/data/connection';
import Stretches from '../components/Stretches/Stretches';
import Profile from '../components/Profile/Profile';
import Single from '../components/Single/Single';
import Routine from '../components/Routine/Routine';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
    <div className="App">
      <BrowserRouter>
      <React.Fragment>
        <MyNavbar authed={authed} />
        <div className='container'>
          <div className='row'>
            <Switch>
              <PublicRoute path='/auth' component={Auth} authed={authed}/>
              <PrivateRoute path='/home' component={Home} authed={authed}/>

              <PrivateRoute path='/stretches' component={Stretches} authed={authed}/>
              <PrivateRoute path='/profile' component={Profile} authed={authed}/>
              <PrivateRoute path='/single/:id' component={Single} authed={authed}/>
              <PrivateRoute path='/routine/:id' component={Routine} authed={authed}/>

              <Redirect from='*' to='/auth' />
            </Switch>
          </div>
        </div>
      </React.Fragment>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
