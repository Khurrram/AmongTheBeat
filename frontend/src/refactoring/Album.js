import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { getSessionCookie } from "../CookieHandler";
import { HomeContext } from "./Home";
import { Route, useRouteMatch, Link, useHistory } from "react-router-dom";

function Album(props) {
  const { state, actions } = useContext(HomeContext);
  const { name, playlistid, images, description } = props;
  let { path, url } = useRouteMatch();
  let history = useHistory();

  const getSong = () => {
    history.push({
      pathname: `${url}/album`,
      state: {
        playlistid: playlistid,
      },
    });
  };

  return (
    <Container onClick={() => getSong()}>
      <AlbumImg src={images} />
      <h6>{name}</h6>
      {/* <SongInfo>
        <SongName>{name}</SongName>
        <SongArtist>{description}</SongArtist>
      </SongInfo> */}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.2rem;
  margin: 0.5rem;
  max-width: 198px;
  min-width 198px;
  width: 198px;
  height: 256px;
  max-height: 256px;
  min-height: 256px;
  border-radius: 5px;
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: 'rgba(0,0,0,0.5)'
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    background-color: #727272;
    opacity: 1;
  }

  & h6 {
    color: white;
  }
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    z-index: 10;
    min-width: 128px;
    min-height: 128px;

    max-height: 256px;
    max-width: 256px;
  }
`;

const AlbumImg = styled.img`
  min-width: 128px;
  min-height: 128px;

  max-height: 256px;
  max-width: 168px;
  border-radius: 5px;
`;
const SongInfo = styled.div`
  display: flex;
  margin-right: auto;
  align-items: center;
  margin: 1.5em;
  width: 100%;
  color: white;
`;
const SongArtist = styled.span`
  width: 55rem;
`;
const SongName = styled.span`
  flex: auto;
`;

export default Album;
