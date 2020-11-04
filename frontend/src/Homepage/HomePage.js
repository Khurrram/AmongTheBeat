import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeSideBar from "./HomeSideBar";
import { Link, useHistory } from "react-router-dom";
import test from "../data/test.json";

import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlayNavBar from "./PlayNavBar";
import BrowseView from "./BrowseView";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "@material-ui/icons";

const ContentWindow = styled.div`
  padding: 1.5em 0em 0em 0em;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
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
  background-color: black;

  & span {
    color: white;
    margin-left: 1.5em;
  }

  &.right {
    margin-left: auto;
    margin-right: 2em;
  }
`;

const MiddleContent = styled.div`
  order: 1;
`;

const StyledSettingIcon = styled(SettingsIcon)`
  color: white;
`;

function HomePage(props) {
  return (
    <div className="homepage1">
      <HomeSideBar />
      <ContentWindow>
        <Navbar>
          <Avatar className="AvatarIcon">J</Avatar>
          <Link to="/settings">
            <StyledSettingIcon id="margin" />
          </Link>
        </Navbar>
        <MiddleContent>
          <BrowseView />
        </MiddleContent>
        <Footer>
          <PlayNavBar />
        </Footer>
      </ContentWindow>
    </div>
  );
}

export default HomePage;
