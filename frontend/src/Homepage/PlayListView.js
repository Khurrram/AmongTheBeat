import React from 'react'
import styled from 'styled-components'
import Song from './Song'
import SettingIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'


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
    }

    & h6 {
        color: white;
    }

   
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

const StyledSettings = styled(SettingIcon)`
    margin-left: 2.5rem;
    margin-right: 4rem;
`

const StyledButton = styled(Button)`
    margin-left: 2rem;
`


function PlayListView(props) {

    return (
        <StyledDiv>
            <span>
                <h1>PLAYLISTName </h1>
                <StyledSettings></StyledSettings>
                <StyledButton variant="contained" disableElevation >Share</StyledButton>
            </span>
            <StyledSpan>
                <Title>Title</Title>
                <Artist>Artist</Artist>
            </StyledSpan>
            <span>
                <hr/>
            </span>
        </StyledDiv>

    );
}

export default PlayListView;