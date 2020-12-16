import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PauseIcon from "@material-ui/icons/Pause";
import RepeatIcon from "@material-ui/icons/Repeat";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SongDisplay from "../refactoring/SongDisplay";
import Modal from "react-modal";
import QueueIcon from "@material-ui/icons/Queue";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

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
  setTime,
} from "../DataManipulation/PlayerREST";
import { SongContext } from "../refactoring/Home";
import { makeStyles } from "@material-ui/core";

Modal.setAppElement("#root");

function PlayNavBar(props) {
  let history = useHistory();
  const classes = useStyles();
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
  const [flag, setFlag] = useState(false);

  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  const timeRef = useRef(currentTime);
  const timeStartRef = useRef(currentTimeStart);

  setSongFunction(setSong);

  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    if (song !== "") {
      songActions.setPlayingCurrentSong(song.SpotifyURI);
      console.log("state changed playnavbar");
      setFlag(true);
    }
  }, [song]);

  const changeTime = () => {
    if (song !== "") {
      playbackInfo().then((res) => {
        if (res !== undefined && res !== null && res !== "") {
          let progress_s = res.progress_ms / 1000;
          let duration_s = res.item.duration_ms / 1000;

          let bartime = Math.round((progress_s * 100) / duration_s);

          timeRef.current = bartime;
          timeStartRef.current = res.progress_ms;

          setCurrentTime(timeRef.current);
          setCurrentTimeStart(timeStartRef.current);
          setCurrentTimeEnd(res.item.duration_ms);
        }
      });
    }
  };

  const handleTimeConvert = (ms) => {
    var seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60),
      minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  useInterval(
    () => {
      changeTime();
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    return () => {
      setCurrentTime(0);
      setCurrentTimeStart(null);
      setCurrentTimeEnd(null);
    };
  }, []);

  const handleVolumeChange = (event, newvolume) => {
    setVolume(newvolume);
    changeVolume(newvolume);
  };

  const muteVolume = () => {
    setVolume(0);
    setPreviousVolume(volume);
    changeVolume(0);
  };

  const unmuteVolume = () => {
    setVolume(previousVolume);
    changeVolume(previousVolume);
  };

  const handleTimeChange = (event, newtime) => {
    event.preventDefault();
    setIsRunning(false);

    let bartime = (newtime * currentTimeEnd) / 100;

    timeRef.current = newtime;
    timeStartRef.current = bartime;

    setTime(Math.round(timeStartRef.current)).then((res) => {
      setCurrentTime(timeRef.current);
      setCurrentTimeStart(timeStartRef.current);

      setIsRunning(true);
    });
  };

  return (
    <NavBarInfo>
      {flag ? (
        <EmptyDiv>
          {/* <Avatar variant="rounded" src={song.album.images[0].url} /> */}
          <SongNameSpan>{song.song_name}</SongNameSpan>

          <FlexSpan>
            <StyledPrevious
              onClick={() => {
                songActions.setPlaying(true);
                playPrevSong();
              }}
            />

            {songState.playing ? (
              <StyledPause
                onClick={() => {
                  songActions.setPlaying(false);
                  pauseSong();
                }}
              />
            ) : (
              <StyledPlay
                onClick={() => {
                  songActions.setPlaying(true);
                  resumeSong();
                }}
              />
            )}

            <StyledNext
              onClick={() => {
                songActions.setPlaying(true);
                playNextSong();
              }}
            />
          </FlexSpan>

          <FlexSpanTrackSlider>
            <StyledP>
              {currentTimeStart
                ? handleTimeConvert(timeStartRef.current)
                : "0:00"}
            </StyledP>
            <TrackSlider
              className={classes.root2}
              value={timeRef.current}
              onChange={(e, time) => setCurrentTime(time)}
              aria-labelledby="continuous-slider"
              onChangeCommitted={handleTimeChange}
            />
            <StyledEndP>
              {currentTimeEnd ? handleTimeConvert(currentTimeEnd) : "0:00"}
            </StyledEndP>
          </FlexSpanTrackSlider>

          <FlexSpan>
            {repeat ? (
              <DisableRepeatIcon
                onClick={() => {
                  setRepeat(false);
                  noRepeatSong();
                }}
              />
            ) : (
              <EnableRepeatIcon
                onClick={() => {
                  setRepeat(true);
                  repeatSong();
                }}
              />
            )}

            {shuffle ? (
              <DisableShuffleIcon
                onClick={() => {
                  setShuffle(false);
                  noShuffleSong();
                }}
              />
            ) : (
              <EnableShuffleIcon
                onClick={() => {
                  setShuffle(true);
                  shuffleSong();
                }}
              />
            )}

            <StyledQueue
              onClick={() => {
                history.push("/home/queue");
                toggleModal();
              }}
            />
          </FlexSpan>
          <FlexSpanVolumeSlider>
            <StyledP>
              {volume === 0 ? (
                <StyledVolumeMute onClick={() => unmuteVolume()} />
              ) : volume >= 50 ? (
                <StyledVolumeUp onClick={() => muteVolume()} />
              ) : (
                <StyledVolumeDown onClick={() => muteVolume()} />
              )}
            </StyledP>

            <VolumeSlider
              className={classes.root}
              value={volume}
              onChange={(e, vol) => setVolume(vol)}
              aria-labelledby="continuous-slider"
              onChangeCommitted={handleVolumeChange}
            />
          </FlexSpanVolumeSlider>
        </EmptyDiv>
      ) : (
        ""
      )}
    </NavBarInfo>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const FlexSpan = styled.span`
  display: flex;
  justify-content: space-around;
  &&& {
    margin-left: 1.5rem;
  }
  width: 8rem;
`;

const FlexSpanTrackSlider = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 300px;
  width: 25vw;
  max-width: 600px;

  &&& {
    margin-left: 1.5rem;
  }
`;

const FlexSpanVolumeSlider = styled.span`
  display: flex;
  align-items: center;

  min-width: 100px;
  width: 200px;
  max-width: 200px;

  &&& {
    margin-left: auto;
  }
`;

const SongNameSpan = styled.span`
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  width: 180px;
  min-width: 180px;
  max-width: 220px;

  &&& {
    margin-left: 1rem;
  }
`;
const NavBarInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
  width: 100%;

  & span {
    margin-left: 0;
  }

  & p {
    margin: 0;
  }
`;

const EnableShuffleIcon = styled(ShuffleIcon)`

  color: ${"grey"}; 

  &:hover {
    color: ${"white"};
  }
  }
`;

const DisableShuffleIcon = styled(ShuffleIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;
const EnableRepeatIcon = styled(RepeatIcon)`

  color: ${"grey"}; 

  &:hover {
    color: ${"white"};
  }
  }
`;

const DisableRepeatIcon = styled(RepeatIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;

const StyledPlay = styled(PlayIcon)`
  margin-left: 1rem;
  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;

const StyledPause = styled(PauseIcon)`
  margin-left: 1rem;
  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;

const StyledPrevious = styled(SkipPreviousIcon)`
  margin-left: 1rem;
  color: white; 

  &:hover {
    color: gray;
  }
  }
`;

const StyledNext = styled(SkipNextIcon)`
  margin-left: 1rem;
  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;

const StyledQueue = styled(QueueIcon)`

  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
`;
const StyledVolumeUp = styled(VolumeUp)`
  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
  
`;
const StyledVolumeDown = styled(VolumeDownIcon)`
  color: ${"white"}; 

  &:hover {
    color: ${"grey"};
  }
  }
  
`;
const StyledVolumeMute = styled(VolumeOffIcon)`
  color: grey;

  &:hover {
    color: white;
  }
`;
const StyledEndP = styled.p`
  color: white;
  font-size: 14px;
  &&& {
    margin-left: 0.2rem;
  }
`;

const StyledP = styled.p`
  color: white;
  font-size: 14px;
  &&& {
    margin-left: 1rem;
    margin-right: 0.2rem;
  }
`;

const ParentSpan = styled.span`
  display: flex;
  align-items: flex-start;
  width: 300px;
`;
const EmptyDiv = styled.div`
  // margin-block-start: 0em;
  // margin-block-end: 0em;
  // margin-bottom: 0rem;
  display: flex;
  width: 100%;
  align-items: center;
`;

const VolumeSlider = withStyles((theme) => ({
  root: {
    width: 100,
    maxWidth: "100px",
  },
  Slider: {
    width: 100,
    maxWidth: "100px",
  },
}))(Slider);

const TrackSlider = withStyles((theme) => ({
  Slider: {
    minWidth: "200px",
  },
}))(Slider);

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  root2: {
    width: 600,
  },
});

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
