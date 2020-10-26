import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HeartIcon from '@material-ui/icons/Favorite';
import TrashIcon from '@material-ui/icons/Delete';
import './Song.css'


const Container = styled.div`
    display:flex;
    height: 3em;
    align-items: center;
`

const SongInfo = styled.div`
    display: flex;
    margin-right: auto;
    align-items: center;
    margin: 2em;
    justify-content: space-evenly;
`

const SongAction = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 2em;
    justify-content: space-evenly;
`

const BrowseSongActions = styled.div`
    
`


function Song(props) {
    
    return (
        <Container>
            <SongInfo>
                <Avatar variant="rounded" >
                    
                </Avatar>
                <span id = "txt">{props.name}</span>
            </SongInfo>
            <SongAction>
                <HeartIcon fontSize="large"/>
                <TrashIcon fontSize="large"/>
            </SongAction>
        </Container>
    );
}

export default Song;