import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SongDisplay from "./SongDisplay"
import Avatar from "@material-ui/core/Avatar";
import { HomeContext } from "./Home";
import { Route, useLocation } from "react-router-dom";

function AlbumPage(props)
{
    const { state, actions } = useContext(HomeContext);
    const location = useLocation();
    let playlists = location.state.playlist;
    let name = location.state.name;
    let images = location.state.images;

    function artistamt( arr )
    {
        if(arr.length === 1){return arr[0].name;}
        else
        {
            let res = "";
            for(var i = 0; i < arr.length; i++)
            {
                if( i === arr.length-1)
                    res += arr[i].name;
                else
                    res +=  arr[i].name + ", ";
            }
            return res;
        }
    }

    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return minutes + ":" + seconds;
      }

    return(
        <StyledDiv>
      
        <span>
        <StylAvatar style={{variant: 'square', height: '5em', width: '5em' }} src = {images[0].url}/>
            <h1>{name}</h1>
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
                playlists.map((song) => 
                {
                    let artists = artistamt(song.track.artists);
                    return(
                        <SongDisplay
                            name = {song.track.name}
                            artist = {artists}
                            time = {msToTime(song.track.duration_ms)}
                            uri = {song.track.uri}
                            id = {song.track.id}
                            Browse = {true}
                        />
                    );
                })
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

const StylAvatar = styled(Avatar)`
  margin-left: 0.5em;
  margin-right: 1em;
  variant: 'square'
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

const Artist = styled.h6`
  grid-column-start: 3;
  grid-row-end: 3;
`;

const Title = styled.h6`
  grid-column-start: 1;
  grid-row-end: 1;
`;

export default AlbumPage;