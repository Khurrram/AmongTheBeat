import React, {useEffect} from 'react';

import styled from 'styled-components'
import Song from '../Homepage/Song';


import './Playlists.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import PlayListView from '../Homepage/PlayListView';

const SongDiv = styled.div`
    min-height: 65vh;
    max-height: 65vh;
    overflow-y: auto;
`

function Playlists(props) {

    return (
<<<<<<< HEAD
        <div className="playlists">
=======
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
                        <StyledSearh placeholder= 'Search User'></StyledSearh>
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
                    <Link to = "/settings"><StyledSettingIcon id="margin"/></Link>
                    
                </Navbar>
                <MiddleContent>
>>>>>>> 73914921f8055945d853a8b941361e14c4a1d28f
                <PlayListView
                name = {props.name}
                ></PlayListView>
                <SongDiv>
                    <div id = "inside" >
                    {props.songs.map((song) => 
                    {
                        return(
                            <Song 
                            name  = {song.name}
                            artist = {song.author}
                            type = "Playlists"
                            />
                        );
                    })}
                    </div>
                </SongDiv>
        </div>
    );
}

export default Playlists

