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
    margin-left: 10%;
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
    const [users, setUsers] = useState([]);
    const [currS, setcurrS] = useState("");
    
    function getData(e,command) {
        setcurrF(command);
        e.preventDefault();
        console.log("getData is called");
        let accountType = 0;
        if (command == "Unban") {
            accountType = -1;
        } else if (command == "Remove") {
            accountType = 2;
        } 
        let data = {accountType}
        axios.post("http://localhost:5000/api/usersList", data)
            .then(function(res){
                setUsers(res.data);
             })
            .catch(err => console.log(err.data))
        
    }

    function UI_Handler(command,id) //id used to find the user
{
    let data = {id : id};
    if (command === "Ban") {
        console.log("ban is called");
        axios.post("http://localhost:5000/api/user/ban", data)
            .then(function(res){
                console.log(res.data);
                alert(res.data.username + " has been banned.");
             })
            .catch(err => console.log(err.data))
    } else if (command === "Unban") {
        console.log("unban is called");
        axios.post("http://localhost:5000/api/user/unban", data)
            .then(function(res){
                alert(res.data.username + " has been unbanned.");
             })
            .catch(err => console.log(err.data))
    } else {
        console.log("remove is called");
        axios.post("http://localhost:5000/api/user/remove", data)
            .then(function(res){
                alert(res.data.username + " has been removed.");
             })
            .catch(err => console.log(err.data))
    }
}

    return(
        <CenterDiv className = "fullscreen-container">
            <div id = "atxt">
                Admin
            </div>

            <div>
                <Button
                onClick = {(e) => getData(e,"Ban")}
                >Ban User</Button>
                <Button
                onClick = {(e) => getData(e,"Unban")}
                >Unban User</Button>
                <Button
                onClick = {(e) => getData(e,"Remove")}
                >Remove User</Button>
                 
                <CenterPanel>
                <StyledSearch 
                onChange = {(val) => setcurrS(val)}
                />
                <ResultsPanel>
                    { //go through database and print out people (excluding admin)
                    users.map ( (user) =>
                    {
                        if((user.username).includes(currS))
                        {
                            return(
                                <div>
                                    {user.username}
                                    <CButton
                                    onClick = {() => UI_Handler(currF,user._id)}
                                    >{currF}</CButton>
                                </div>

                            );
                        }
                    })
                    }
                </ResultsPanel>
            </CenterPanel>
    
            </div>
            
        </CenterDiv>
    );
}



export default Admin;