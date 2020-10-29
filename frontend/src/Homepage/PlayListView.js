import React from 'react'
import styled from 'styled-components'
import Song from './Song'
import TrashIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import {Link, useHistory, useLocation} from 'react-router-dom';

const StyledDiv = styled.div`
    padding: 1.5rem;
    margin-right: 1rem;

    & span {
        display:flex;
        align-items: center;
    }

    & span hr {
        width: 100%;
        color: white;
        background-color: white;
    }

    & h1 {
        Color: white;
        font-weight: bold;
        margin-right: 2rem;
    }

    & h6 {
        color: white;
    }  
`

const SongDiv = styled.div`
    min-height: 65vh;
    max-height: 65vh;
    overflow-y:auto;
`

const StyledSpan = styled.span`
    margin-left: 5.5em;
    margin-right: auto;
    margin-top: 1em;
    margin-bottom: -1em;
    display: inline-grid;
    width:43%;
    grid-template-columns: auto auto;
    justify-content: space-between;
    grid-column-gap: 3em;
`

const Artist = styled.h6`
    grid-column-start: 3;
      grid-row-end: 3;
`

const Title = styled.h6`
    grid-column-start: 1;
    grid-row-end: 1;
`

const StyledTrash = styled(TrashIcon)`
    margin-left: 2rem;
    color: white;
`

const StyledButton = styled(Button)`
    margin-left: 2rem;
    max-height: 2rem;
`


function PlayListView(props) {

    let l = useLocation();

    return (
        <StyledDiv>
            <span>
                <h1>{l.state.name} </h1>
                <StyledButton variant="contained" disableElevation>Share</StyledButton>
                <StyledTrash/>
            </span>
            <StyledSpan>
                <Title>Title</Title>
                <Artist>Artist</Artist>
            </StyledSpan>
            <span>
                <hr/>
            </span>
            {/* <SongDiv>

            </SongDiv> */}
        </StyledDiv>

    );
}

export default PlayListView;