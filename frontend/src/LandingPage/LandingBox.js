import React, { useState } from 'react';
import './LandingBox.css';
import {Row, CardPanel} from 'react-materialize'
import {Email, AccountCircle, Lock, CheckCircle} from '@material-ui/icons';
import {TextField, Grid, Button} from '@material-ui/core';
import axios from 'axios';


function RegisterBox(props) {
    const button = props.button;
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    });
    const [errorState, setError] = useState({
        emailError: false,
        userError: false,
        passwordError: false,
        confirmPasswordError: false
    });

    function emailHandler(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(email) ) {
        setForm({
            email: email, password: form.password, username: form.username, confirm_password: form.confirm_password
        });
        setError({
            emailError: false, userError: errorState.userError, passwordError: errorState.passwordError, confirmPasswordError: errorState.confirmPasswordError
        });
    }
    else {
        setForm({
            email: email, password: form.password, username: form.username, confirm_password: form.confirm_password
        });
        setError({
            emailError: true, userError: errorState.userError, passwordError: errorState.passwordError, confirmPasswordError: errorState.confirmPasswordError
        });
    }
    }

    function userHandler(user)
    {
        if(user !== "")
        {
            setForm({
                email: form.email, password: form.password, username: user, confirm_password: form.confirm_password
            });
            setError({
                emailError: errorState.emailError, userError: false, passwordError: errorState.passwordError, confirmPasswordError: errorState.confirmPasswordError
            });
        }
        else
        {
            setForm({
                email: form.email, password: form.password, username: user, confirm_password: form.confirm_password
            });
            setError({
                emailError: errorState.emailError, userError: true, passwordError: errorState.passwordError, confirmPasswordError: errorState.confirmPasswordError
            });
        }
    }

    function passHandler(pass)
    {
        if(pass !== "")
        {
            setForm({
                email: form.email, password: pass, username: form.email, confirm_password: form.confirm_password
            });
            setError({
                emailError: errorState.emailError, userError: errorState.userError, passwordError: false, confirmPasswordError: errorState.confirmPasswordError
            });

        }
        else
        {
            setForm({
                email: form.email, password: pass, username: form.email, confirm_password: form.confirm_password
            });
            setError({
                emailError: errorState.emailError, userError: errorState.userError, passwordError: true, confirmPasswordError: errorState.confirmPasswordError
            });

        }
    }

    function confirmpassHandler(confirmpass)
    {
        if(confirmpass === form.password)
        {
            setForm({
                email: form.email, password: form.password, username: form.email, confirm_password: confirmpass
            });
            setError({
                emailError: errorState.emailError, userError: errorState.userError, passwordError: errorState.passwordError, confirmPasswordError: false
            });
        }
        else
        {
            setForm({
                email: form.email, password: form.password, username: form.email, confirm_password: confirmpass
            });
            setError({
                emailError: errorState.emailError, userError: errorState.userError, passwordError: errorState.passwordError, confirmPasswordError: true
            });
        }
    }
    
    function submitRegistration(e, email,username,password) {
        e.preventDefault();
        let data = {email, username, password};
    
        axios.post("http://localhost:5000/api/register", data)
            .then(function(res){
                console.log(res.data);
                if (res.data != (-1+"")) {
                    console.log("Redirecting");
                    window.location="/home";
                }
            })
            .catch(err => console.log(err.data))
    }
    
    return (
        <CardPanel className="box-dim hoverable">
            <div class="overlay input-dim">
            <Row>
                <Grid container spacing={2} alignItems="stretch" direction="row" alignContent="center" justify="center">
                <Grid item className="icon-margin">
                    <Email fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="email" variant="standard" label="Email" type="email" fullWidth required error={errorState.emailError} helperText={errorState.emailError? "Please enter a valid email." : ''} onBlur={(e) => emailHandler(e.target.value)}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap" />
            <Row>
                <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item  className="icon-margin">
                    <AccountCircle required fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="username" variant="standard" label="Username" fullWidth required error = {errorState.userError} helperText = {errorState.userError ? "Please enter a valid username." : ''} onChange={(e) => userHandler(e.target.value)}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap" />
            <Row>
                <Grid container spacing={2} alignItems="flex-end" justify="center">
                <Grid item  className="icon-margin">
                    <Lock required fontSize="large"  className="icon-color"/>
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="password" variant="standard" label="Password" type="password" fullWidth required error = {errorState.passwordError} helperText = {errorState.passwordError ? "Please enter a valid password." : ''} onChange={(e) => passHandler(e.target.value)}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap" />
            <Row>
                <Grid container spacing={2} alignItems="flex-end" justify="center">
                <Grid item  className="icon-margin">
                    <CheckCircle required fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="confirmpassword" variant="standard" label="Confirm Password" type="password" fullWidth required error = {errorState.confirmPasswordError} helperText = {errorState.confirmPasswordError ? "Passwords do not match" : ''} onChange={(e) => confirmpassHandler(e.target.value)}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row>
            <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button variant="contained" className="btn-color" onClick={(e) => submitRegistration(e, form.email,form.username,form.password)} disabled = {(errorState.emailError || errorState.userError || errorState.passwordError || errorState.confirmPasswordError) ? true: false} > Register </Button>
                {button}
            </Grid>
            </Row>
            </div>
        </CardPanel>
    );
}


function LoginBox(props) {
    const button = props.button;
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    function submitLogin(e, username, password) {
        e.preventDefault();
        let data = {username, password};
        
        axios.post("http://localhost:5000/api/login", data)
        .then(function(res){
            console.log(res.data);
            if (res.data != (-1+"")) {
                console.log("Redirecting");
                window.location="/home";
            }
        })
        .catch(err => console.log(err.data))
    }

    return (
        <CardPanel className="box-dim hoverable">
            <div class="overlay input-dim">
            <Row>
                <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item  className="icon-margin">
                    <AccountCircle required fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="username" variant="standard" label="Username" fullWidth required helperText="" onChange={(e) => setForm({ password: form.password, username: e.target.value})} />
                </Grid>
                </Grid>
            </Row>
            <Row className="gap" />
            <Row>
                <Grid container spacing={2} alignItems="flex-end" justify="center">
                <Grid item  className="icon-margin">
                    <Lock required fontSize="large"  className="icon-color"/>
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="password" variant="standard" label="Password" fullWidth required helperText="" onChange={(e) => setForm({ password: e.target.value, username: form.username})}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row>
            <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button variant="contained" className="btn-color" onClick={(e) => submitLogin(e, form.username, form.password)} > Log In </Button>
                {button}
            </Grid>
            </Row>
            </div>
        </CardPanel>
    );
}

function LoginButton(props) {
    return (
        <Button variant="contained" className="btn-color btn-pad" onClick={props.onClick}>
            Register
        </Button>
    );
}

function RegisterButton(props) {
    return (
        <Button variant="contained" className="btn-color btn-pad" onClick={props.onClick}>
            Login
        </Button>
    );
}

function CurrentBox(props) {
    const isregisterclicked = props.isregisterclicked;
    const button = props.button;
    if (isregisterclicked) {
        return <RegisterBox button={button}/>
    } else {
        return <LoginBox button={button}/>
    }
}

class LandingBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isregisterclicked: false};
        this.LoginBox_handler = this.LoginBox_handler.bind(this);
        this.RegisterBox_handler = this.RegisterBox_handler.bind(this);
    }

    
    LoginBox_handler() {
        this.setState({isregisterclicked : false});
    }

    RegisterBox_handler() {
        this.setState({isregisterclicked : true});
    }

    render() {
        const isregisterclicked = this.state.isregisterclicked;
        let button;

        if (isregisterclicked) {
            button = <RegisterButton onClick={this.LoginBox_handler} />
        } else {
            button = <LoginButton onClick={this.RegisterBox_handler} /> 
        }

        return (
            <div>
                <CurrentBox isregisterclicked={isregisterclicked} button={button} />
            </div>
        )
    }
}

export default LandingBox;