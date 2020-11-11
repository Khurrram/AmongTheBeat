import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";

const SettingDiv = styled.div`
  display: flex;
  height: 83vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 45vw;
  color: white;
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
  width: 30%;
`;

const SidebarDiv = styled.div`
  position: absolute;
  right: 0px;
  top: 8.5%;
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
      alert("Matches");
      //add functionality to backend here.
    }
  }

  return (
    <SidebarDiv>
      <StyledBackIcon fontSize="large" />
      <SettingDiv>
        <AccountDiv>
          <h2>12323</h2>
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
      </SettingDiv>
    </SidebarDiv>
  );
}

export default SettingView;
