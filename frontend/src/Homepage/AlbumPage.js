import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Song from "./Song";
import SettingIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import { CallMissedSharp, Search } from "@material-ui/icons";
import testplay from '../data/testsongs.json'
import axios from "axios";
import { session } from "passport";
import { ViewPage } from "./HomePage";
import Avatar from "@material-ui/core/Avatar";

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

function AlbumPage(props)
{
    const { state, actions } = useContext(ViewPage);

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
        <StylAvatar style={{variant: 'square', height: '5em', width: '5em' }} src = {state.currentalbum.images[0].url}/>
            <h1>{state.currentalbum.name}</h1>
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
                state.currentalbumsongs.map((song) => 
                {
                    let artists = artistamt(song.track.artists);
                    return(
                        <Song 
                            name = {song.track.name}
                            artist = {artists}
                            time = {msToTime(song.track.duration_ms)}
                            uri = {song.track.uri}
                            Browse = {true}
                        />
                    );
                })
            }
        </SongDiv>
        </StyledDiv>
    );
    
}

export default AlbumPage;