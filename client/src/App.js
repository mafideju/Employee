import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import { Container } from "semantic-ui-react";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import history from "./history";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Register} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
