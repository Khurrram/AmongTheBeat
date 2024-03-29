import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link, Redirect, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import { Button } from "react-materialize";
import { SessionContext } from "../App";
import { ViewPage } from "./HomePage";
import axios from "axios";
import { removeSessionCookie } from "../CookieHandler";
import { HistoryRounded } from "@material-ui/icons";

function SettingView(props) {
  const history = useHistory();
  // const { state, actions } = useContext(ViewPage);
  const session = useContext(SessionContext);
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
      axios
        .post("http://localhost:5000/api/user/changepass", data)
        .then(function (res) {
          console.log(res.data);
          if (res.data == "invalid pass") {
            alert("invalid pass");
          } else {
            alert("password changed");
          }
          console.log("Password changed");
        })
        .catch((err) => console.log(err.data));
    }
  }

  return (
    <SidebarDiv>
      <StyledBackIcon
        fontSize="large"
        onClick={() => {
          props.toggleSetting(false);
        }}
      />
      <SettingDiv>
        <AccountDiv>
          <StyledAvatar>
            <StyledImg src={props.url} />
          </StyledAvatar>
        </AccountDiv>

        <StyledTextField
          className={classes.root}
          defaultValue=""
          variant="outlined"
          label="Old Password"
          type="password"
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
          type="password"
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
          type="password"
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

          <Button
            id="logout"
            onClick={() => {
              console.log("asdasd");
              removeSessionCookie();
              history.push("/");
            }}
          >
            Log Out
          </Button>
        </AccountButtonDiv>
      </SettingDiv>
    </SidebarDiv>
  );
}

const StyledImg = styled.img`
  width: 320px;
  max-width: 320px;
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    max-height: 320px;
    max-width: 320px;
    height: 320px;
    width: 320px;
  }
`;

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
  width: 75%;
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
  &&&& {
    position: absolute;
    right: 0px;
    margin: auto;
    z-index: 1000000;
    background-color: rgb(0, 0, 0, 0.7);
    border-radius: 15px 0px 0px 15px;
    backdrop-filter: blur(10px);
  }
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

export default SettingView;
