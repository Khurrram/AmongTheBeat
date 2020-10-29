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
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: light-grey;
`

const CenterDiv = styled.div`
    heigh: 100vh;
    width: 100vw;
    background:linear-gradient(rgb(46, 0, 48),transparent);
    background-color:rgb(77, 77, 75);
    display: flex;
    align-items: center;
    justify-content: center;
}

`

function Admin()
{
    return(
        <CenterDiv className = "fullscreen-container">
            <div id = "atxt">
                Admin
            </div>

            <div >
                <Button>Ban User</Button>
                <Button>Unban User</Button>
                <Button>Edit User</Button>
            </div>

            
        </CenterDiv>
    );
}

export default Admin;