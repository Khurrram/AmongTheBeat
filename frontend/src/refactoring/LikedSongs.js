import React, {useState, useEffect, useContext, useRef} from 'react';
import styled from "styled-components";
import { getSessionCookie } from "../CookieHandler"
import SongDisplay from "./SongDisplay";
import {getLikedSongs} from "../DataManipulation/AccountREST"
import { Link, useHistory, useLocation, useParams} from "react-router-dom";
import {SessionContext} from "../App"
import { TrainRounded } from '@material-ui/icons';

function LikedSongs()
{
    const session = useContext(SessionContext);
    const [songs, setSongs] = useState();
    const [rerender, setRerender] = useState(0);

    useEffect(() =>
    {
      getLikedSongs(session.id).then((res) =>
      {
        setSongs(res);
        console.log("Favorited Songs: " + res)
      })
      
    },[rerender])

    useEffect(() =>
    {
      return( () => 
      {
        setSongs(null);
      })
    },[])

    return(
        <StyledDiv>
            <span>
                <h1>Favorite Songs</h1>
            </span>

            <StyledSpan>
                <Title>Title</Title>
                <Artist>Artist</Artist>
            </StyledSpan>

            <span>
                <hr />
            </span>

            <SongDiv>
              {
              songs? 
              songs.map((song) => 
              {
                  return(
                      <SongDisplay
                          name = {song.song_name}
                          artist = {song.artist_name}
                          uri = {song.SpotifyURI}
                          id = {song._id}
                          time = {song.time}
                          Browse = {true}
                          rerender = {rerender}
                          setrerender = {setRerender}
                          key = {song._id}
                          playlist = {songs}
                      />
                  );
              })
              :<p>Loading...</p>
              }

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

const Artist = styled.h6`
  grid-column-start: 3;
  grid-row-end: 3;
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

export default LikedSongs