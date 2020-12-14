import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import HeartIcon from "@material-ui/icons/Favorite";
import TrashIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "react-materialize";
import Modal from "react-modal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { getSessionCookie } from "../CookieHandler";
import { SongContext } from "./Home";
import {
  buttonClicked,
  pauseSong,
  queueSong,
  resumeSong,
} from "../DataManipulation/PlayerREST";
import { HomeContext } from "./Home";
import { addSongToPlaylist, getValidSongPlaylists } from "../DataManipulation/PlaylistREST";
import {
  findLikedSong,
  addLikedSong,
  removeLikedSong,
} from "../DataManipulation/AccountREST";
import { useRouteMatch, useHistory } from "react-router-dom";

Modal.setAppElement("#root");

function SongDisplay(props) {
  const { songState, songActions } = useContext(SongContext);
  const {
    name,
    artist,
    time,
    playlist,
    uri,
    id,
    playlist_id,
    update,
    images,
  } = props;
  const session = getSessionCookie();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currSong, setCurrSong] = useState();
  const { state, actions } = useContext(HomeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);
  const [playState, setPlayState] = useState(true);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
    if (!modalIsOpen) {
      getValidSongPlaylists(session.id, name, artist, uri, time)
      .then((res) =>
      {
        setPlaylists(res.data.playlists);
        setCurrSong(res.data.song);
      })
    }
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    // console.log(id);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addtoPlaylist = async (e, playlistid, uri) => {
    e.preventDefault();
    actions.addSongToPlaylistID(playlistid, uri);
    setModalIsOpen(!modalIsOpen);
  };

  function removeSong(e, playlistid, songid) {
    e.preventDefault();
    actions.removeSongFromPlaylistID(playlistid, songid);
    handleClose();
  }

  useEffect(() => {
    findLikedSong(session.id, uri).then((res) => {
      if (res === "Not Found") {
        setLiked(false);
      } else {
        setLiked(true);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setLiked(false);
    };
  }, []);

  const likeSong = () => {
    addLikedSong(session.id, name, artist, uri, time).then((res) => {
      console.log("Success");
      setLiked(true);
    });
  };

  const unlikeSong = () => {
    removeLikedSong(session.id, uri).then((res) => {
      console.log("Success");

      if (props.rerender !== undefined) {
        props.setrerender(props.rerender + 1);
      } else {
        setLiked(false);
      }
    });
  };

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
          return (
            <ModalContent onClick={(e) => addtoPlaylist(e, playlist._id, uri)} key = {playlist._id}>
              {playlist.playlist_name}
            </ModalContent>
          );
        })}
      </Modal>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => removeSong(e, playlist_id, id)}>
          Confirm
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>Cancel</MenuItem>
      </Menu>
      {props.Queue? (
        <SongInfo>
            <SongName>{name}</SongName>
            {/* <SongArtist>{artist}</SongArtist> */}
        </SongInfo>
        
        ) : (
      <SongInfo>
        {songState.playingCurrentSong === uri ? (
          songState.playing ? (
            <PauseCircleFilledIcon
              onClick={() => {
                songActions.setPlayingCurrentSong("");
                songActions.setPlaying(false);
                pauseSong();
              }}
            />
          ) : (
            <PlayCircleFilledIcon
              onClick={() => {
                songActions.setPlayingCurrentSong(uri);
                songActions.setPlaying(true);
                buttonClicked(playlist, uri);
              }}
            />
          )
        ) : (
          <PlayCircleFilledIcon
            onClick={() => {
              songActions.setPlayingCurrentSong(uri);
              songActions.setPlaying(true);
              buttonClicked(playlist, uri);
            }}
          />
        )}

        <SongName>{name}</SongName>
        <SongArtist>{artist}</SongArtist>
        <SongTime>{time}</SongTime>
      </SongInfo>
      )}


      <SongAction>
        {liked ? (
          <LikedHeart onClick={() => unlikeSong()} />
        ) : (
          <UnlikedHeart onClick={() => likeSong()} />
        )}
        {props.Queue ? (null) : (<StyledQueue onClick={() => queueSong({uri: uri, song_name: name, artist_name:artist, time: time})} />)}
        {props.Browse || props.Queue ? (
          <StyledPlaylistAdd onClick={() => toggleModal()} />
        ) : (
          <StyledTrashCan
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e)}
          />
        )}
      </SongAction>
    </Container>
  );
}

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

const UnlikedHeart = styled(HeartIcon)`
  margin-right: 1rem;
  color: ${"grey"};

  &:hover {
    color: ${"red"};
  }
`;

const LikedHeart = styled(HeartIcon)`
  margin-right: 1rem;
  color: ${"red"};

  &:hover {
    color: ${"grey"};
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

  color: ${"white"};

  &:hover {
    color: ${"blue"};
  }
}
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


export default SongDisplay;
