import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import PlayNavBar from "./PlayNavBar";
import HomeSideBar from "./HomeSideBar";
import AlbumPage from "./AlbumPage";
import SearchUsers from "./SearchUsers";
import SearchUsersPage from "./SearchUsersPage";
import { Link, useHistory } from "react-router-dom";
import PlayListView from "./PlayListView";
import test from "../data/test.json";
import SettingView from "./SettingView";
import BrowseView from "./BrowseView";
import axios from "axios";
import { SessionContext } from "../App";
import { getSessionCookie } from "../CookieHandler";
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

function HomePage() {
  const session = getSessionCookie();

  const [page, setPage] = useState(5);
  const [settings, setSettings] = useState(false);
  const [currentplaylist, setPlaylist] = useState({});
  const [currentsongs, setSongs] = useState([]);
  const [currentalbum, setcurrentAlbum] = useState({});
  const [rerender, setRerender] = useState(0);
  const [currentalbumsongs, setcurrentalbumSongs] = useState([]);
  const [userresults, setuserResults] = useState("");
  const [urPlaylists, seturPlaylists] = useState({});
  const value = { state: { page, settings, currentplaylist, currentsongs, currentalbum, currentalbumsongs, rerender, userresults, urPlaylists}, 
  actions: { setPage, setSettings, setPlaylist, setSongs, setcurrentAlbum, setcurrentalbumSongs, setRerender, setuserResults, seturPlaylists} };


  const handleOnDragEnd = (result) =>
  {

      if (!result.destination) return;
      const items = currentsongs;
      const [reordereditem] = items.splice(result.source.index,1);
      items.splice(result.destination.index, 0 , reordereditem);
      console.log("Items now: ", items);
      
      let newids = []
      for(var i = 0; i < items.length; i++)
      {
        newids.push(items[i]._id + "");
      }

      let pid = currentplaylist._id + "";
      let data = {id: pid, upsongs: newids};
      axios
        .post("http://localhost:5000/api/song/updateplaylist",data)
          .then(function(res)
          {
            console.log("Updated list: ", res.data);
            setPlaylist(res.data);
            setSongs(items);
            setPage(1);
          })
            .catch((err) => console.log(err));
  }

  
  let viewPage;
  if (page === 0) {
    viewPage = <BrowseView session = {session}/>;
  } else if (page === 1) {
    viewPage = <PlayListView playlist={currentplaylist} playlistName={currentplaylist.playlist_name} playlistTime={0} songs={currentsongs} deletePlaylist={deletePlaylist} handleOnDragEnd={handleOnDragEnd} />;
  } else if (page === 2)
    {
      viewPage = <AlbumPage />
    }
    else if (page === 3)
    {
      viewPage = <SearchUsers search = {userresults}/>
    }
    else if (page === 4)
    {
      viewPage = <SearchUsersPage playlist = {urPlaylists}/>
    }
  else {
    setPage(0);
    viewPage = <BrowseView />;
  }


  function deletePlaylist(e, id, owner) {
    e.preventDefault();
    let data = {id: id, owner: owner};
    axios
    .post("http://localhost:5000/api/playlist/delete", data)
    .then(function (res) {
      console.log("playlist has been deleted");
      setPlaylist(res.data);
      setRerender(rerender+1);
      setPage(0);
    })
    .catch((err) => console.log(err));
  }



  return (
    <ViewPage.Provider value={value}>
      <div className="homepage1">
        <HomeSideBar />
        <ContentWindow>
          <Navbar>
            <StyledAvatar>
              {session.username.charAt(0).toUpperCase()}
            </StyledAvatar>

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
