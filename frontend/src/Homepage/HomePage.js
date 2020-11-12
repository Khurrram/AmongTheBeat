import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import PlayNavBar from "./PlayNavBar";
import HomeSideBar from "./HomeSideBar";
import { Link, useHistory } from "react-router-dom";
import PlayListView from "./PlayListView";
import test from "../data/test.json";
import SettingView from "./SettingView";
import BrowseView from "./BrowseView";
import axios from "axios";
import { SessionContext } from "../App";

import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";

const Button = styled.button`
  padding: 0.5em;
  color: Black;
  border-radius: 10px;
  margin: 0.5em;
  width: 100%;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  background-color: light-grey;
`;

const ContentWindow = styled.div`
  padding: 1.5em 0em 0em 0em;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
    background: rgb(49,22,101);
background: linear-gradient(160deg, rgba(49,22,101,1) 59%, rgba(127,60,142,1) 100%);
  );
`;

const Navbar = styled.div`
  order: 0;
  display: flex;
  flex-direction: row-reverse;
  padding: 1em;
  padding-right: 8em;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  order: 2;
  margin-top: auto;
  padding-left: 1em;
  height: 7%;
  background-color: rgba(0, 0, 0, 0.6);

  & span {
    color: white;
    margin-left: 1.5em;
  }

  &.right {
    margin-left: auto;
    margin-right: 2em;
  }
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    max-height: 40px;
    max-width: 40px;
  }
`;

const MiddleContent = styled.div`
  order: 1;
`;

const StyledSettingIcon = styled(SettingsIcon)`
  color: white;
`;

export const ViewPage = React.createContext();

function HomePage(props) {
  const session = useContext(SessionContext);

  const [page, setPage] = useState(2);
  const [settings, setSettings] = useState(false);
  const [username, setUser] = useState("");
  const value = { state: { settings }, actions: { setPage, setSettings } };

  let viewPage;
  if (page === 0) {
    viewPage = <BrowseView />;
  } else if (page === 1) {
    viewPage = <PlayListView />;
  } else {
    setPage(0);
    viewPage = <BrowseView />;
  }

  useEffect(() => {
    let data = { id: session.id };
    axios
      .post("http://localhost:5000/api/user/getusername", data)
      .then(function (res) {
        let username = res.data;
        setUser(username);
      })
      .catch((err) => console.log(err.data));
  });

  return (
    <ViewPage.Provider value={value}>
      <div className="homepage1">
        <HomeSideBar />
        <ContentWindow>
          <Navbar>
            <StyledAvatar>{username.charAt(0).toUpperCase()}</StyledAvatar>

            <StyledSettingIcon
              id="margin"
              onClick={() => {
                setSettings(true);
              }}
            />
          </Navbar>
          <MiddleContent>
            {viewPage}
            {settings && <SettingView />}
          </MiddleContent>
          <Footer>
            <PlayNavBar />
          </Footer>
        </ContentWindow>
      </div>
    </ViewPage.Provider>
  );
}

export default HomePage;
