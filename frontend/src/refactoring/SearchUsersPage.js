import React, {useState, useEffect, useContext, useRef} from 'react'
import styled from "styled-components";
import axios from "axios";
import SongDisplay from "./SongDisplay";
import {getPlaylists, getPlaylistSongs} from "../DataManipulation/PlaylistREST";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

function SearchUsersPage(props)
{
    const [songs, setSongs] = useState();
    const songsRef = useRef(songs);

    const location = useLocation();
    let playlist = location.state.playlist;

    useEffect(() =>
    {
        const getSongs = async() =>
        {
            let result = await getPlaylistSongs(playlist._id)
            songsRef.current = result.data
            setSongs(songsRef.current)
        };
        getSongs();
    },[])
    return(
        <StyledDiv>
            <span>
                <h1>{playlist.playlist_name}</h1>
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
                            Browse = {true}
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
    padding-right: 2rem;
    color: white;
    font-weight: bold;
  }

  & #timestamp {
    font-weight: normal;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  & h6 {
    color: white;
  }
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
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

export default SearchUsersPage