import React from 'react';

import styled from 'styled-components'
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar'
import PlayingNow from '../components/PlayingNow'

import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

const Button = styled.button`
    padding: .5em;
    color: Black;
    border-radius: 10px;
    margin: .5em;
    width: 100%;
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: light-grey;
`

function Home() {

    const history = useHistory();

    const moodChange = () => 
    {
        let path = '/mood';
        history.push(path);
    }

    return (
        <div className="homepage">
            <ProSidebar>
                <SidebarHeader>
                    <div id="center">
                        <img id="placeholder" alt="logo"></img>
                    </div>
                </SidebarHeader>
                <SidebarContent >
                    <Menu>
                        <MenuItem id="fontsize">Browse</MenuItem>
                        <MenuItem id="fontsize">Search</MenuItem>
                    </Menu>
                    <hr width="90%" color="black"></hr>
                    <Menu>
                        <MenuItem id="fontlarge">PlayLists</MenuItem>
                        <MenuItem>Beast Mode</MenuItem>
                        <MenuItem>Good Vibes</MenuItem>
                        <MenuItem>WAP Caviar</MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter id="center">
                    <Button
                    onClick = {moodChange}
                    >Happy</Button>
                </SidebarFooter>
                
            </ProSidebar>
            <div>
                <h2>content</h2>    
            </div>
        </div>
    );
}


export default Home;