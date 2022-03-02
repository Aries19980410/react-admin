import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/admin/admin.jsx';
import Login from './pages/login/login.jsx';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;