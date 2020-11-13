
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Song from "./Song";
import SettingIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import { Search } from "@material-ui/icons";
import testplay from '../data/testsongs.json'
import axios from "axios";
import { session } from "passport";


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

function BrowseView(props) {
  const [currPlay, setcurrPlay] = useState([]);
  const [load, setLoad] = useState(false);
  const [filler, setFiller] = useState(false);

  let { playlist, username } = props;
  playlist = testplay.songs; // TESTING PURPOSES

  let data = {id: session.id}
  
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      setLoad(true);
      const result = await axios.post("http://localhost:5000/api/browse", data);
      setcurrPlay(result.data);
      setLoad(false);
    }
    fetchData();
    console.log(currPlay);
  }, []);

  console.log(currPlay);
  return (
    <StyledDiv>
      
      <span>
        <h1>{username ? username : "Browse"}</h1>

        <StyledSearch />
      </span>
      <StyledSpan>
        <Title>Title</Title>
        {username ? "" : <Artist>Artist</Artist>}
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv>
        {load ? 
        <p>Loading...</p>
        :
        (
          currPlay.map((album) => {
            // if(album.album_type === "single")
            // {
            //   let authors= "";
  
            //   for( var i = 0; i < album.artists.length; i++)
            //   {
            //     authors += album.artists[i].name + ", ";
            //   }
  
            //   return (
            //     <Song name={album.name} artist={authors} images = {album.images} Browse = {true} />
            //   );
            // }
          console.log(album);

          })
        )}
  
      </SongDiv>
    </StyledDiv>
  );
}

export default BrowseView;
