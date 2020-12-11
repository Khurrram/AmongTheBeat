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

import {
  setSongFunction,
  playNextSong,
  playPrevSong,
  repeatSong,
  noRepeatSong,
  resumeSong,
  pauseSong,
  shuffleSong,
  noShuffleSong
} from "../DataManipulation/PlayerREST";
import { SongContext } from "../refactoring/Home";

function PlayNavBar(props) {
  const [song, setSong] = useState("");
  const { songState, songActions } = useContext(SongContext);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  setSongFunction(setSong);

  useEffect(() => {
    songActions.setPlayingCurrentSong(song.uri);
  }, [song]);

  return (
    <NavBarInfo>
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
          <ShuffleIcon
            onClick={() => {
              setShuffle(false);
              noShuffleSong();
            }}
          />
        </span>
      ) : (
        <span>
          <ShuffleIcon
            onClick={() => {
              setShuffle(true);
              shuffleSong();
            }}
          />
        </span>
      )}

      <span>
        <SkipPreviousIcon onClick={() => playPrevSong()} />
      </span>
      <span>
        <SkipNextIcon onClick={() => playNextSong()} />
      </span>

    </NavBarInfo>
  );
}

const NavBarInfo = styled.div`
  display: flex;
  align-items: center;
`;

export default PlayNavBar;
