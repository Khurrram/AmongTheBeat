import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { HomeContext } from "./Home";

function PlayListView(props) {
  const { state, actions } = useContext(HomeContext);
  const { playlistID } = useParams();
  const history = useHistory();

  const [disableTitle, setdisableTitle] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const playlistTitle = useRef(null);

  let DEFAULT_VALUE = "DEFAULT";

  // THIS IS FOR GETTING INITIAL PLAYLIST TITLE
  useEffect(() => {
    if (state.currentPlaylist.playlist_name === undefined) {
      console.log("lo0");
      history.push("/lol");
    }
    setPlaylistName(state.currentPlaylist.playlist_name);
  }, [playlistID]);

  const dClick = () => {
    setdisableTitle(false);
    playlistTitle.current.focus();
  };

  const handleOnChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const saveTitle = (e) => {
    setdisableTitle(true);
    // playlistTitle.current = e.target.value;
    actions.editPlaylists(playlistID, e.target.value);
    console.log(e.target.value);
  };

  return (
    <StyledDiv>
      <span>
        <div onDoubleClick={dClick}>
          {state.currentPlaylist ? (
            <PlayListTitle
              ref={playlistTitle}
              type="text"
              readOnly={disableTitle}
              onChange={handleOnChange}
              value={playlistName}
              spellCheck={false}
              onBlur={saveTitle}
            />
          ) : (
            <div></div>
          )}
        </div>

        <StyledButton variant="contained" disableElevation onClick={dClick}>
          Share
        </StyledButton>
        <StyledTrash
          onClick={() => {
            actions.deletePlaylists(playlistID);
            history.push("/lol");
          }}
        />
        <h6 id="timestamp">{DEFAULT_VALUE}</h6>
        <h6>
          {/* {state.currentsongs.length + " "} */}
          Songs
        </h6>
      </span>
      <StyledSpan>
        <Title>Title</Title>
        <Artist>Artist</Artist>
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv></SongDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem;
  margin-right: 1rem;

  & span {
    display: flex;
    align-items: center;
  }

  & span hr {
    width: 100%;
    color: white;
    background-color: white;
  }

  & h1 {
    padding-right: 2rem;
    color: white;
    font-weight: bold;
  }

  & #timestamp {
    font-weight: normal;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  & h6 {
    color: white;
  }
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

const StyledSpan = styled.span`
  margin-left: 5.5em;
  margin-right: auto;
  margin-top: 1em;
  margin-bottom: -1em;
  display: inline-grid;
  width: 43%;
  grid-template-columns: auto auto;
  justify-content: space-between;
  grid-column-gap: 3em;
`;

const Artist = styled.h6`
  grid-column-start: 3;
  grid-row-end: 3;
`;

const Title = styled.h6`
  grid-column-start: 1;
  grid-row-end: 1;
`;

const CustomP = styled.p`
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-bottom: 0rem;
`;

const StyledTrash = styled(TrashIcon)`
  margin-left: 1rem;
  color: white;
`;

const StyledButton = styled(Button)`
  &&& {
    margin-left: 2rem;
    max-height: 2rem;
  }
`;

const PlayListTitle = styled.input`
  background: transparent;
  border: none;
  border-width: 0;
  box-shadow: none;
  color: white;
  height: auto;
  width: auto;
  font-size: 2rem;
  font-weight: bold;
  outline: none;

  // &:hover,
  // &:focus {
  //   opacity: 0.8;
  // }
`;

export default PlayListView;
