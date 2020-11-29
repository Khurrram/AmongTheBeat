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
import { Link } from "react-router-dom";
import { getSessionCookie } from "../CookieHandler";
import axios from "axios";

import "react-pro-sidebar/dist/css/styles.css";

function Sidebar() {
  const session = getSessionCookie();

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
          </MenuItem>
          <MenuItem
            id="fontsize"
            onClick={() => {
              // actions.setPage(0);
            }}
          >
            Browse
          </MenuItem>
          <StyledSearh placeholder="Search User" />
        </Menu>
        <Separator width="90%" color="white"></Separator>
        <Menu>
          <MenuItem id="fontlarge">
            New Playlist <Add />
          </MenuItem>
          {/* {isLoading ? (
            <p>loading...</p>
          ) : (
            playlists.map((playlist) => (
              <MenuItem
                key={playlist._id}
                onClick={() => currentplaylist(playlist)}
              >
                {playlist.playlist_name}
              </MenuItem>
            ))
          )} */}
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

const test2 = styled(MenuItem)`
  margin-top: 1rem;
`;
export default Sidebar;
