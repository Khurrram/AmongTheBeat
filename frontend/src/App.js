import React from 'react';
import Home from './Homepage/HomePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;

