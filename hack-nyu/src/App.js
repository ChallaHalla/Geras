import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VoteView from './containers/VoteView/VoteView';
import EventView from './containers/EventView/EventView';
import { createBrowserHistory } from 'history';
import RegisterView from './containers/RegisterView/RegisterView';
import NavBar from './components/NavBar/NavBar';
import 'bulma/css/bulma.min.css';

class App extends Component {
  render() {
    const hist = createBrowserHistory();
    const App = () => (
      <div>
        <NavBar />
        <Route exact path='/vote' component={VoteView} />
        <Route exact path='/events' component={EventView} />
        <Route exact path='/register' component={RegisterView} />
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
