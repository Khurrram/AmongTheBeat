import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import HeartIcon from "@material-ui/icons/Favorite";
import TrashIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import AddIcon from "@material-ui/icons/Add";
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

function Song(props) {
  const { name, artist, time, playlist } = props;

  return (
    <Container>
      <StyledAvatar variant="rounded"> L </StyledAvatar>
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
        view(props)
      )}
    </Container>
  );
}

function view(props) {
  return (
    <SongAction>
      <StyledHeart></StyledHeart>
      <StyledQueue />
      {props.Browse ? <PlaylistAddIcon /> : <TrashIcon />}
    </SongAction>
  );
}

export default Song;
