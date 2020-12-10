import React, { useContext, useEffect, useState } from "react";
import HomePage from "./Homepage/HomePage";
import LandingPage from "./LandingPage/LandingPage";
import SettingsPage from "./components/Settings";
import AdminPage from "./components/Admin";
import RedirectPage from "./components/Redirect"
import Test from "./data/testdrag";
import Home from "./refactoring/Home";

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
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
      <BrowserRouter>
        <Switch>
          <Route
            path="/home"
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <Home/>
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

          <Route 
            path = "/redirect"
            exact = {true}
            render={() =>
              !session.username === undefined ? (
                <Redirect to="/" />
              ) : (
                <RedirectPage />
              )
            }

          />

          <Route
            path="/test"
            exact={true}
            render={() =>
              !session.username === undefined ? <Redirect to="/" /> : <Test />
            }
          />

        </Switch>
      </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
