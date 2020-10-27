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
        color: black;
        background-color: black;
    }

    & h1 {
        Color: Aqua;
        font-weight: bold;
    }
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
            <span>
                test
            </span>
            <span>
                <hr/>
            </span>
            <Song></Song>
        </StyledDiv>

    );
}

export default PlayListView;