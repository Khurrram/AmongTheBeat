import React, { useState, useContext } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import HeartIcon from "@material-ui/icons/Favorite";
import TrashIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "react-materialize";
import Modal from "react-modal";
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import axios from "axios";
import { getSessionCookie } from "../CookieHandler";
import { ViewPage } from "./HomePage";

import "./Song.css";

const Container = styled.div`
  display: flex;
  height: 3em;
  align-items: center;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #686868;
  }
`;

const StyledAvatar = styled(Avatar)`
  margin-left: 0.5em;
`;

const SongInfo = styled.div`
  display: flex;
  margin-right: auto;
  align-items: center;
  margin: 1.5em;
  width: 100%;
  color: white;
`;

const StyledHeart = styled(HeartIcon)`
  margin-right: 1rem;
  color: ${(props) => (props.fav ? "red" : "grey")};

  &:hover {
    color: ${(props) => (props.fav ? "grey" : "red")};
  }
`;

const StyledPlaylistAdd = styled(PlaylistAddIcon)`
  color: ${"white"};

  &:hover {
    color: ${"blue"};
  }
}
`;

const StyledTrashCan = styled(TrashIcon)`
  color: ${"white"};

  &:hover {
    color: ${"blue"};
  }
}
`;

const StyledQueue = styled(QueueMusicIcon)`
  margin-right: 1rem;
`;

const SongArtist = styled.span`
  width: 43rem;
`;
const SongName = styled.span`
  flex: auto;
`;

const SongAction = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 6em;
  justify-content: space-evenly;
`;
const SongTime = styled.span`
  float: right;
  padding-right: 2rem;
`;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transform: "translate(-40%, -10%)",
    background:
      "linear-gradient(160deg, rgba(49,22,101,1) 59%, rgba(127,60,142,1) 100%)",
    color: "white",
  },
};

const ModalHeader = styled.div`
  font-size: 24px;
  padding-bottom: 2em;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ModalContent = styled.div`
  font-size: 15px;
  padding-bottom: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background-color: #686868;
  }
`;

Modal.setAppElement("#root");

function Song(props) {
  const { name, artist, time, playlist, uri, id, playlist_id, update, images } = props;
  const session = getSessionCookie();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currSong, setCurrSong] = useState();
  const { state, actions } = useContext(ViewPage);
  const [anchorEl, setAnchorEl] = useState(null);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
    if (!modalIsOpen) {
    let data = {id: session.id, song_name : name, artist_name: artist, uri: uri};

    axios
    .post("http://localhost:5000/api/song/getplaylists", data)
    .then(function (res) {
      setPlaylists(res.data.playlists);
      setCurrSong(res.data.song);
    })
    .catch((err) => console.log(err));
  }
  }

  function handleClick(event){
    setAnchorEl(event.currentTarget);
    // console.log(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function addtoPlaylist(e, playlistid, uri) {
    e.preventDefault();
    console.log("called here");
    let data = { id: playlistid, song_uri: uri}
    axios
    .post("http://localhost:5000/api/song/addtoplaylist", data)
    .then(function (res) {
      setModalIsOpen(!modalIsOpen);
    })
    .catch((err) => console.log(err));
  }

  function removeSong(e, song) {
    e.preventDefault();
    let data = { id: playlist_id, song: song}
    axios
    .post("http://localhost:5000/api/song/removefromplaylist", data)
    .then(function (res) {
      actions.setPlaylist(res.data);
      actions.setPage(1);
      console.log("song is removed");
      setAnchorEl(null);
    })
    .catch((err) => console.log(err));
  }

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Test"
        style={customStyles}
      >
        <ModalHeader>Choose A Playlist To Add To</ModalHeader>

        {/*  JUST SAMPLE FOR TESTING, THIS IS WHERE DATABASE IMPLEMENTATION NEEDS TO BE ADDED */}
        {playlists.map((playlist) => {
          return <ModalContent onClick={(e) => addtoPlaylist(e, playlist._id, uri)}>{playlist.playlist_name}</ModalContent>;
        })}
      </Modal>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => removeSong(e, id)}>Confirm</MenuItem>
        <MenuItem onClick = {() => handleClose()}>Cancel</MenuItem>
      </Menu>

      <SongInfo>
        <SongName>{name}</SongName>
        <SongArtist>{artist}</SongArtist>
        <SongTime>{time}</SongTime>
      </SongInfo>

      {playlist ? (
        <SongAction>
          <AddIcon />
        </SongAction>
      ) : (
        View(props, toggleModal, handleClick)
      )}
    </Container>
  );
}

function View(props, toggleModal, handleClick) {
  return (
    <SongAction >
      <StyledHeart></StyledHeart>
      <StyledQueue />
      {props.Browse ? (
        <StyledPlaylistAdd onClick={() => toggleModal()} />
      ) : (
        <StyledTrashCan aria-label="more"
                   aria-controls="long-menu"
                   aria-haspopup="true"
                   onClick={(e) => handleClick(e)}
                    />
      )}
    </SongAction>
  );
}

export default Song;
