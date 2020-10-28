import React from 'react';
import './LandingBox.css';
import {Row, CardPanel} from 'react-materialize'
import {Email, AccountCircle, Lock, CheckCircle} from '@material-ui/icons';
import {TextField, Grid, Button} from '@material-ui/core';
import data from '../data/test.json';

function RegisterBox(props) {
    const button = props.button;
    return (
        <CardPanel className="box-dim hoverable">
            <div class="overlay input-dim">
            <Row>
                <Grid container spacing={2} alignItems="stretch" direction="row" alignContent="center" justify="center">
                <Grid item className="icon-margin">
                    <Email fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="email" variant="standard" label="Email" fullWidth required helperText="" />
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
                    <TextField id="username" variant="standard" label="Username" fullWidth required helperText="" />
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
                    <TextField id="password" variant="standard" label="Password" fullWidth required helperText="" />
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
                    <TextField id="confirmpassword" variant="standard" label="Confirm Password" fullWidth required helperText=""/>
                </Grid>
                </Grid>
            </Row>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row>
            <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button variant="contained" className="btn-color" onClick={props.onClick}> Register </Button>
                {button}
            </Grid>
            </Row>
            </div>
        </CardPanel>
    );
}


function confirm_password_handler() {
    console.log(document.getElementById('confirm_password').value);
    if (document.getElementById('confirm_password').value !== document.getElementById('password').value) {
        document.getElementById("confirm_password").classList.remove("valid");
        document.getElementById("confirm_password").classList.add("invalid");
    } else {
        document.getElementById("confirm_password").classList.remove("invalid");
        document.getElementById("confirm_password").classList.add("valid");
    }
}


function LoginBox(props) {
    const button = props.button;
    return (
        <CardPanel className="box-dim hoverable">
            <div class="overlay input-dim">
            <Row>
                <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item  className="icon-margin">
                    <AccountCircle required fontSize="large" className="icon-color" />
                </Grid>
                <Grid item xs={5} xl={5} sm={5} md={5} lg={5}>
                    <TextField id="username" variant="standard" label="Username" fullWidth required helperText="" />
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
                    <TextField id="password" variant="standard" label="Password" fullWidth required helperText="" />
                </Grid>
                </Grid>
            </Row>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row className="gap"/>
            <Row>
            <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Button variant="contained" className="btn-color" onClick={props.onClick}> Log In </Button>
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