import React, { useEffect } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RepeatIcon from "@material-ui/icons/Repeat";

function PlayNavBar(props) {
  const { SongName } = props;

  return (
    <NavBarInfo>
      <Avatar variant="rounded">D</Avatar>
      <span>{SongName ? SongName : "Test Song Name"}</span>
      <span>
        <PlayIcon />
      </span>
      <span>
        <PlaylistAddIcon />
      </span>
      <span>
        <RepeatIcon />
      </span>
    </NavBarInfo>
  );
}

const NavBarInfo = styled.div`
  display: flex;
  align-items: center;
`;

export default PlayNavBar;
