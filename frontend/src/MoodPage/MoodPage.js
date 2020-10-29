import React, {Component} from 'react';
import {Navlink, Redirect, useHistory} from 'react-router-dom';
import { Button} from 'react-materialize';
import './MoodPage.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dog from './dog.gif';

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
            <Button node= "button" className = "orange" large 
            onClick = {homeChange}
            >
                <ArrowBackIcon />
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