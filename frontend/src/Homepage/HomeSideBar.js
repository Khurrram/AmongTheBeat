import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import SearchBar from "material-ui-search-bar";
import test from "../data/test.json";
import { ViewPage } from "./HomePage";
import { Add } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import {
  ProSidebar as Sidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { getSessionCookie } from "../CookieHandler";
import axios from 'axios';

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

const StyledSearh = styled(SearchBar)`
  max-height: 2em;
  margin-left: 1em;
  margin-right: 1em;
`;

function HomeSideBar(props) {
  const { state, actions } = useContext(ViewPage);
  // const [ playlists, setPlaylists] = useState([]);
  const toggle = false;
  const [disabled, setDisabled] = useState(true);
  const session = getSessionCookie();
  var playlists = [];

  function createPlaylist(e) {
    e.preventDefault();

    let data = {id : session.id};

    axios
    .post("http://localhost:5000/api/playlist/createPlaylist", data)
    .then(function (res) {
      let id = res.data;
      console.log("res: " + res.data);
      toggle = !toggle;
    })
    .catch((err) => console.log(err));

  }

  function changeName(e) {
    e.preventDefault();

  }

  useEffect(() => {
    console.log("useEffect is called");
    let data = { id: session.id };
    axios
      .post("http://localhost:5000/api/playlist/getplaylists", data)
      .then(function (res) {
        playlists = res.data;
        console.log("Playlists: " + playlists);
      })
      .catch((err) => console.log(err));
  }, [playlists]);

  useEffect(() => {
  }, []);


  return (
    <Sidebar>
      <SidebarHeader>
        <div id="center">
          <Image id="img" src={logo} fluid />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem
            id="fontsize"
            onClick={() => {
              actions.setPage(0);
            }}
          >
            Browse
          </MenuItem>
          <StyledSearh placeholder="Search User" />
        </Menu>
        <hr width="90%" color="black"></hr>
        <Menu>
          <MenuItem id="fontlarge">Playlists <Add onClick={(e) => createPlaylist(e)} /></MenuItem>
          {playlists.map((playlist) => {
            // let path = "/playlist/" + playlist.name;
            return (
              <MenuItem >
                {/* <Link
                  to={{
                    pathname: path,
                    state: {
                      name: playlist.name,
                      songs: playlist.songs,
                    },
                  }}
                > */}
                  {" "}
                  {console.log(playlist)}
                <TextField
                variant="standard"
                fullWidth
                onDoubleClick={setDisabled(false)} 
                onBlur={setDisabled(true)}
                >
                  {playlist.playlist_name}{" "}
                </TextField>
                {/* </Link> */}
              </MenuItem>
            );
          })}
        </Menu>
      </SidebarContent>
      <SidebarFooter id="center">
        <Button>Happy</Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default HomeSideBar;
