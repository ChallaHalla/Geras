import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import VoteView from './containers/VoteView/VoteView';
import EventView from './containers/EventView/EventView';
import { createBrowserHistory } from 'history';
import Register from './containers/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Signin from './containers/Signin/Signin';
import PollView from './containers/PollView/PollView';
import 'bulma/css/bulma.min.css';
class App extends Component {
  render() {
    const hist = createBrowserHistory();
    const App = () => (
      <div>

        <NavBar />
        <Switch>
        <Route exact path='/vote' component={VoteView} />
        <Route exact path='/events' component={EventView} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/dash' component={PollView} />
        <Redirect exact from='/' to='/register' />
        </Switch>
      </div>
    );
    return (
      <Router history={hist}>
        <App />
      </Router>
    );
  }
}

export default App;
