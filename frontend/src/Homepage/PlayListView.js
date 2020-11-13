import React, {useContext, useState} from "react";
import styled from "styled-components";
import Song from "./Song";
import TrashIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ViewPage } from "./HomePage";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
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


function PlayListView(props) {
  let { playlistName, playlistTime, playlist, songs } = props;
  const { state, actions } = useContext(ViewPage);
  const [editing, setEdit] = useState(false);

  console.log(playlist._id);
  let id = playlist._id;
  let owner = playlist.owner_id;
  console.log(owner);
  // playlist = []; // TESTING PURPOSES

  const shareAction = (e) => {
    e.preventDefault();
  };

  function doubleclicked(e, playlist_id) {
    e.preventDefault();
    setEdit(true);
    console.log("double clicked");
  }
  
  function onblurHandler(e, playlist_id) {
    e.preventDefault();
    console.log(e.target.value);
    let data = {id : playlist_id, updatedname: e.target.value};
    axios
    .post("http://localhost:5000/api/playlist/editname", data)
    .then(function (res) {
      setEdit(false);
      actions.setPage(1);
    })
    .catch((err) => console.log(err));
  }


  function deletePlaylist(e, id, owner) {
    e.preventDefault();
    let data = {id: id, owner: owner};
    axios
    .post("http://localhost:5000/api/playlist/delete", data)
    .then(function (res) {
      console.log("playlist has been deleted");
      actions.setPage(0);
    })
    .catch((err) => console.log(err));

}

  return (
    <StyledDiv>
      <span>
              {editing?
              <h1>
              <DisabledTextName
              variant="standard"
              // onChange={(e) => doubleclicked(e, id)} 
              onBlur={(e) => onblurHandler(e, id)}
              defaultValue={playlistName}
              />
              </h1> : 
              <h1>
              {playlistName}
              <EditIcon onClick={(e) => doubleclicked(e, id)}/>
              </h1>}
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
        {state.currentsongs.map((song) => {
          return (
            <Song name={song.song_name} artist={song.artist_name} id={song._id} playlist_id= {id} type="Playlists" />
          );
        })}
      </SongDiv>
    </StyledDiv>
  );
}



export default PlayListView;
