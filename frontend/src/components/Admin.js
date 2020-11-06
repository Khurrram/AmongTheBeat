import React, {useState} from 'react';
import './Admin.css';
import SearchBar from 'material-ui-search-bar';
import userdata from '../data/admintest.json';
import axios from 'axios';

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

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
                onClick = {() => setcurrF("ban")}
                >Ban User</Button>
                <Button
                onClick = {() => setcurrF("unban")}
                >Unban User</Button>
                <Button
                onClick = {() => setcurrF("remove")}
                >Remove User</Button>
                
                {ScreenType(currF)}

            </div>

            
        </CenterDiv>
    );
}



function ScreenType(focus)
{
    const [currS, setcurrS] = useState("");
    let users;
    if (focus === "")
        return <div></div>
    else
    {
        let accountType = 0;
        if (focus == "unban") {
            accountType = -1;
        } 
        let data = {accountType}
        axios.post("http://localhost:5000/api/usersList", data)
            .then(function(res){
                console.log(res.data);
                users = res.data;
                console.log(users);
                return(
                    <CenterPanel>
                        <StyledSearch 
                        onChange = {(val) => setcurrS(val)}
                        />
                        {console.log("returning")}
                        <ResultsPanel>
                            { //go through database and print out people (excluding admin)
                            users.map ( (user) =>
                            {
                                    return(
                                        <div>
                                            {console.log("returning inner")}
                                            {user.username}
                                            <CButton
                                            onClick = {() => UI_Handler(user.accountType,focus,user._id)}
                                            >{focus}</CButton>
                                        </div>

                                    );
                            })
                            }
                        </ResultsPanel>
                    </CenterPanel>
                    );
             })
            .catch(err => console.log(err.data))
    }
}

function UI_Handler(acc_type,focus,id) //id used to find the user
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