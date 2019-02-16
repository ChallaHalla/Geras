import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import VoteView from './containers/VoteView/VoteView';
import { createBrowserHistory } from 'history';

class App extends Component {
  render() {
    const hist = createBrowserHistory();
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/vote' component={VoteView} />
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
