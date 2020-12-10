import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {useRouteMatch} from "react-router-dom";
import {getPlaylistSongs, getPlaylistOwner, forkPlaylist} from "../DataManipulation/PlaylistREST"
import SongDisplay from "./SongDisplay";
import {SessionContext} from "../App"
import MergeTypeIcon from '@material-ui/icons/MergeType';
import { HomeContext } from "./Home";

function UserPlaylistView(props) {
  const {state,actions} = useContext(HomeContext);
  const [currPlay, setcurrPlay] = useState();
  const [username, setUsername] = useState();
  const [playlist, setPlaylist] = useState();
  const [playlistName, setPlaylistName] = useState()
  const [isOwner, setIsOwner] = useState(false)

  let {url} = useRouteMatch();
  let playlistID = url.substr(12); 
  const session = useContext(SessionContext);

  useEffect(() =>
  {
    getPlaylistOwner(playlistID).then((res) =>
    {
      console.log(res)
      setUsername(res[0])
      setPlaylistName(res[1].playlist_name)
      setPlaylist(res[1])
      if(res[1].owner_id === session.id)
      {setIsOwner(true)}

      getPlaylistSongs(playlistID).then((res2) =>
      {
        setcurrPlay(res2.data)
      })
    })
  },[])

  const addPlaylist = () =>
  {
    forkPlaylist(session.id, playlist).then((res) =>
    {
      actions.rerender();
    })
  }

  return (
    <StyledDiv>
      <span>
        <h1>{username && playlistName? playlistName + " by " + username : "" }</h1>
        {isOwner? <StyledBookmarkDisabled/> : <StyledBookmark onClick = {() => addPlaylist()}/>}
      </span>
      <StyledSpan>
        <Title>Title</Title>
        <Artist>Artist</Artist>
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv>
        {currPlay ? (
          currPlay.map((song) => {
            return (
              <SongDisplay
                name={song.song_name}
                artist={song.artist_name}
                id={song._id}
                playlist_id={playlistID}
                uri={song.SpotifyURI}
                playlist={currPlay}
                Browse = {true}
                key = {song._id}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
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

const Artist = styled.h6`
  grid-column-start: 3;
  grid-row-end: 3;
`;


const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
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

export default UserPlaylistView;
