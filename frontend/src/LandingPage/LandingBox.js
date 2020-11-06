import React, { useState } from 'react';
import './LandingBox.css';
import {Row, CardPanel} from 'react-materialize'
import {Email, AccountCircle, Lock, CheckCircle, FiberNew} from '@material-ui/icons';
import {TextField, Grid, Button} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


function RegisterBox(props) {
    const button = props.button;
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    });
    
    return (
        <CardPanel className="box-dim hoverable">
            <div class="overlay input-dim">
            <Row>
                <Grid container spacing={2} alignItems="stretch" direction="row" alignContent="center" justify="center">
                <Grid item className="icon-margin">
                    <Email fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="email" variant="standard" label="Email" fullWidth required helperText="" onChange={(e) => setForm({
                        email: e.target.value, password: form.password, username: form.username, confirm_password: form.confirm_password
                    })}/>
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
                    <TextField id="username" variant="standard" label="Username" fullWidth required helperText="" onChange={(e) => setForm({ email: form.email, password: form.password, username: e.target.value, confirm_password: form.confirm_password })}/>
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
                    <TextField id="password" variant="standard" label="Password" fullWidth required helperText="" onChange={(e) => setForm({ email: form.email, password: e.target.value, username: form.username, confirm_password: form.confirm_password  })}/>
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
                    <TextField id="confirmpassword" variant="standard" label="Confirm Password" fullWidth required helperText="" onChange={(e) => setForm({ email: form.email, password: form.password, username: form.username, confirm_password: e.target.value })}/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row>
            <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button variant="contained" className="btn-color" onClick={(e) => submitRegistration(e, form.email,form.username,form.password)}> Register </Button>
                {button}
            </Grid>
            </Row>
            </div>
        </CardPanel>
    );
}

function submitRegistration(e, email,username,password) {
    e.preventDefault();
    let data = {email, username, password};
    let response;

    axios.post("http://localhost:5000/api/register", data)
        .then(function(res){
            console.log(res.data);
            if (res.data != (-1+"")) {
                console.log("Redirecting");
                window.location="/home";
            }
        })
        .catch(err => console.log(err.data))
    

    // axios.get("http://localhost:5000/api/register")
    //     .then(res => console.log(res.data));
}

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

function LoginBox(props) {
    const button = props.button;
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

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
    const isloginclicked = props.isloginclicked;
    const button = props.button;
    if (isloginclicked) {
        return <LoginBox button={button}/>
    } else {
        return <RegisterBox button={button}/>
    }
}

class LandingBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isloginclicked: false};
        this.LoginBox_handler = this.LoginBox_handler.bind(this);
        this.RegisterBox_handler = this.RegisterBox_handler.bind(this);
    }

    
    LoginBox_handler() {
        this.setState({isloginclicked : false});
    }

    RegisterBox_handler() {
        this.setState({isloginclicked : true});
    }

    render() {
        const isloginclicked = this.state.isloginclicked;
        let button;

        if (isloginclicked) {
            button = <LoginButton onClick={this.LoginBox_handler} />
        } else {
            button = <RegisterButton onClick={this.RegisterBox_handler} /> 
        }

        return (
            <div>
                <CurrentBox isloginclicked={isloginclicked} button={button} />
            </div>
        )
    }
}

export default LandingBox;