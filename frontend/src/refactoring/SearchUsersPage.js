import React, {useState, useEffect, useContext, useRef} from 'react'
import styled from "styled-components";
import axios from "axios";
import SongDisplay from "./SongDisplay";
import {getPlaylists, getPlaylistSongs, forkPlaylist} from "../DataManipulation/PlaylistREST";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import MergeTypeIcon from '@material-ui/icons/MergeType';
import {SessionContext} from "../App"
import { HomeContext } from "./Home";

function SearchUsersPage(props)
{
    const session = useContext(SessionContext);
    const {state,actions} = useContext(HomeContext);
    const [songs, setSongs] = useState();
    const [isOwner, setIsOwner] = useState(false)
    const songsRef = useRef(songs);

    const [totalLength, setTotalLength] = useState("0")

    const location = useLocation();
    let playlist = location.state.playlist;

    useEffect(() =>
    {
        const getSongs = async() =>
        {
            let result = await getPlaylistSongs(playlist._id)
            songsRef.current = result.data
            setTotalLength(getTrackLength(songsRef.current));
            setSongs(songsRef.current)
        };
        getSongs();

    },[])

    useEffect(() =>
    {
      if(session.id === playlist.owner_id) //check if playlist can be forked
        setIsOwner(true);
    },[])

    const addPlaylist = () =>
    {
      forkPlaylist(session.id, playlist).then((res) =>
      {
        actions.rerender();
      })
    }

    const getTrackLength = (arr) =>
    {
      let totalsecs = 0
      for(var i = 0; i < arr.length; i++)
      {
        let x = arr[i]
        let y = x.time.split(":")
        let secs = (+y[0]) * 60 + (+y[1]);
        totalsecs += secs;
      }
      totalsecs *= 1000

      var seconds = Math.floor((totalsecs / 1000) % 60),
        minutes = Math.floor((totalsecs / (1000 * 60)) % 60),
        hours = Math.floor((totalsecs / (1000 * 60 * 60)) % 24);
    
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":"  + minutes + ":" + seconds;
    }

    return(
        <StyledDiv>
            <span>
                <h1>{playlist.playlist_name}</h1>
                {isOwner? <StyledBookmarkDisabled/> : <StyledBookmark onClick = {() => addPlaylist()}/>}

                <h6 id="timestamp">{totalLength}</h6>
                <h6>
                  {playlist.songs_ids.length + " "}
                  {playlist.songs_ids.length === 1? "Song" : "Songs"}
                </h6>

            </span>

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

const StyledBookmark = styled(MergeTypeIcon)`
  margin-left: 2rem;
  transform: scale(2);
  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
}
`

const StyledBookmarkDisabled = styled(MergeTypeIcon)`
  margin-left: 2rem;
  transform: scale(2);
  color: ${"grey"}; 

}
`



export default SearchUsersPage