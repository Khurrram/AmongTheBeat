import React, { useEffect, useState, useContext } from "react";
import "./Admin.css";
import SearchBar from "material-ui-search-bar";
import {ban,unban,remove, usersList, checkAdmin} from "../DataManipulation/AccountREST"
import {SessionContext} from "../App"
import {useHistory } from "react-router-dom";

import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";



function Admin() {
  const [currF, setcurrF] = useState("");
  const [users, setUsers] = useState([]);
  const [currS, setcurrS] = useState("");
  const session = useContext(SessionContext);
  let history = useHistory();

  useEffect(() =>
  {
    checkAdmin(session.id).then((res) =>
    {
      if(res === "Not Admin")
      {
        history.push("/home")
      }
    })

  },[])

  function getData(command) {
    setcurrF(command);
    let accountType = 0;
    if (command == "Unban") {
      accountType = -1;
    } else if (command == "Remove") {
      accountType = 2;
    }
    usersList(accountType).then((res) =>
    {
      setUsers(res);
    })
  }

  function UI_Handler(command, id) {
    //id used to find the user
    if (command === "Ban") {
      ban(id).then((res) =>
      {
        alert(res.username + " has been banned.");
        getData("Ban");
      })
    } else if (command === "Unban") {
      unban(id).then((res) =>
      {
        alert(res.username + " has been unbanned.");
        getData("Unban");
      })
    } else {
      remove(id).then((res) =>
      {
        alert(res.username + " has been removed.");
        getData("Remove");
      })
    }
  }

  return (
    <CenterDiv className="fullscreen-container">
      <div id="atxt">Admin</div>

      <div>
        <Button onClick={(e) => getData("Ban")}>Ban User</Button>
        <Button onClick={(e) => getData("Unban")}>Unban User</Button>
        <Button onClick={(e) => getData("Remove")}>Remove User</Button>

        <CenterPanel>
          <StyledSearch onChange={(val) => setcurrS(val)} />
          <ResultsPanel>
            {
              //go through database and print out people (excluding admin)
              users.map((user) => {
                if (user.username.includes(currS)) {
                  return (
                    <div key = {user._id}>
                      {user.username}
                      <CButton onClick={() => UI_Handler(currF, user._id)}>
                        {currF}
                      </CButton>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            }
          </ResultsPanel>
        </CenterPanel>
      </div>
    </CenterDiv>
  );
}

const Button = styled.button`
  padding: 0.5em;
  color: Black;
  border-radius: 10px;
  margin: 0.5em;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  background-color: light-grey;
`;

const CButton = styled.button`
  padding: 0.5em;
  color: Black;
  border-radius: 10px;
  margin: 0.5em;
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  background-color: light-grey;
`;

const CenterDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CenterPanel = styled.div`
  color: white;
  display: flex;
  height: 50vh;
  justify-content: center;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
`;
const ResultsPanel = styled.div`
  color: white;
  margin-top: 3%;
  margin-left: 10%;
  position: absolute;
  margin-right: 20%;
  font-size: 24px;
`;

const StyledSearch = styled(SearchBar)`
  max-height: 2em;
  margin-left: 1em;
  margin-right: 1em;
`;

export default Admin;
