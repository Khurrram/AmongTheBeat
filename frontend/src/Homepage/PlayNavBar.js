import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RepeatIcon from "@material-ui/icons/Repeat";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import { setSongFunction, playNextSong, playPrevSong, repeatSong, noRepeatSong, resumeSong, pauseSong } from "../DataManipulation/PlayerREST"

function PlayNavBar(props) {
  const [song, setSong] = useState("");
  setSongFunction(setSong);
  console.log(song);
  return (
    <NavBarInfo>
      <Avatar variant="rounded">D</Avatar>
      <span>{song}</span>
      <span>
        <PlayIcon onClick={() => resumeSong()} />
      </span>
      <span>
        <PauseCircleFilledIcon onClick={() => pauseSong()} />
      </span>
      {/* <span>
        <PlaylistAddIcon />
      </span> */}
      <span>
        <RepeatIcon onClick={() => repeatSong()} />
      </span>
      <span>
        <RepeatOneIcon onClick={() => noRepeatSong()}/>
      </span>
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
