import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import logo from "../assets/logo.png";
import { Image } from "react-bootstrap";
import Song from "./Song";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import PlayNavBar from "./PlayNavBar";
import HomeSideBar from "./HomeSideBar";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link, useHistory } from "react-router-dom";
import PlayingNow from "../components/PlayingNow";
import PlayListView from "./PlayListView";
import BrowseView from "./BrowseView";
import test from "../data/test.json";
import Playlists from "../components/Playlists";
import Browse from "../components/Browse";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SearchBar from "material-ui-search-bar";
import RepeatIcon from "@material-ui/icons/Repeat";

import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import { StayCurrentPortrait } from "@material-ui/icons";

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

const StyledAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
`;

const MiddleContent = styled.div`
  order: 1;
`;

const StyledSettingIcon = styled(SettingsIcon)`
  color: white;
`;

function HomePage(props) {
  const [page, setPage] = useState(0);

  var viewPage;
  if (page == 0) {
    viewPage = <BrowseView />;
  } else if (page == 1) {
    viewPage = <PlayListView />;
  }
  return (
    <div className="homepage1">
      <HomeSideBar />
      <ContentWindow>
        <Navbar>
          <StyledAvatar className="AvatarIcon">J</StyledAvatar>
          <Link to="/settings">
            <StyledSettingIcon id="margin" />
          </Link>
        </Navbar>
        <MiddleContent>{viewPage}</MiddleContent>
        <Footer>
          <PlayNavBar />
        </Footer>
      </ContentWindow>
    </div>
  );
}

export default HomePage;
