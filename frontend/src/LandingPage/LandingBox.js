import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingBox.css";
import { Row, CardPanel } from "react-materialize";
import { Email, AccountCircle, Lock, CheckCircle } from "@material-ui/icons";
import { TextField, Grid, Button, Box } from "@material-ui/core";
import axios from "axios";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import { AppContext } from "../App";

function RegisterBox(props) {
  let history = useHistory();
  const button = props.button;
  const isloggedinhandler = props.isloggedinhandler;
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [errorState, setError] = useState({
    emailError: false,
    userError: false,
    passwordError: false,
    confirmPasswordError: false,
  });
  const [invalid, setInvalid] = useState(false);

  function emailHandler(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setForm({
        email: email,
        password: form.password,
        username: form.username,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: false,
        userError: errorState.userError,
        passwordError: errorState.passwordError,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    } else {
      setForm({
        email: email,
        password: form.password,
        username: form.username,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: true,
        userError: errorState.userError,
        passwordError: errorState.passwordError,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    }
  }

  function userHandler(user) {
    if (user !== "") {
      setForm({
        email: form.email,
        password: form.password,
        username: user,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: errorState.emailError,
        userError: false,
        passwordError: errorState.passwordError,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    } else {
      setForm({
        email: form.email,
        password: form.password,
        username: user,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: errorState.emailError,
        userError: true,
        passwordError: errorState.passwordError,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    }
  }

  function passHandler(pass) {
    if (pass !== "") {
      setForm({
        email: form.email,
        password: pass,
        username: form.username,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: errorState.emailError,
        userError: errorState.userError,
        passwordError: false,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    } else {
      setForm({
        email: form.email,
        password: pass,
        username: form.username,
        confirm_password: form.confirm_password,
      });
      setError({
        emailError: errorState.emailError,
        userError: errorState.userError,
        passwordError: true,
        confirmPasswordError: errorState.confirmPasswordError,
      });
    }
  }

  function confirmpassHandler(confirmpass) {
    if (confirmpass === form.password) {
      setForm({
        email: form.email,
        password: form.password,
        username: form.username,
        confirm_password: confirmpass,
      });
      setError({
        emailError: errorState.emailError,
        userError: errorState.userError,
        passwordError: errorState.passwordError,
        confirmPasswordError: false,
      });
    } else {
      setForm({
        email: form.email,
        password: form.password,
        username: form.username,
        confirm_password: confirmpass,
      });
      setError({
        emailError: errorState.emailError,
        userError: errorState.userError,
        passwordError: errorState.passwordError,
        confirmPasswordError: true,
      });
    }
  }

  function isEmpty() {
    return (
      form.email == "" ||
      form.password == "" ||
      form.username == "" ||
      form.confirm_password == ""
    );
  }

  function submitRegistration(e, email, username, password) {
    e.preventDefault();
    let data = { email, username, password };

    axios
      .post("http://localhost:5000/api/register", data)
      .then(function (res) {
        let id = res.data;
        if (res.data != -1 + "") {
          setSessionCookie({ id: id, username: username });
          console.log("Redirecting");
          isloggedinhandler();
        } else {
          setInvalid(true);
        }
      })
      .catch((err) => console.log(err.data));
  }

  return (
    <CardPanel className="box-dim hoverable">
      <div class="overlay input-dim">
        <Row id="BannedText">
          {invalid ? (
            <h5 className="bannedText">
              The email or username are already taken.
            </h5>
          ) : null}
        </Row>
        <Row>
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            direction="row"
            alignContent="center"
            justify="center"
          >
            <Grid item className="icon-margin">
              <Email fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="email"
                variant="standard"
                label="Email"
                type="email"
                fullWidth
                required
                error={errorState.emailError}
                helperText={
                  errorState.emailError ? "Please enter a valid email." : ""
                }
                onBlur={(e) => emailHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item className="icon-margin">
              <AccountCircle required fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="username"
                variant="standard"
                label="Username"
                fullWidth
                required
                error={errorState.userError}
                helperText={
                  errorState.userError ? "Please enter a valid username." : ""
                }
                onBlur={(e) => userHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Grid item className="icon-margin">
              <Lock required fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="password"
                variant="standard"
                label="Password"
                type="password"
                fullWidth
                required
                error={errorState.passwordError}
                helperText={
                  errorState.passwordError
                    ? "Please enter a valid password."
                    : ""
                }
                onBlur={(e) => passHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Grid item className="icon-margin">
              <CheckCircle required fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="confirmpassword"
                variant="standard"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                error={errorState.confirmPasswordError}
                helperText={
                  errorState.confirmPasswordError
                    ? "Passwords do not match"
                    : ""
                }
                onBlur={(e) => confirmpassHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row className="gap" />
        <Row className="gap" />
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button
              variant="contained"
              className="btn-color"
              onClick={(e) =>
                submitRegistration(e, form.email, form.username, form.password)
              }
              disabled={
                errorState.emailError ||
                errorState.userError ||
                errorState.passwordError ||
                errorState.confirmPasswordError ||
                isEmpty()
                  ? true
                  : false
              }
            >
              {" "}
              Register{" "}
            </Button>
            {button}
          </Grid>
        </Row>
      </div>
    </CardPanel>
  );
}

function LoginBox(props) {
  const history = useHistory();
  const button = props.button;
  const isloggedinhandler = props.isloggedinhandler;
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errorState, setError] = useState({
    userError: false,
    passwordError: false,
  });
  const [banned, setBanned] = useState(false);
  const [invalid, setInvalid] = useState(false);

  function submitLogin(e, username, password) {
    e.preventDefault();
    let data = { username, password };
    console.log("subm " + username);

    axios
      .post("http://localhost:5000/api/login", data)
      .then(function (res) {
        let id = res.data;
        console.log("res: " + res.data);
        if (res.data != "banned" && res.data != "notFound") {
          console.log("Redirecting");
          setSessionCookie({ id: id, username: username });
          isloggedinhandler();
        } else {
          if (res.data == "banned") {
            setBanned(true);
          } else if (res.data == "notFound") {
            setInvalid(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  function userHandler(user) {
    if (user !== "") {
      setForm({
        password: form.password,
        username: user,
      });
      setError({
        userError: false,
        passwordError: errorState.passwordError,
      });
    } else {
      setForm({
        password: form.password,
        username: user,
      });
      setError({
        userError: true,
        passwordError: errorState.passwordError,
      });
    }
  }

  function passHandler(pass) {
    if (pass !== "") {
      setForm({
        password: pass,
        username: form.username,
      });
      setError({
        userError: errorState.userError,
        passwordError: false,
      });
    } else {
      setForm({
        password: pass,
        username: form.username,
      });
      setError({
        userError: errorState.userError,
        passwordError: true,
      });
    }
  }

  function isEmpty() {
    return form.password == "" || form.username == "";
  }

  return (
    <CardPanel className="box-dim hoverable">
      <div class="overlay input-dim">
        <Row id="BannedText">
          {banned ? <h5 className="bannedText">Account is banned.</h5> : null}
        </Row>
        <Row>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item className="icon-margin">
              <AccountCircle required fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="username"
                variant="standard"
                label="Username"
                fullWidth
                required
                error={invalid}
                helperText={invalid ? "Invalid username or password" : ""}
                onBlur={(e) => userHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Grid item className="icon-margin">
              <Lock required fontSize="large" className="icon-color" />
            </Grid>
            <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
              <TextField
                id="password"
                variant="standard"
                label="Password"
                type="password"
                fullWidth
                required
                error={invalid}
                helperText={invalid ? "Invalid username or password" : ""}
                onBlur={(e) => passHandler(e.target.value)}
              />
            </Grid>
          </Grid>
        </Row>
        <Row className="gap" />
        <Row className="gap" />
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button
              variant="contained"
              className="btn-color"
              onClick={(e) => submitLogin(e, form.username, form.password)}
              disabled={
                errorState.userError || errorState.passwordError || isEmpty()
              }
            >
              {" "}
              Log In{" "}
            </Button>
            {button}
          </Grid>
        </Row>
      </div>
    </CardPanel>
  );
}

function SpotifyBox(props) {
  const auth = "https://accounts.spotify.com/authorize?";
  const client_id = "6e6168bb4f424095b42f948f1e303b69";
  const response_type = "code";
  const redirect_uri = "https://among-the-beat-sbu.herokuapp.com/redirect";
  const scope = [
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];
  return (
    <CardPanel className="box-dim hoverable">
      <div class="overlay input-dim">
        <Row className="gap" />
        <Row className="gap" />
        <Row className="gap" />
        <Row>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button
              variant="contained"
              className="btn-color"
              href={
                auth +
                "client_id=" +
                client_id +
                "&redirect_uri=" +
                redirect_uri +
                "&scope=" +
                scope.join("%20") +
                "&response_type=code&show_dialog=true"
              }
            >
              {" "}
              Log In Through Spotify{" "}
            </Button>
          </Grid>
        </Row>
      </div>
    </CardPanel>
  );
}

function LoginButton(props) {
  return (
    <Button
      variant="contained"
      className="btn-color btn-pad"
      onClick={props.onClick}
    >
      Register
    </Button>
  );
}

function RegisterButton(props) {
  return (
    <Button
      variant="contained"
      className="btn-color btn-pad"
      onClick={props.onClick}
    >
      Login
    </Button>
  );
}

function CurrentBox(props) {
  const isregisterclicked = props.isregisterclicked;
  const button = props.button;
  const isloggedinhandler = props.isloggedinhandler;
  const isloggedin = props.isloggedin;
  if (isloggedin) {
    return <SpotifyBox />;
  } else {
    if (isregisterclicked) {
      return (
        <RegisterBox button={button} isloggedinhandler={isloggedinhandler} />
      );
    } else {
      return <LoginBox button={button} isloggedinhandler={isloggedinhandler} />;
    }
  }
}

class LandingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isregisterclicked: false, isloggedin: false };
    this.LoginBox_handler = this.LoginBox_handler.bind(this);
    this.RegisterBox_handler = this.RegisterBox_handler.bind(this);
    this.LoggedIn_handler = this.LoggedIn_handler.bind(this);
  }

  LoginBox_handler() {
    this.setState({ isregisterclicked: false });
  }

  RegisterBox_handler() {
    this.setState({ isregisterclicked: true });
  }

  LoggedIn_handler() {
    this.setState({ isloggedin: true });
  }

  render() {
    const isregisterclicked = this.state.isregisterclicked;
    const isloggedin = this.state.isloggedin;
    let button;

    if (isregisterclicked) {
      button = <RegisterButton onClick={this.LoginBox_handler} />;
    } else {
      button = <LoginButton onClick={this.RegisterBox_handler} />;
    }

    return (
      <div>
        <CurrentBox
          isregisterclicked={isregisterclicked}
          isloggedinhandler={this.LoggedIn_handler}
          isloggedin={isloggedin}
          button={button}
        />
      </div>
    );
  }
}

export default LandingBox;
