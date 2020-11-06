import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Admin.css';
import SearchBar from 'material-ui-search-bar';
import userdata from '../data/admintest.json';

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { ButtonBase } from '@material-ui/core';

const Button = styled.button`
    padding: .5em;
    color: Black;
    border-radius: 10px;
    margin: .5em;
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: light-grey;
`

const CButton = styled.button`
    padding: .5em;
    color: Black;
    border-radius: 10px;
    margin: .5em;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    background-color: light-grey;
`

const CenterDiv = styled.div`
    height: 100vh;
    width: 100vw;
    background:linear-gradient(rgb(46, 0, 48),transparent);
    background-color:rgb(77, 77, 75);
    display: flex;
    align-items: center;
    justify-content: center;

`
const CenterPanel = styled.div`
    color: white;
    display: flex;
    height: 50vh;
    justify-content: center;
    background:linear-gradient(rgb(46, 0, 48),transparent);
    background-color:rgb(77, 77, 75);

`
const ResultsPanel = styled.div`
    color: white;
    margin-top: 3%;
    margin-left: 3%;
    position: absolute;
    margin-right: 20%;
    font-size: 24px;
`

const StyledSearch = styled(SearchBar)`
    max-height: 2em;
    margin-left: 1em;
    margin-right: 1em;
    
`
function Admin()
{
    const [currF, setcurrF] = useState("");

    return(
        <CenterDiv className = "fullscreen-container">
            <div id = "atxt">
                Admin
            </div>

            <div>
                <Button
                onClick = {() => setcurrF("Ban User")}
                >Ban User</Button>
                <Button
                onClick = {() => setcurrF("Unban User")}
                >Unban User</Button>
                <Button
                onClick = {() => setcurrF("Remove User")}
                >Remove User</Button>
                
                {ScreenType(currF)}

            </div>

            
        </CenterDiv>
    );
}
function ScreenType(focus)
{
    const [currS, setcurrS] = useState("");

    if (focus === "")
        return <div></div>
    else
    {
        return(
            <CenterPanel>
                <StyledSearch 
                onChange = {(val) => setcurrS(val)}
                />
                <ResultsPanel>
                    { //go through database and print out people (excluding admin)
                    userdata.users.map( (user) =>
                    {
                        if((user.username).includes(currS) && user.username !== "Administrator")
                        {
                            return(
                                <div>
                                    {user.username}
                                    <CButton
                                    onClick = {() => RB(user.account_type,focus,user._id)}
                                    >{focus}</CButton>
                                </div>

                            );
                        }
                    })
                    }
                </ResultsPanel>
            </CenterPanel>
    
        );
    }
}

function RB(acc_type,focus,id) //id used to find the user
{
    if(acc_type !== 1 && focus === "Ban User") //When admin tried to ban an already banned user
    {
        alert("Cannot ban! User is already banned.");
    }
    else if (acc_type === 1 && focus === "Ban User") //Admin bans user
    {
        alert("User has been banned.");
        //backend functionality here
    }
    else if(acc_type !== -1 && focus === "Unban User") //Admin tried unbanning a user that was not banned
    {
        alert("Cannot unban user. User is already unbanned.")
    }
    else if(acc_type === -1 && focus === "Unban User") // Admin unbans user
    {
        alert("User has been unbanned.")
        //backend functionality here
    }
    else if(focus === "Remove User" )
    {
        alert("User removed.")
        //backend functionality here
    }
}



export default Admin;