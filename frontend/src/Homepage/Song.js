import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HeartIcon from '@material-ui/icons/Favorite';
import TrashIcon from '@material-ui/icons/Delete';
import './Song.css'
import Icon from '@material-ui/core/Icon'

const Container = styled.div`
    display:flex;
    height: 3em;
    align-items: center;
    margin-top: .5em;
    margin-bottom: .5em;
    color: white;
    border-radius: 5px;
    
    &:hover {
        background-color: lightgrey;
    }

`

const StyledAvatar = styled(Avatar)`
    margin-left: .5em;
`

const SongInfo = styled.div`
    display: flex;
    margin-right: auto;
    align-items: center;
    margin: 1.5em;
    width: 100%;

    $:hover {
        background-color: black;
    }
`

const StyledHeart = styled(HeartIcon)`
    margin-right: 1rem;
    color: ${props => props.fav ? "grey" : "red"};

    &:hover {
        color: ${props => props.fav ? "red" : "grey"};
    }
`

const SongArtist = styled.span`
    width: 43rem;
   
`
const SongName = styled.span`
    flex: auto;
`

const SongAction = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 6em;
    justify-content: space-evenly;
`

function Song(props) {
    
    return (
        <Container >
            <StyledAvatar variant="rounded" > L </StyledAvatar>
            <SongInfo>
               <SongName>{props.name}d1</SongName>
               <SongArtist>{props.artist}d123123d2</SongArtist>
            </SongInfo>
            <SongAction>
                <StyledHeart></StyledHeart>
                <TrashIcon></TrashIcon>
            </SongAction>
        </Container>
    );
}

export default Song;