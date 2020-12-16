import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import HeartIcon from "@material-ui/icons/Favorite";
import TrashIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "react-materialize";
import Modal from "react-modal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { getSessionCookie } from "../CookieHandler";
import { SongContext } from "./Home";
import Axios from "axios";
import {
  buttonClicked,
  dequeueSong,
  pauseSong,
  queueSong,
  resumeSong,
} from "../DataManipulation/PlayerREST";
import { HomeContext } from "./Home";
import {
  addSongToPlaylist,
  getValidSongPlaylists,
} from "../DataManipulation/PlaylistREST";
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
  const [imgSrc, setImgSrc] = useState("");

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
    if (!modalIsOpen) {
      getValidSongPlaylists(session.id, name, artist, uri, time).then((res) => {
        setPlaylists(res.data.playlists);
        setCurrSong(res.data.song);
      });
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

  useLayoutEffect(() => {
    Axios.get("https://api.spotify.com/v1/tracks/" + uri.split(":")[2], {
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    })
      .then((response) => {
        // console.log(response);
        setImgSrc(response.data.album.images[2].url);
        // console.log(response.data.images[0].url);
      })
      .catch((err) => console.log(err));
  }, [uri]);

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

  const dequeue = (track) => {
    console.log("dequeueing:" + track.SpotifyURI);
    dequeueSong(track);
    if (props.rerenderQueue !== undefined) {
      props.setrerenderQueue(props.rerenderQueue + 1);
    }
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
          return (
            <ModalContent
              onClick={(e) => addtoPlaylist(e, playlist._id, uri)}
              key={playlist._id}
            >
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
        <StyledMenuItem onClick={(e) => removeSong(e, playlist_id, id)}>
          Confirm
        </StyledMenuItem>
        <MenuItem onClick={() => handleClose()}>Cancel</MenuItem>
      </Menu>
      {props.Queue ? (
        <SongInfo>
          <StyledAvatar variant="rounded">
            <TrackImg src={imgSrc} />
          </StyledAvatar>
          <SongName>{name}</SongName>
          <SongArtist>{artist}</SongArtist>
          <SongTime>{time}</SongTime> 
        </SongInfo>
      ) : (
        <SongInfo>
          <FlexDiv>
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
                    buttonClicked(playlist, {SpotifyURI: uri, song_name: name, artist_name:artist, time: time});
                  }}
                />
              )
            ) : (
              <PlayCircleFilledIcon
                onClick={() => {
                  songActions.setPlayingCurrentSong(uri);
                  songActions.setPlaying(true);
                  buttonClicked(playlist, {SpotifyURI: uri, song_name: name, artist_name:artist, time: time});
                }}
              />
            )}
          <StyledAvatar variant="rounded">
            <TrackImg src={imgSrc} />
          </StyledAvatar>
          </FlexDiv>
          <SongName>{name}</SongName>
          <SongArtist>{artist}</SongArtist>
          <SongTime>{time}</SongTime>
        </SongInfo>
      )}

    {props.Queue ? (
      <SongAction>
                <StyledTrashCan
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => dequeue({SpotifyURI: uri, song_name: name, artist_name:artist, time: time})}
              />
      </SongAction>
    ) : (
      <SongAction>
        {liked ? (
          <LikedHeart onClick={() => unlikeSong()} />
        ) : (
          <UnlikedHeart onClick={() => likeSong()} />
        )}
          <StyledQueue
            onClick={() =>
              queueSong({
                SpotifyURI: uri,
                song_name: name,
                artist_name: artist,
                time: time,
              })
            }
          />
        {props.Browse ? (
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
        )}
    </Container>
  );
}

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&": {
      backgroundColor: "darkred",
      color: theme.palette.common.white,
    },
    "&:hover": {
      backgroundColor: "red",
    },
  },
}))(MenuItem);

const FlexDiv = styled.div`
  justify-content: space-around;
  align-items: center;
  display: flex;
  min-width: 6%;
  width: 7%;
  max-width: 9%;
  margin-right: 0.5rem;
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    max-height: 36px;
    max-width: 36px;
    height: 36px;
    width: 36px;
  }
`;
const TrackImg = styled.img`
  width: 48px;
  max-midth: 48px;
`;

const Container = styled.div`
  display: flex;
  height: 3em;
  align-items: center;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: white;
  border-radius: 5px;

  background-color: 'rgba(0,0,0,0.5)'
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    background-color: #686868;
    opacity: 1;
  }
`;

const SongInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
  margin-left: 0.5rem;
  margin-right: auto;
  width: 100%;
  min-width: 220px;
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
    color: ${"black"};
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
  width: 20rem;
  min-width: 15rem;
  max-width: 20rem;
  margin-right: auto;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
`;
const SongName = styled.span`
  flex: auto;
  min-width: 15rem;
  width: 20rem;
  max-width: 20rem;
  margin-right: auto;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
`;

const SongAction = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 3em;
  justify-content: space-evenly;
`;
const SongTime = styled.span`
  float: right;
  padding-right: 2rem;
  margin-left: auto;
  min-width: 5rem;
  max-width: 10rem;
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
