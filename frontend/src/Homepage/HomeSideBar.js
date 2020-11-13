import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import SearchBar from "material-ui-search-bar";
import test from "../data/test.json";
import { ViewPage } from "./HomePage";
import { Add } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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

const DisabledTextName = withStyles({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#BDBDBD" // (default alpha is 0.38)
    },
    "& .MuiInput-underline.Mui-disabled:before" : {
      borderBottomStyle: 'none'
    },
    "& .MuiInputBase-root" : {
      color: "#EE276A"
    }
  }
})(TextField);

function HomeSideBar(props) {
  const { state, actions } = useContext(ViewPage);
  const [playlists, setPlaylists] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState();
  const session = getSessionCookie();
  console.log(props.setPlaylist);
  const setPlaylist = props.setPlaylist;

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

  function doubleclicked(e, playlist_id) {
    e.preventDefault();
    setEnabled(playlist_id);
    console.log("double clicked");
  }
  
  function onblurHandler(e, playlist_id) {
    e.preventDefault();
    let data = {id : playlist_id, updatedname: e.target.value};
    axios
    .post("http://localhost:5000/api/playlist/editname", data)
    .then(function (res) {
      setEnabled('');
    })
    .catch((err) => console.log(err));
  }

  function currentplaylist(playlist) {
    actions.setPlaylist(playlist);
    actions.setPage(1);
    console.log("current playlist: " + playlist.playlist_name);
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
              {/* <DisabledTextName
              variant="standard"
              fullWidth
              disabled={enabled !== playlist._id}
              // onDoubleClick={(e) => doubleclicked(e, playlist._id)} 
              onClick={currentplaylist(playlist._id)}
              onBlur={(e) => onblurHandler(e, playlist._id)}
              defaultValue={playlist.playlist_name}
              /> */}
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
