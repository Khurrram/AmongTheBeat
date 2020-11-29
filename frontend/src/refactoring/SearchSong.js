import React, {useState, useEffect} from 'react'
import axios from "axios";
import styled from "styled-components";
import { getSessionCookie } from "../CookieHandler";
import SongDisplay from "./SongDisplay";

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

function SearchSong(props)
{
    const {search} = props;
    const [results, setResults] = useState();

    useEffect( async () =>
    {
        const session = getSessionCookie();
        let accessToken = session.accessToken;
        
        let data2 = {search: search, curraccessToken: accessToken};

        await axios.post("http://localhost:5000/api/searchTracks",data2)
            .then(function(res)
            {
                console.log(res.data);
                setResults(res.data)
            }).catch((err) => console.log(err));
    }, [search])

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
      <SongDiv>
          {results? 
            results.tracks.items.map( (track) =>
            {
                let artists = artistamt(track.artists);
                return(
                    <SongDisplay
                        name = {track.name}
                        artist = {artists}
                        time = {msToTime(track.duration_ms)}
                        uri = {track.uri}
                        id = {track.id}
                        Browse = {true}
                    />
                );
            })
          :<p>Loading...</p>}

      </SongDiv>
    );
}


export default SearchSong;