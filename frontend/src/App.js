import React, { useState, useContext, createContext, useEffect } from "react";
import HomePage from "./Homepage/HomePage";
import MoodPage from "./MoodPage/MoodPage";
import PlaylistPage from "./components/Playlists";
import LandingPage from "./LandingPage/LandingPage";
import SettingsPage from "./components/Settings";
import AdminPage from "./components/Admin";
import { createBrowserHistory } from "history";
import { getSessionCookie, setSessionCookie } from "./CookieHandler";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";

export const AppContext = createContext();
const history = createBrowserHistory();

function App() {
  const [auth, setAuth] = useState(false);
  const [session, setSession] = useState(getSessionCookie());

  useEffect(() => {
    setSession(getSessionCookie());
  }, []);

  return (
    <AppContext.Provider value={{ session }}>
      <Router history={history}>
        <Switch>
          <Route
            path="/land"
            exact={true}
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route
            path="/mood"
            exact={true}
            render={() =>
              session.username === undefined ? (
                <Redirect to="/land" />
              ) : (
                <MoodPage />
              )
            }
          />
          <Route
            path="/settings"
            exact={true}
            render={() =>
              session.username === undefined ? (
                <Redirect to="/land" />
              ) : (
                <SettingsPage />
              )
            }
          />
          <Route
            path="/admin"
            exact={true}
            render={() =>
              session.username === undefined ? (
                <Redirect to="/land" />
              ) : (
                <AdminPage />
              )
            }
          />
          <Route
            path="/"
            render={() =>
              session.username === undefined ? (
                <Redirect to="/land" />
              ) : (
                <HomePage />
              )
            }
          />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
