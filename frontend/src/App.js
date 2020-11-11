import React, { useContext, useEffect, useState } from "react";
import HomePage from "./Homepage/HomePage";
import MoodPage from "./MoodPage/MoodPage";
import LandingPage from "./LandingPage/LandingPage";
import SettingsPage from "./components/Settings";
import AdminPage from "./components/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";
import { getSessionCookie } from "./CookieHandler";

export const SessionContext = React.createContext(getSessionCookie());

function App() {
  const [session, setSession] = useState(getSessionCookie());
  let value = { state: { session }, actions: { setSession } };

  useEffect(() => {
    setSession(getSessionCookie());
    // console.log("app " + JSON.stringify(session));
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <Router>
        <Switch>
          <Route
            path="/home"
            exact={true}
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/"
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
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <MoodPage />
              )
            }
          />
          <Route
            path="/settings"
            exact={true}
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <SettingsPage />
              )
            }
          />
          <Route
            path="/admin"
            exact={true}
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <AdminPage />
              )
            }
          />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
