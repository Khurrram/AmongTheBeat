import React, { useState } from "react";
import HomePage from "./Homepage/HomePage";
import MoodPage from "./MoodPage/MoodPage";
import PlaylistPage from "./components/Playlists";
import LandingPage from "./LandingPage/LandingPage";
import BrowsePage from "./components/Browse";
import SettingsPage from "./components/Settings";
import AdminPage from "./components/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => (auth ? <Redirect to="/home" /> : <LandingPage />)}
        />
        <Route
          path="/home"
          exact={true}
          render={() => (!auth ? <Redirect to="/" /> : <HomePage />)}
        />
        <Route
          path="/mood"
          exact={true}
          render={() => (!auth ? <Redirect to="/home" /> : <MoodPage />)}
        />
        <Route
          path="/settings"
          exact={true}
          render={() => (!auth ? <Redirect to="/" /> : <SettingsPage />)}
        />
        <Route
          path="/admin"
          exact={true}
          render={() => (!auth ? <Redirect to="/" /> : <AdminPage />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
