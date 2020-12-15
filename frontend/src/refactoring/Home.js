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
import useScript from "../DataManipulation/useScript";
import Axios from "axios";

import { useTransition, animated } from "react-spring";

export const HomeContext = React.createContext();
export const SongContext = React.createContext();

function Home() {
  useScript("https://sdk.scdn.co/spotify-player.js");
  const [settings, setSettings] = useState(false);
  const [playingCurrentSong, setPlayingCurrentSong] = useState("");
  const [playing, setPlaying] = useState(false);
  let { path } = useRouteMatch();
  const session = getSessionCookie();
  const [url, setUrl] = useState("");
  const settingTransition = useTransition(settings, null, {
    from: { transform: "translate3d(60%,-40px,0)" },
    enter: { transform: "translate3d(0,-40px,0)" },
    leave: { transform: "translate3d(60%,-40px,0)" },
  });

  useLayoutEffect(() => {
    Axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    })
      .then((response) => {
        setUrl(response.data.images[0].url);
        // console.log(response.data.images[0].url);
      })
      .catch((err) => console.log(err));
  }, [session.accessToken]);

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
    rerender,
  } = usePlaylists(session.id);

  const songContextValue = {
    songState: { playingCurrentSong, playing },
    songActions: { setPlayingCurrentSong, setPlaying },
  };

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
      rerender,
    },
  };
  return (
    <HomeContext.Provider value={contextValue}>
      <SongContext.Provider value={songContextValue}>
        <HomeContainer>
          <SideBar playlists={playlists} />
          <ContentWindow>
            <Navbar>
              <StyledAvatar>
                <StyledImg src={url} />
              </StyledAvatar>

              <StyledSettingIcon onClick={() => setSettings(true)} />
            </Navbar>
            <MiddleContent>
              {settingTransition.map(
                ({ item, props }) =>
                  item && (
                    <animated.div style={props} key = {props}>
                      <SettingsView url={url} toggleSetting={setSettings} />
                    </animated.div>
                  )
              )}
              <Switch>
                <Route exact path={`${path}`}>
                  <HomeDashView />
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
                <Route exact path={`${path}/share/:playlistID`}>
                  <UserPlaylistView></UserPlaylistView>
                </Route>

                <Route exact path={`${path}/searchuser`}>
                  <SearchUsers />
                </Route>

                <Route exact path={`${path}/searchuser/:ownerID`}>
                  <SearchUsersPage />
                </Route>
              </Switch>
            </MiddleContent>
            <Footer>
              <PlayNavBar></PlayNavBar>
            </Footer>
          </ContentWindow>
        </HomeContainer>
      </SongContext.Provider>
    </HomeContext.Provider>
  );
}

const MiddleContent = styled.div`
  order: 1;
`;

const StyledImg = styled.img`
  width: 48px;
  max-width: 48px;
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
