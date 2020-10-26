import React from 'react';

import styled from 'styled-components'
import logo from '../assets/logo.png'
import {Image} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
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

const ContentWindow = styled.div`
    padding: 1.5em 0em 0em 0em;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: stretch;
    background-color: white;
`

const Navbar = styled.div`
    order: 0;
    display: flex;
    flex-direction: row-reverse;
    padding: 1em;
    padding-right: 8em;
    align-items: center;
`

const Footer = styled.div`
    order: 2;
    margin-top:auto;
    padding: 1em;
    background-color: black;
`

const MiddleContent = styled.div`
    order: 1;
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
                        <Image id='img' src={logo} fluid/>
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
            <ContentWindow>
                <Navbar>
                    <Avatar className="AvatarIcon">J</Avatar>
                    <SettingsIcon id="margin"/>
                    
                </Navbar>
                <MiddleContent>

                </MiddleContent>
                <Footer>
                   123222
                </Footer>
            </ContentWindow>
        </div>
    );
}


export default Home;