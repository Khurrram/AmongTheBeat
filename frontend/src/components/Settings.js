import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button} from 'react-materialize';
import Avatar from '@material-ui/core/Avatar';
import './Settings.css';
import test from '../data/test.json';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "grey"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        },
        "& .MuiOutlinedInput-input": {
          color: "grey"
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "white"
        },
        "& .MuiInputLabel-outlined": {
          color: "grey"
        },
        "&:hover .MuiInputLabel-outlined": {
          color: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "white"
        }
      }

});

function Settings()
{
    const classes = useStyles();
    return(

        <div id = "settings" className = "fullscreen-container">
            <Link to = "/browse"><Button><ArrowBackIcon id = "arr"/></Button></Link>

            <Avatar id = "av" className= "AvatarIcon">J</Avatar>
            <div id = "user">{test.username}</div>
    
            <div id = "oldpc">
                <TextField className={classes.root}
                        defaultValue=""
                        variant="outlined"
                        label="Old Password"           
                        id = "oldp"  />
            </div>
            
            <div id = "newpc">
                <TextField className={classes.root}
                        defaultValue=""
                        variant="outlined"
                        label="New Password"           
                        id = "newp"  />
            </div>

            <div id = "cnewpc">
                <TextField className={classes.root}
                        defaultValue=""
                        variant="outlined"
                        label="Confirm Password"           
                        id = "newp"  />
            </div>

            <Button id = "confirm">Confirm</Button>
            <Button id = "logout">Log Out</Button>
            
        </div>
    );

}

export default Settings;
