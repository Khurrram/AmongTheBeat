import React, {Component} from 'react';
import {Navlink, Redirect, useHistory} from 'react-router-dom';

import './MoodPage.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dog from './dog.gif';

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

const Button = styled.button`
    padding: .5em;
    color: white;
    border: none;
    margin: .5em;
    width: 5%;
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: Transparent;
`

function MoodPage()
{
    const history = useHistory();

    const homeChange = () => 
    {
        let path = '/browse';
        history.push(path);
    }

    return(
        <div className = "fullscreen-container">
            <div id = "back" className = "row">
            <Button id = " but" node= "button" className = "orange" large 
            onClick = {homeChange}
            >
                <ArrowBackIcon id = "arrow"/>
            </Button>
            </div>


            <div id = "mood" >
                Happy
            </div>

            <div id = "desc"> 
                <p>Background is <div id = "desccolor"> orange </div> because you have recently listened to music related to energetic and enthustiastic emotions</p>
                <p>Your tones are <div id = "tonecolor"> yellow </div> because most of your songs are in the key of C</p>
            </div>
            <div id = "quote">
                "Happiness is when what you think, what you say, and what you do are in harmony." – Mahatma Gandhi
            </div>

            <img id = "pic" src = {dog}/>


        </div>
    );
}


export default MoodPage;