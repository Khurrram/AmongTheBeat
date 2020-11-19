import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link, Redirect, useHistory } from "react-router-dom";

import { Button } from "react-materialize";
import { SessionContext } from "../App";
import { ViewPage } from "./HomePage";
import axios from "axios";
import { removeSessionCookie } from "../CookieHandler";
import { HistoryRounded } from "@material-ui/icons";

const SettingDiv = styled.div`
  display: flex;
  height: 83vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30vw;
  color: white;
`;

const StyledTextField = styled(TextField)`
  &&& {
    margin-top: 1.5rem;
  }
  width: 450px;
`;

const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const AccountButtonDiv = styled(AccountDiv)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 80%;
`;

const SidebarDiv = styled.div`
  position: absolute;
  right: 0px;
  top: 2rem;
  background-color: rgb(0, 0, 0, 0.7);
  border-radius: 15px 0px 0px 15px;
  backdrop-filter: blur(10px);
`;

const StyledBackIcon = styled(ArrowForwardIcon)`
  color: white;
  position: relative;
  top: 1rem;
  left: 1rem;
`;

const test = styled.div`
  position: relative;
`;

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

function SettingView(props) {
  const history = useHistory();
  const { state, actions } = useContext(ViewPage);
  const session = useContext(SessionContext);

  const [test1, setTest1] = useState(false);
  const classes = useStyles();
  const [currF, setcurrF] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: "",
  });

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
  }, []);

  return (
    <SidebarDiv>
      <StyledBackIcon
        fontSize="large"
        onClick={() => {
          actions.setSettings(false);
        }}
      />
      <SettingDiv>
        <AccountDiv>
          <h2>{currF.username}</h2>
        </AccountDiv>

        <StyledTextField
          className={classes.root}
          defaultValue=""
          variant="outlined"
          label="Old Password"
          onChange={(val) =>
            setcurrF({
              oldpass: val.target.value,
              newpass: currF.newpass,
              confirmpass: currF.confirmpass,
            })
          }
        />

        <StyledTextField
          className={classes.root}
          defaultValue=""
          variant="outlined"
          label="New Password"
          onChange={(val) =>
            setcurrF({
              oldpass: currF.oldpass,
              newpass: val.target.value,
              confirmpass: currF.confirmpass,
            })
          }
        />

        <StyledTextField
          className={classes.root}
          defaultValue=""
          variant="outlined"
          label="Confirm Password"
          id="width"
          onChange={(val) =>
            setcurrF({
              oldpass: currF.oldpass,
              newpass: currF.newpass,
              confirmpass: val.target.value,
            })
          }
        />

        <AccountButtonDiv>
          <Button
            id="confirm"
            onClick={() =>
              handleConfirm(currF.oldpass, currF.newpass, currF.confirmpass)
            }
          >
            Confirm
          </Button>

          <Button id="logout" onClick={()=> {
            console.log("asdasd");
            removeSessionCookie();
            history.push("/land");
          }}>Log Out</Button>
        </AccountButtonDiv>
      </SettingDiv>
    </SidebarDiv>
  );
}

export default SettingView;
