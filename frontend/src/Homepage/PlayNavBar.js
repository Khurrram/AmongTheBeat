import React, { useContext, useEffect, useState, useRef } from "react";
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
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

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
  getQueue,
  changeVolume,
  playbackInfo,
  setTime
} from "../DataManipulation/PlayerREST";
import { SongContext } from "../refactoring/Home";
import { makeStyles } from "@material-ui/core";

Modal.setAppElement("#root");

function PlayNavBar(props) {
  const classes = useStyles()
  const [song, setSong] = useState("");
  const { songState, songActions } = useContext(SongContext);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [modal, setModal] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeStart, setCurrentTimeStart] = useState();
  const [currentTimeEnd, setCurrentTimeEnd] = useState();
  const [flag, setFlag] = useState(true);

  const timeRef = useRef(currentTime);
  const timeStartRef = useRef(currentTimeStart);

  setSongFunction(setSong);

  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    songActions.setPlayingCurrentSong(song.uri);
  }, [song]);

  const changeTime = () =>
  {
    // console.log(song);
    if(song !== "")
    {
      playbackInfo().then((res) =>
      {
        let progress_s = res.progress_ms / 1000;
        let duration_s = res.item.duration_ms/ 1000;

        let bartime = Math.round((progress_s* 100)/ duration_s)

        timeRef.current = bartime
        timeStartRef.current = res.progress_ms
      
        setCurrentTime(timeRef.current)
        setCurrentTimeStart(timeStartRef.current);
        setCurrentTimeEnd(res.item.duration_ms);
      })
    }
  }

  const handleTimeConvert = (ms) =>
  {
    var seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  useEffect(() =>
  {
    const interval = setInterval(() => changeTime(), 1000)
    return () =>
    {
      clearInterval(interval);
    }
  }, [song])

  useEffect(() =>
  {
    return(() =>
    {
      setCurrentTime(0)
      setCurrentTimeStart(null);
      setCurrentTimeEnd(null);
    })
  },[])

  const handleVolumeChange = (event, newvolume) =>
  {
    setVolume(newvolume);
    changeVolume(newvolume);
  }

  const muteVolume = () =>
  {
    setVolume(0);
    setPreviousVolume(volume);
    changeVolume(0)
  }

  const unmuteVolume = () =>
  {
    setVolume(previousVolume);
    changeVolume(previousVolume);
  }

  const handleTimeChange = (event, newtime) =>
  {
    event.preventDefault();

    let bartime = (newtime * (currentTimeEnd))/ 100

    timeRef.current = newtime;
    timeStartRef.current = bartime

    setTime(Math.round(timeStartRef.current)).then((res) =>
    {
      setCurrentTime(timeRef.current)
      setCurrentTimeStart(timeStartRef.current)
    })
  }

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

        <ParentSpan>
          <StyledP>{currentTimeStart? handleTimeConvert(timeStartRef.current) : "0:00"}</StyledP>
          <StyledSlider
            className = {classes.root2}
            value = {timeRef.current}
            onChange = {(e,time) => setCurrentTime(time)}
            aria-labelledby="continuous-slider"
            onChangeCommitted = {handleTimeChange}
          />
          <StyledP>{currentTimeEnd? handleTimeConvert(currentTimeEnd) : "0:00"}</StyledP>
        </ParentSpan>

        <ParentSpan>
          <StyledP>{volume === 0 ? <StyledVolumeMute onClick = {() => unmuteVolume()}/> : volume >= 50 ? <StyledVolumeUp onClick = {() => muteVolume()}/> : <StyledVolumeDown onClick = {() => muteVolume()}/>}</StyledP>
          
          <StyledSlider
            className = {classes.root}
            value = {volume}
            onChange = {(e,vol) => setVolume(vol)}
            aria-labelledby="continuous-slider"
            onChangeCommitted = {handleVolumeChange}
          />
        </ParentSpan>

        

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
const StyledSlider = styled(Slider)`
  
  display: inline-block;
  float:left;
  margin-top: 1em;

`
const StyledVolumeUp = styled(VolumeUp)`
  
  
  display: inline-block;
  float:left;
  margin-left: 2em;
  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
  
`
const StyledVolumeDown = styled(VolumeDownIcon)`
  display: inline-block;
  float:left;
  margin-left: 2em;
  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
  
`
const StyledVolumeMute = styled(VolumeOffIcon)`
  display: inline-block;
  float:left;
  margin-left: 2em;
  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
  }
  
`

const StyledP = styled.p`
  color: white;
  margin-top: 1em;
  display: inline-block;
  float:left;
  
`

const ParentSpan = styled.span`
  overlow: hidden;
  
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

const useStyles = makeStyles({
  root : {
    width: 200
  },
  root2: {
    width: 600
  }

})

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
