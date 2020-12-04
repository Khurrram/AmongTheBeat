import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Router, Switch, Route, useRouteMatch } from "react-router-dom";
import SideBar from "./Sidebar";
import PlayListView from "./PlayListView";
import PlayNavBar from "../Homepage/PlayNavBar";
import BrowseView from "./BrowseView";
import UserPlaylistView from "./UserPlaylistView";
import HomeDashView from "./HomeDashView";
import usePlaylists from "../DataManipulation/usePlaylists";
import SearchUsers from "./SearchUsers";
import SearchUsersPage from "./SearchUsersPage";
import AlbumPage from "./AlbumPage";
import LikePage from "./LikedSongs";
import { getSessionCookie } from "../CookieHandler";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import SpotifyPlayerContainer from "./SpotifyPlayerContainer";
import { PlaylistAdd } from "@material-ui/icons";
import SettingsView from "../Homepage/SettingView";
import Axios from "axios";

export const HomeContext = React.createContext();

function Home() {
  const [settings, setSettings] = useState(false);
  const [reload, setReload] = useState(false);
  let { path, url } = useRouteMatch();
  const session = getSessionCookie();
  let {
    playlists,
    currentPlaylist,
    createPlaylists,
    deletePlaylists,
    editPlaylists,
    changeCurrentPlaylistView,
    removeSongFromPlaylistID,
    addSongToPlaylistID,
    getValidPlaylists,
  } = usePlaylists(session.id);

  const contextValue = {
    state: { playlists, currentPlaylist },
    actions: {
      createPlaylists,
      deletePlaylists,
      editPlaylists,
      changeCurrentPlaylistView,
      removeSongFromPlaylistID,
      addSongToPlaylistID,
      getValidPlaylists,
    },
  };
  return (
    <HomeContext.Provider value={contextValue}>
      <HomeContainer>
        <SideBar playlists={playlists} />
        <ContentWindow>
          <SpotifyPlayerContainer />
          <Navbar>
            <StyledAvatar>
              <SpotifyProfile accessToken={session.accessToken} />
            </StyledAvatar>
            <StyledSettingIcon onClick={() => setSettings(true)} />
          </Navbar>
          <ContentWindow>
            {settings && <SettingsView></SettingsView>}
            <Switch>
              <Route exact path={`${path}`}>
                <HomeDashView></HomeDashView>
              </Route>
              <Route exact path={`${path}/browse`}>
                <BrowseView></BrowseView>
              </Route>

              <Route exact path={`${path}/browse/album`}>
                <AlbumPage />
              </Route>

              <Route exact path={`${path}/likedsongs`}>
                <LikePage />
              </Route>

              <Route
                exact
                path={`${path}/playlist/:playlistID`}
                component={PlayListView}
              />
              <Route exact path={`${path}/user/:userID`}>
                <UserPlaylistView></UserPlaylistView>
              </Route>

              <Route exact path={`${path}/searchuser`}>
                <SearchUsers />
              </Route>

              <Route exact path={`${path}/searchuser/:ownerID`}>
                <SearchUsersPage />
              </Route>
            </Switch>
          </ContentWindow>
          <Footer>
            <PlayNavBar></PlayNavBar>
          </Footer>
        </ContentWindow>
      </HomeContainer>
    </HomeContext.Provider>
  );
}

function SpotifyProfile(props) {
  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    console.log(props);
    Axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + props.accessToken,
      },
    })
      .then((response) => {
        setUrl(response.data.images[0].url);
        console.log(response.data.images[0].url);
      })
      .catch((err) => console.log(err));
  }, []);

  return <StyledImg src={url} />;
}

const StyledImg = styled.img`
  width: 48px;
`;

const HomeContainer = styled.div`
  height: 100vmin;
  display: flex;
  align-items: stretch;
`;

const ContentWindow = styled.div`
  padding: .5em 0em 0em 0em;
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
  padding-right: 7em;
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

const StyledSettingIcon = styled(SettingsIcon)`
  color: white;
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    max-height: 48px;
    max-width: 48px;
    height: 48px;
    width: 48px;
  }
`;

export default Home;
