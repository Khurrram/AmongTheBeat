import React, { useState, useEffect, useContext, useReducer } from "react";

import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import PlayNavBar from "./PlayNavBar";
import HomeSideBar from "./HomeSideBar";
import AlbumPage from "./AlbumPage";
import { Link, useHistory } from "react-router-dom";
import PlayListView from "./PlayListView";
import test from "../data/test.json";
import SettingView from "./SettingView";
import BrowseView from "./BrowseView";
import axios from "axios";
import { SessionContext } from "../App";
import { getSessionCookie } from "../CookieHandler";
import { playlistsInitialState, playlistReducer } from "./reducers";
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

  const [reduceState, dispatch] = useReducer(
    playlistReducer,
    playlistsInitialState
  );
  const [test, setTest] = useState(0);

  useEffect(() => {
    let data = { id: session.id };
    axios
      .post("http://localhost:5000/api/playlist/getplaylists", data)
      .then((response) => {
        // console.log({ response });
        dispatch({ type: "FETCH_SUCCESS", playlists: response.data });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_ERROR",
          errorMessage: "Fail update Playlists" + error,
        });
      });
  }, [test]);

  const playlistView2 = (idObject) => {
    axios
      .post("http://localhost:5000/api/playlist/getsongs", idObject)
      .then((response) => {
        dispatch({ type: "FETCH_SONG_SUCCESS", playlistSongs: response.data });
      })
      .catch((error) =>
        dispatch({
          type: "FETCH_ERROR",
          errorMessage: "Fail update playlist songs" + error,
        })
      );
    setPage(1);
  };

  const [page, setPage] = useState(3);

  const [settings, setSettings] = useState(false);
  const [username, setUser] = useState("");
  const [currentplaylist, setPlaylist] = useState({});
  const [currentsongs, setSongs] = useState([]);

  const value = {
    state: { settings, currentplaylist, currentsongs, reduceState },
    actions: {
      setPage,
      setSettings,
      setPlaylist,
      setSongs,
      setTest,
      playlistView2,
    },
  };

  let viewPage;
  if (page === 0) {
    viewPage = <BrowseView session={session} />;
  } else if (page === 1) {
    console.log(currentplaylist.playlist_name);
    viewPage = (
      <PlayListView
        playlist={currentplaylist}
        playlistName={currentplaylist.playlist_name}
        playlistTime={0}
        songs={currentsongs}
      />
    );
  } else {
    setPage(0);
    viewPage = <BrowseView />;
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
