import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HeartIcon from '@material-ui/icons/Favorite';
import TrashIcon from '@material-ui/icons/Delete';
import './Song.css'
import Icon from '@material-ui/core/Icon'

const Container = styled.div`
    & {
        display:flex;
        height: 3em;
        align-items: center;
        margin-top: .5em;
        margin-bottom: .5em;
    }
    
    &:hover {
        background-color: lightgrey;
        color:
    }
`

const SongInfo = styled.div`
    display: flex;
    margin-right: auto;
    align-items: center;
    margin: 2em;
    justify-content: space-evenly;
    $:hover {
        background-color: black;
    }
`
const MarginRight = styled.span`
    margin-right: 1em;
`

const StyledHeart = styled(HeartIcon)`
    margin-right: 1rem;
    color: ${props => props.fav ? "grey" : "red"};

    &:hover {
        color: ${props => props.fav ? "red" : "grey"};
    }
`


const SongName = styled.span`
    margin-left: 1em;
`

const SongAction = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 6em;
    justify-content: space-evenly;
`

const BrowseSongActions = styled.button`
`




function Song(props) {
    
    return (
        <Container >
            <SongInfo>
                <Avatar variant="rounded" >
                    
                </Avatar>

               <SongName>{props.name}</SongName>

            </SongInfo>
            <SongAction>
                <StyledHeart></StyledHeart>
                <TrashIcon></TrashIcon>
            </SongAction>
        </Container>
    );
}

export default Song;