import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import HeartIcon from '@material-ui/icons/Favorite';
import TrashIcon from '@material-ui/icons/Delete';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import AddIcon from '@material-ui/icons/Add';
import './Song.css'

const Container = styled.div`
    display:flex;
    height: 3em;
    align-items: center;
    margin-top: .5em;
    margin-bottom: .5em;
    color: white;
    border-radius: 5px;
    
    &:hover {
        background-color: #686868;
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
    color: white;

    $:hover {
        background-color: black;
    }
`

const StyledHeart = styled(HeartIcon)`
    margin-right: 1rem;
    color: ${props => props.fav ? "red" : "grey"};

    &:hover {
        color: ${props => props.fav ? "grey" : "red"};
    }
`

const StyledQueue = styled(QueueMusicIcon)`
    margin-right: 1rem;
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
               <SongName>{props.name}</SongName>
               <SongArtist>{props.artist}</SongArtist>
            </SongInfo>
            
            {props.playlist
                ? <SongAction><AddIcon/></SongAction>
                : view(props)
            }
            
        </Container>
    );
}

function view(props) {
    console.log(props);
    return (
        <SongAction>
            <StyledHeart></StyledHeart>
            <StyledQueue/>
                {props.Browse 
                    ? <PlaylistAddIcon/>
                    : <TrashIcon/>
                }
        </SongAction>
    );
}

export default Song;
