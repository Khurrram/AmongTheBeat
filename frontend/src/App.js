import React from 'react';
import Home from './Homepage/HomePage';
import MoodPage from './MoodPage/MoodPage';
import PlaylistPage from './components/Playlists'
import LandingPage from './LandingPage/LandingPage';
import BrowsePage from './components/Browse';
import test from './data/test.json';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path = '/browse' exact = {true} component = {BrowsePage}/>
        <Route path = '/mood' exact = {true} component = {MoodPage}/>
        <Route path = '/playlist/:id' exact = {true} component = {PlaylistPage} />
        <Route path = '/land' exact = {true} component = {LandingPage} />
      </Switch>
    </Router>
  );
}


export default App;

