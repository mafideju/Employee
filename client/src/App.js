import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './containers/layout/Navbar';
import Footer from './containers/layout/Footer';
import Landing from './containers/layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import history from "./history";
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoutes from './router/PrivateRoutes';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Register} />
          <PrivateRoutes exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
