import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Admin.css';

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { ButtonBase } from '@material-ui/core';

const Button = styled.button`
    padding: .5em;
    color: Black;
    border-radius: 10px;
    margin: .5em;
    width: 15%;
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: light-grey;
`

function Admin()
{
    return(
        <div id = "Admin" className = "fullscreen-container">
            <div id = "atxt">
                Admin
            </div>

            <div id = "bu">
                <Button>Ban User</Button>
                <Button>Unban User</Button>
                <Button>Edit User</Button>
            </div>

            
        </div>
    );
}

export default Admin;