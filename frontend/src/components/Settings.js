import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button} from 'react-materialize';
import Avatar from '@material-ui/core/Avatar';
import './Settings.css';
import test from '../data/test.json';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';

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

const CenterDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background:linear-gradient(rgb(46, 0, 48),transparent);
  background-color:rgb(77, 77, 75);
  display: flex;
  align-items: center;
  justify-content: center;
`

const BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`

const AlignTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`

const AccountButtonDiv = styled(AccountDiv)`
  width: 100%;
`

function Settings()   {
    const classes = useStyles();
    return(

        <CenterDiv>
            <Link to = "/browse"><BackButton><ArrowBackIcon id = "arr"/></BackButton></Link>
            <AlignTextDiv>
              <AccountDiv>
                <Avatar id = "av" className= "AvatarIcon">J</Avatar>
                <div id = "user">{test.username}</div>
              </AccountDiv>
              
    
              <div id = "newpc">
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

              <div id = "newpc">
                  <TextField className={classes.root}
                          defaultValue=""
                          variant="outlined"
                          label="Confirm Password"           
                          id = "newp"  />
              </div>

              <AccountButtonDiv>
                <Button id = "confirm">Confirm</Button>
                <Link to = "/land"><Button id = "logout">Log Out</Button></Link>
              </AccountButtonDiv>
            
            
            </AlignTextDiv>
            
            
        </CenterDiv>
    );

}

export default Settings;
