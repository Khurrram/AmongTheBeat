import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SettingIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import { Search } from "@material-ui/icons";
import testplay from "../data/testsongs.json";
import axios from "axios";
import { session } from "passport";
import { getSessionCookie } from "../CookieHandler";

function UserPlaylistView(props) {
  const [currPlay, setcurrPlay] = useState();
  const [load, setLoad] = useState(false);
  const [filler, setFiller] = useState(false);

  let DEFAULT_VALUE = "DEFAULT";

  let { playlist, username } = props;
  playlist = testplay.songs; // TESTING PURPOSES

  return (
    <StyledDiv>
      <span>
        <h1>{DEFAULT_VALUE + "'s Mixtapes"}</h1>
      </span>
      <StyledSpan>
        <Title>Title</Title>
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv>
        {/* {currPlay ? (
          currPlay.playlists.items.map((album) => {
            return (
              <Album
                name={album.name}
                playlistid={album.id}
                images={album.images[0].url}
                description={album.description}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )} */}
      </SongDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem;
  margin-right: 1rem;

  & span {
    display: flex;
    align-items: center;
  }

  & span hr {
    width: 100%;
    color: white;
    background-color: white;
  }

  & h1 {
    color: white;
    font-weight: bold;
  }

  & h6 {
    color: white;
  }
`;

const StyledSpan = styled.span`
  margin-left: 5.5em;
  margin-right: auto;
  margin-top: 1em;
  margin-bottom: -1em;
  display: inline-grid;
  width: 43%;
  grid-template-columns: auto auto;
  justify-content: space-between;
  grid-column-gap: 3em;
`;

const Title = styled.h6`
  grid-column-start: 1;
  grid-row-end: 1;
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

export default UserPlaylistView;
