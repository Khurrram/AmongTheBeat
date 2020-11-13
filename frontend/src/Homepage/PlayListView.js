import React from "react";
import styled from "styled-components";
import Song from "./Song";
import TrashIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";

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

function PlayListView(props) {
  let { playlistName, playlistTime, playlist } = props;
  console.log(playlist._id);
  let id = playlist._id;
  let owner = playlist.owner_id;
  console.log(owner);
  let history = useHistory();
  playlist = []; // TESTING PURPOSES

  const shareAction = (e) => {
    e.preventDefault();
  };

  function deletePlaylist(e, id, owner) {
    e.preventDefault();
    let data = {id: id, owner: owner};
    axios
    .post("http://localhost:5000/api/playlist/delete", data)
    .then(function (res) {
      console.log("Deleted playlist");
      // window.location("/home");
    })
    .catch((err) => console.log(err));

}

  return (
    <StyledDiv>
      <span>
        <h1>{playlistName}</h1>
        <StyledButton
          variant="contained"
          disableElevation
          onClick={shareAction}
        >
          Share
        </StyledButton>
        <StyledTrash onClick={(e) => deletePlaylist(e, id, owner)}/>
        <h6 id="timestamp">{playlistTime}</h6>
        <h6>
          {playlist.length + " "}
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
      <SongDiv>
        {playlist.map((song) => {
          return (
            <Song name={song.name} artist={song.author} type="Playlists" />
          );
        })}
      </SongDiv>
    </StyledDiv>
  );
}



export default PlayListView;
