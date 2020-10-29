import React from 'react';

import styled from 'styled-components'
import logo from '../assets/logo.png'
import {Image} from 'react-bootstrap'
import Song from './Song';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar'
import {Link, useHistory} from 'react-router-dom';
import PlayingNow from '../components/PlayingNow'
import PlayListView from './PlayListView';
import BrowseView from "./BrowseView";
import test from '../data/test.json';
import Playlists from '../components/Playlists';
import Browse from '../components/Browse';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SearchBar from 'material-ui-search-bar';
import RepeatIcon from '@material-ui/icons/Repeat';


import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';


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
    background:linear-gradient(rgb(46, 0, 48),transparent);
    background-color:rgb(77, 77, 75);
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
    display: flex;
    align-items: center;
    order: 2;
    margin-top:auto;
    padding-left: 1em;
    height: 7%;
    background-color: black;

    & span {
        color: white;
        margin-left: 1.5em;
    }

    &.right {
        margin-left: auto;
        margin-right: 2em;
    }
`

const MiddleContent = styled.div`
    order: 1;
`

const StyledSearh = styled(SearchBar)`
    max-height: 2em;
    margin-left: 1em;
    margin-right: 1em;
`


function Home() {

    const history = useHistory();

    const moodChange = () => 
    {
        let path = '/mood';
        history.push(path);
    };

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
                        <MenuItem id="fontsize">
                            <Link to = {{
                                pathname: "/browse",
                                state:
                                {
                                    songs:test.songsgit 
                                }
                            }}>Browse</Link>
                        </MenuItem>
                        <StyledSearh></StyledSearh>
                    </Menu>
                    <hr width="90%" color="black"></hr>
                    <Menu>
                        <MenuItem id="fontlarge">Playlists</MenuItem>
                        {test.playlists.map((playlist) => 
                        {
                            let path = "/playlist/" + playlist.name;
                            return(
                                <MenuItem>
                                    <Link to = 
                                    {{pathname: path,
                                        state:
                                        {
                                            name: playlist.name,
                                            songs: playlist.songs
                                        }
                                    }}> {playlist.name} </Link>
                                </MenuItem>);
                        })}
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
                    <BrowseView username="Joshua 'THE DANIEL' Canta" />
                    <Song 
                        name = "Jousha road trip"
                        playlist 
                        Browse
                        />
                </MiddleContent>
                <Footer>
                    <Avatar variant="rounded">
                        D
                    </Avatar>
                    <span>
                        Rogue - Air
                    </span>
                    <span>
                        <PlayIcon></PlayIcon>
                    </span>
                    <span id="right">
                        <PlaylistAddIcon></PlaylistAddIcon>
                    </span>
                    <span>
                        
                    </span>
                </Footer>
            </ContentWindow>
        </div>
    );
}


export default Home;