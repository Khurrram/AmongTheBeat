import React from 'react';

import styled from 'styled-components'
import logo from '../assets/logo.png'
import {Image} from 'react-bootstrap'
import Song from '../Homepage/Song';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar'
import { NavLink, Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import PlayingNow from '../components/PlayingNow'
import test from '../data/test.json';
import Browse from '../components/Browse';
import TextField from '@material-ui/core/TextField';

import './Playlists.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import PlayListView from '../Homepage/PlayListView';

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
    order: 2;
    margin-top:auto;
    padding: 1em;
    background-color: black;
`
const MiddleContent = styled.div`
    order: 1;
`

const SongDiv = styled.div`
    min-height: 65vh;
    max-height: 65vh;
    overflow-y: auto;
`

function Playlists(props) {

    const history = useHistory();
    let l = useLocation();

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
                                songs:test.songs
                            }
                        }}>Browse</Link>
                        </MenuItem>
                        <MenuItem id="fontsize"><TextField id = "search" label = "Search" variant = "outlined" defaultValue = "" color = "white"/></MenuItem>
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
                    <Link to = "/settings"><SettingsIcon id="margin"/></Link>
                    
                </Navbar>
                <MiddleContent>
                <PlayListView
                name = {l.state.name}
                ></PlayListView>
                <SongDiv>
                    <div id = "inside" >
                    {l.state.songs.map((song) => 
                    {
                        return(
                            <Song 
                            name  = {song.name}
                            artist = {song.author}
                            />
                        );
                    })}
                    </div>
                </SongDiv>
                
                </MiddleContent>
                <Footer>
                   123222
                </Footer>
            </ContentWindow>
        </div>
    );
}

export default Playlists

