import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import SearchBar from "material-ui-search-bar";
import test from "../data/test.json";
import { ViewPage } from "./HomePage";
import { Add } from "@material-ui/icons";


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
import axios from "axios";

import "react-pro-sidebar/dist/css/styles.css";
import { set } from "js-cookie";

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
  const [playlists, setPlaylists] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = getSessionCookie();

  let data = { id: session.id };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/playlist/getplaylists",
        data
      );
      // console.log("RESULTS " + JSON.stringify(result.data));
      setPlaylists(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [createNew]);

  function createPlaylist(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/playlist/createPlaylist", data)
      .then(function (res) {
        setCreateNew(!createNew);
      })
      .catch((err) => console.log(err));
  }

  function currentplaylist(playlist) {
    let data = {id: playlist._id};

    axios
      .post("http://localhost:5000/api/playlist/getsongs", data)
      .then(function (res) {
        console.log("IN HERE, ", res.data);
        actions.setSongs(res.data);
        actions.setPlaylist(playlist);
        actions.setPage(1);
      })
      .catch((err) => console.log(err));

  }


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
          <MenuItem id="fontlarge" onClick={(e) => createPlaylist(e)}>
            New Playlist <Add />
          </MenuItem>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            playlists.map((playlist) => (
              <MenuItem key={playlist._id} onClick={() => currentplaylist(playlist)} >               
                {playlist.playlist_name} 
              </MenuItem>
            ))
          )}
        </Menu>
      </SidebarContent>
      <SidebarFooter id="center">
        <Button>Happy</Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default HomeSideBar;
