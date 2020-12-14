import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PauseIcon from "@material-ui/icons/Pause";
import RepeatIcon from "@material-ui/icons/Repeat";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SongDisplay from "../refactoring/SongDisplay";
import Modal from "react-modal";
import QueueIcon from '@material-ui/icons/Queue';

import {
  setSongFunction,
  playNextSong,
  playPrevSong,
  repeatSong,
  noRepeatSong,
  resumeSong,
  pauseSong,
  shuffleSong,
  noShuffleSong,
  getQueue
} from "../DataManipulation/PlayerREST";
import { SongContext } from "../refactoring/Home";

Modal.setAppElement("#root");

function PlayNavBar(props) {
  const [song, setSong] = useState("");
  const { songState, songActions } = useContext(SongContext);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [modal, setModal] = useState(false);
  const [queue, setQueue] = useState([]);
  setSongFunction(setSong);

  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    songActions.setPlayingCurrentSong(song.uri);
  }, [song]);

  return (
    <NavBarInfo>

      <Modal
        isOpen={modal}
        onRequestClose={toggleModal}
        contentLabel="Test"
        style={customStyles}
      >
        <ModalHeader>Queue View</ModalHeader>
            <ModalContent>
            <SongDiv>
            {
              queue? 
                queue.map((song) => 
                {
                    return(
                        <SongDisplay
                            name = {song.song_name}
                            artist = {song.artist_name}
                            uri = {song.uri}
                            time = {song.time}
                            Queue = {true}
                            playlist = {queue}
                        />
                    );
                })
                :<p>Loading...</p>
            }
        </SongDiv>
            </ModalContent>
        </Modal>


      <Avatar variant="rounded">D</Avatar>
      <span>{song.name}</span>
      {songState.playing ? (
        <span>
          <PauseIcon
            onClick={() => {
              songActions.setPlaying(false);
              pauseSong();
            }}
          />
        </span>
      ) : (
        <span>
          <PlayIcon
            onClick={() => {
              songActions.setPlaying(true);
              resumeSong();
            }}
          />
        </span>
      )}

      {repeat ? (
        <span>
          <RepeatOneIcon
            onClick={() => {
              setRepeat(false);
              noRepeatSong();
            }}
          />
        </span>
      ) : (
        <span>
          <RepeatIcon
            onClick={() => {
              setRepeat(true);
              repeatSong();
            }}
          />
        </span>
      )}

      {shuffle ? (
        <span>
          <DisableShuffleIcon
            onClick={() => {
              setShuffle(false);
              noShuffleSong();
            }}
          />
        </span>
      ) : (
        <span>
          <EnableShuffleIcon
            onClick={() => {
              setShuffle(true);
              shuffleSong();
            }}
          />
        </span>
      )}

      <span>
        <StyledPrevious onClick={() => playPrevSong()} />
      </span>
      <span>
        <StyledNext onClick={() => playNextSong()} />
      </span>

        <span>
          <StyledQueue
            onClick={() => {
              setQueue(getQueue());
              toggleModal();

            }}
          />
        </span>

    </NavBarInfo>
  );
}

const NavBarInfo = styled.div`
  display: flex;
  align-items: center;
`;

const EnableShuffleIcon = styled(ShuffleIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"green"};
  }
  }
`

const DisableShuffleIcon = styled(ShuffleIcon)`

  color: ${"green"}; 

  &:hover {
    color: ${"white"};
  }
  }
`

const StyledPrevious = styled(SkipPreviousIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
`

const StyledNext = styled(SkipNextIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
`

const StyledQueue = styled(QueueIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
`
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
`;

const SongDiv = styled.div`
  min-height: 35vh;
  max-height: 35vh;
  overflow-y: auto;
`;


export default PlayNavBar;
