import React from 'react';
import HomePage from './Homepage/HomePage';
import MoodPage from './MoodPage/MoodPage';
import PlaylistPage from './components/Playlists'
import LandingPage from './LandingPage/LandingPage';
import BrowsePage from './components/Browse';
import SettingsPage from './components/Settings'
import AdminPage from './components/Admin'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={LandingPage}/>
        <Route path = '/home' exact = {true} component = {HomePage} />
        <Route path = '/mood' exact = {true} component = {MoodPage}/>
        <Route path = '/land' exact = {true} component = {LandingPage} />
        <Route path= '/settings' exact = {true} component = {SettingsPage} />
        <Route path = '/admin' exact = {true} component = {AdminPage} />
      </Switch>
    </Router>
  );
}


export default App;

