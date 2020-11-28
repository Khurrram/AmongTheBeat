import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ViewPage } from "./HomePage";
import Avatar from "@material-ui/core/Avatar";
import { getSessionCookie } from "../CookieHandler";

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

const StyledAvatar = styled(Avatar)`
  margin-left: 0.5em;
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

function Album(props)
{
    const { state, actions } = useContext(ViewPage);
    const {name, playlistid, images, description} = props;

    const getSong = async () =>
    {
        const session = getSessionCookie();
        let accessToken = session.accessToken;
        console.log("accesstoken:", accessToken)
        let data2 = {id: playlistid, curraccessToken: accessToken};
        console.log("here", data2);

        let result = ""
        await axios.post("http://localhost:5000/api/openalbum",data2)
            .then(function(res)
            {
                result = res.data
            }).catch((err) => console.log(err));

        actions.setcurrentalbumSongs(result.tracks.items);
        actions.setcurrentAlbum(result)
        actions.setPage(2);
    } 

    return(
        <Container onClick = {() => getSong()}>
        <StyledAvatar variant="rounded" src = {images}/>
            <SongInfo>
                <SongName>{name}</SongName>
                <SongArtist>{description}</SongArtist>
            </SongInfo>
        </Container>
    );
    
}

export default Album;