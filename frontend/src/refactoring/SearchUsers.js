import React, {useState, useEffect, useContext, useRef} from 'react'
import styled from "styled-components";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { HomeContext } from "./Home";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import {getOwner, getPlaylists} from "../DataManipulation/PlaylistREST"

function SearchUsers(props)
{
    const { state, actions } = useContext(HomeContext);
    const [username, setUsername] = useState("");
    const [userplaylists, setUserPlaylists] = useState([]);
    let { path, url } = useRouteMatch();

    const usernameRef = useRef(username);
    const userplaylistsRef = useRef(userplaylists);

    const location = useLocation();
    let search = location.state.search;
    let history = useHistory();

    useEffect(() =>
    {
        const getPlaylist = async() =>
        {
            if(search)
            {
                let results= await getOwner(search.trim());

                if(results.data.length !== 0){
                  let actresults = results.data[0];
                  let playlists = await getPlaylists(actresults._id);

                  usernameRef.current = actresults.username;
                  userplaylistsRef.current = playlists.data;

                  setUsername(usernameRef.current);
                  setUserPlaylists(userplaylistsRef.current);
                }
                else
                {
                  setUsername("");
                  setUserPlaylists([]);
                }
            }
        };
        getPlaylist();
    }, [search])

    const setUsersPage = (playlist) =>
    {
        history.push({
          pathname:`${url}/${playlist.owner_id}`,
          state: {playlist: playlist}
        })

    }

    return(
        <StyledDiv>
            <span>
                <h1>Browse</h1>
            </span>

            <span>
                <hr />
            </span>

            <SongDiv>
                {userplaylists.length !== 0 ? 
                    userplaylists.map( (playlist) =>
                    {
                        return(
                            <Container onClick = {() => setUsersPage(playlist)} key = {playlist._id}>
                                <StyledAvatar variant="rounded">{playlist.playlist_name.charAt(0)}</StyledAvatar>
                                <SongInfo>
                                    <SongName>{playlist.playlist_name}</SongName>
                                    <SongArtist>{username}</SongArtist>
                                </SongInfo>
                            </Container>
                        );
                    })
                :<p>Loading....</p>
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

const StyledAvatar = styled(Avatar)`
  margin-left: 1em;
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
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

export default SearchUsers;