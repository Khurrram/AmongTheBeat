import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import SearchBar from "material-ui-search-bar";
import test from "../data/test.json";
import { Add } from "@material-ui/icons";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Route, useRouteMatch, Link, useHistory } from "react-router-dom";
import { getSessionCookie } from "../CookieHandler";
import axios from "axios";
import { HomeContext } from "./Home";

import "react-pro-sidebar/dist/css/styles.css";

function Sidebar(props) {
  const session = getSessionCookie();
  const { state, actions } = useContext(HomeContext);
  let { path, url } = useRouteMatch();

  let history = useHistory();
  let data = { id: session.id };

  return (
    <ProSidebar>
      <SidebarHeader>
        <div id="center">
          <Image id="img" src={logo} fluid />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem id="fontsize" style={{ padding: "0rem" }}>
            Home
            <Link to="/lol"></Link>
          </MenuItem>
          <MenuItem id="fontsize">
            Browse
            <Link to={`${url}/browse`}></Link>
          </MenuItem>
          <StyledSearh placeholder="Search User" />
        </Menu>
        <Separator width="90%" color="white"></Separator>
        <Menu>
          <MenuItem id="fontlarge">
            <FlexDiv onClick={actions.createPlaylists}>
              New Playlist <Add />
            </FlexDiv>
          </MenuItem>
          {/* {props.playlists &&
            props.playlists.map((playlist) => {
              return (
                <MenuItem
                  key={playlist._id}
                  onClick={() => {
                    actions.changeCurrentPlaylistView(playlist._id);
                    history.push(`${url}/playlist/${playlist._id}`);
                  }}
                >
                  {playlist.playlist_name}
                </MenuItem>
              );
            })} */}
          {state.playlists &&
            state.playlists.map((playlist) => {
              return (
                <MenuItem
                  key={playlist._id}
                  onClick={() => {
                    actions.changeCurrentPlaylistView(playlist._id);
                    history.push(`${url}/playlist/${playlist._id}`);
                  }}
                >
                  {playlist.playlist_name}
                </MenuItem>
              );
            })}
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}

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

const StyledSearh = styled(SearchBar)`
  max-height: 2em;
  margin-left: 1em;
  margin-right: 1em;
`;

const Separator = styled.hr`
  margin: 0.5rem auto 0 auto;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;
export default Sidebar;
