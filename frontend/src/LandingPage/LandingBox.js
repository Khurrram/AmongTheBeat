import React from 'react';
import M from "materialize-css";
import './LandingBox.css';
// import 'materialize-css/dist/css/materialize.min.css';
import {Email, AccountCircle, Lock, CheckCircle} from '@material-ui/icons';

function RegisterBox(props) {
    const button = props.button;
    return (
        <div class="card box-dim hoverable">
            <div class="overlay input-dim">
            <div class="row">
            <div class="input-field input-size">
                {/* <i class="large material-icons prefix">{Email}</i> */}
                <Email className="prefix"/>
                <input id="email" type="email" class="validate" required="" aria-required="true"/>
                <label htmlFor="email">Email</label>
                <span class="helper-text" data-error="Enter a valid email." ></span>
            </div>
            </div>
            <div class="row">
                <div class="input-field input-size">
                <AccountCircle className="prefix"/>
                <input id="username" type="text" class="validate" />
                <label htmlFor="username">Username</label>
                <span class="helper-text" data-error="Enter a valid username." ></span>
                </div>
            </div>
            <div class="row">
                <div class="input-field input-size">
                <Lock className="prefix"/>
                <input id="password" type="password" class="validate" />
                <label htmlFor="password">Password</label>
                <span class="helper-text" data-error="Enter a valid password." ></span>
                </div>
            </div>
            <div class="row">
                <div class="input-field input-size">
                <CheckCircle className="prefix"/>
                <input id="confirm_password" type="password" class="validate" onChange={confirm_password_handler} />
                <label id="confirm_password_label" htmlFor="confirm_password">Confirm Password</label>
                <span class="helper-text" data-error="Passwords do not match." ></span>
                </div>
            </div>
            <div class="input-field input-size center-align">
            <button class="btn waves-effect waves-light btn-color pulse" type="submit" name="action">Register</button>
                {button}
            </div>
            </div>
        </div>
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
        <div class="card box-dim hoverable">
            <div class="overlay input-dim">
            <div class="row">
                <div class="input-field center-align input-size">
                <AccountCircle className="prefix"/>
                <input id="username" type="text" class="validate" />
                <label htmlFor="username">Username</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field center-align input-size">
                <Lock className="prefix"/>
                <input id="password" type="password" class="validate" />
                <label htmlFor="password">Password</label>
                </div>
            </div>
            <div class="input-field col s12 center-align">
                <button class="btn waves-effect waves-light btn-color pulse" type="submit" name="action">Log In</button>
                {button}
            </div>
            </div>
        </div>
    );
}

function LoginButton(props) {
    return (
        <button class="btn waves-effect waves-light btn-color btn-pad" type="submit" name="action" onClick={props.onClick}>
            Register
            {console.log(props.onClick)}
        </button>
    );
}

function RegisterButton(props) {
    return (
        <button class="btn waves-effect waves-light btn-color btn-pad" type="submit" name="action" onClick={props.onClick}>
            Login
        </button>
    )
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

    componentDidMount() {
        M.updateTextFields();
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