import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import SettingIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { getSessionCookie } from "../CookieHandler"
import Album from "./Album"
import SearchSong from "./SearchSong"
import {browse} from "../DataManipulation/AccountREST"

function BrowseView(props) {
  const [currPlay, setcurrPlay] = useState();
  const [load, setLoad] = useState(false);
  const [filler, setFiller] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  const fetchData1 = async () =>
    {
      const session = getSessionCookie();
      let accessToken = session.accessToken;

      setLoad(true);
      const result = await browse(accessToken);
      setcurrPlay(result.data);
      setLoad(false);
    }

    async function clicklol() {
      let a =  await fetchData1();
    }
  
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const session = getSessionCookie();
      let accessToken = session.accessToken;

      setLoad(true);
      const result = await browse(accessToken);
      setcurrPlay(result.data);
      setLoad(false);

      setSearchItems("");
      setSearch(false);
      // actions.setuserResults("")

      return result.data;
    }
    fetchData().then(u => {setcurrPlay(u)});
  }, []);

  const searchforSong = (val) =>
  {
    if(val.trim() === "")
    {
      setSearchItems("");
      setSearch(false);
    }
    else{
      setSearchItems(val);
      setSearch(true);
    }
  }

  return (
    <StyledDiv>
      <span>
        <h1>Browse</h1>
        <StyledSearch placeholder="Search Songs" 
          placeholder = "Search For Songs"
          onChange = {(val) => searchforSong(val)}
          onCancelSearch = {() => searchforSong("")}
        />
      </span>
      <StyledSpan>
        <Title onClick={()=>{clicklol()}}>Title</Title>
        {<Artist>{search? "Artist": "Description"}</Artist>}
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv>
      {currPlay && search === false ? 
        currPlay.playlists.items.map((album)=>{
          return (
            <Album name = {album.name} playlistid = {album.id} images = {album.images[0].url} description = {album.description} key = {album.id}/>
          );
        })
        :
        (search === true ?
          <SearchSong search = {searchItems}/>

        :<p>Loading...</p>
        )

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

const StyledSearch = styled(SearchBar)`
  margin-left: auto;
  max-height: 2rem;
`;

const StyledButton = styled(Button)`
  margin-left: 2rem;
`;

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

export default BrowseView;
