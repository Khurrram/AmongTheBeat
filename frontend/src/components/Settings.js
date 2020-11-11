import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";
import Avatar from "@material-ui/core/Avatar";
import "./Settings.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";
import { SessionContext } from "../App";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-input": {
      color: "grey",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "grey",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
    },
  },
});

const CenterDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.div`
  position: relative;
  top: 1rem;
  left: 1rem;
`;

const AlignTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const AccountButtonDiv = styled(AccountDiv)`
  width: 100%;
`;

function Settings() {
  const classes = useStyles();
  const [currF, setcurrF] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: "",
    username: "",
  });

  const session = useContext(SessionContext);

  function handleConfirm(oldp, newp, confirmp) {
    if (newp !== confirmp) {
      alert("New Password does not match for both textfields.");
    } else {
      let data = { id: session.id, oldpass: oldp, updatedpass: newp };
      alert("Matches");

      axios
        .post("http://localhost:5000/api/user/checkpass", data)
        .then(function (res) {
          console.log(res.data);
        })
        .catch((err) => console.log(err.data));

      axios
        .post("http://localhost:5000/api/user/changepass", data)
        .then(function (res) {
          console.log(res.data);
          console.log("Password changed");
        })
        .catch((err) => console.log(err.data));
    }
  }

  useEffect(() => {
    let data = { id: session.id };
    axios
      .post("http://localhost:5000/api/user/getusername", data)
      .then(function (res) {
        let username = res.data;
        setcurrF({
          oldpass: currF.oldpass,
          newpass: currF.newpass,
          confirmpass: currF.confirmpass,
          username: username,
        });
      })
      .catch((err) => console.log(err.data));
  });

  return (
    <CenterDiv>
      <Link to="/home">
        <BackButton>
          <ArrowBackIcon id="arr" />
        </BackButton>
      </Link>
      <AlignTextDiv>
        <AccountDiv>
          <Avatar id="av" className="AvatarIcon">
            {currF.username.charAt(0).toUpperCase()}
          </Avatar>
          <div id="user">{currF.username}</div>
        </AccountDiv>

        <div id="newpc">
          <TextField
            className={classes.root}
            defaultValue=""
            variant="outlined"
            label="Old Password"
            id="oldp"
            onChange={(val) =>
              setcurrF({
                oldpass: val.target.value,
                newpass: currF.newpass,
                confirmpass: currF.confirmpass,
                username: currF.username,
              })
            }
          />
        </div>

        <div id="newpc">
          <TextField
            className={classes.root}
            defaultValue=""
            variant="outlined"
            label="New Password"
            id="newp"
            onChange={(val) =>
              setcurrF({
                oldpass: currF.oldpass,
                newpass: val.target.value,
                confirmpass: currF.confirmpass,
                username: currF.username,
              })
            }
          />
        </div>

        <div id="newpc">
          <TextField
            className={classes.root}
            defaultValue=""
            variant="outlined"
            label="Confirm Password"
            id="newp"
            onChange={(val) =>
              setcurrF({
                oldpass: currF.oldpass,
                newpass: currF.newpass,
                confirmpass: val.target.value,
                username: currF.username,
              })
            }
          />
        </div>

        <AccountButtonDiv>
          <Button
            id="confirm"
            onClick={() =>
              handleConfirm(currF.oldpass, currF.newpass, currF.confirmpass)
            }
          >
            Confirm
          </Button>
          <Link to="/">
            <Button id="logout">Log Out</Button>
          </Link>
        </AccountButtonDiv>
      </AlignTextDiv>
    </CenterDiv>
  );
}

export default Settings;
