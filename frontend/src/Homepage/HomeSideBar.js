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

class HomeSideBar extends React.Component {
  // const { state, actions } = useContext(ViewPage);
  // const [ playlists, setPlaylists] = useState([]);

  constructor(props) {
    super(props);
    this.state = {session : '', toggle : true, playlists: [], enabled : ''};
    this.createPlaylist = this.createPlaylist.bind(this);
    this.doubleclicked = this.doubleclicked.bind(this);
    this.onblurHandler = this.onblurHandler.bind(this);
  }
  
  // toggle = false;
  // const [disabled, setDisabled] = useState(true);
  // const session = getSessionCookie();
  // var playlists = [];

  createPlaylist(e) {
    e.preventDefault();
    let data = { id: this.state.session.id };
    let self = this;
    axios
    .post("http://localhost:5000/api/playlist/createPlaylist", data)
    .then(function (res) {
      console.log("res: " + res.data);
      self.setState({toggle : true});
    })
    .catch((err) => console.log(err));
  }

  componentDidMount() {
    console.log("HomePage Side Bar is mounted");
    let session = getSessionCookie();
    this.setState({session: session});
    console.log("session in homepage_k: " + this.state.session);
    let data = {id: session.id};
    let self = this;
    axios
    .post("http://localhost:5000/api/playlist/getplaylists", data)
    .then(function (res) {
      self.setState({playlists : res.data, toggle : false});
      console.log("Playlists: " + self.state.playlists);
    })
    .catch((err) => console.log(err));
  }

  shouldComponentUpdate() {
    console.log("shouldComponent")
    return this.state.toggle;
  }

  doubleclicked(e, playlist_id) {
    e.preventDefault();
    this.setState({enabled: playlist_id, toggle: true});
    console.log("double clicked");
  }
  
  // editingName(e, playlist_id) {
  //   e.preventDefault();
  //   this.setState({enabled: '', toggle: true});
  // }
  
  onblurHandler(e, playlist_id) {
    e.preventDefault();
    let data = {id : playlist_id, updatedname: e.target.value};
    let self = this;
    axios
    .post("http://localhost:5000/api/playlist/editname", data)
    .then(function (res) {
      self.setState({enabled: '', toggle: true});
    })
    .catch((err) => console.log(err));
  }
  
  render() {
    const playlists = this.state.playlists;
    const enabled = this.state.enabled;
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
            // onClick={() => {
            //   actions.setPage(0);
            // }}
          >
            Browse
          </MenuItem>
          <StyledSearh placeholder="Search User" />
        </Menu>
        <hr width="90%" color="black"></hr>
        <Menu>
          <MenuItem id="fontlarge">Playlists <Add onClick={(e) => this.createPlaylist(e)} /></MenuItem>
          {playlists.map((playlist) => {
            let path = "http://localhost:5000/playlist/" + playlist.name;
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
                  {/* <Button href={path} > */}
                <DisabledTextName
                variant="standard"
                fullWidth
                disabled={enabled !== playlist._id}
                onDoubleClick={(e) => this.doubleclicked(e, playlist._id)} 
                onClick={console.log("on click")}
                onBlur={(e) => this.onblurHandler(e, playlist._id)}
                defaultValue={playlist.playlist_name}
                />
                {/* </Button> */}
                  {/* {playlist.playlist_name}{" "} */}
                {/* </TextField> */}
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
}

export default HomeSideBar;
