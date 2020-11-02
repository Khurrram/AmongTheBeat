import React, {useEffect} from 'react';

import styled from 'styled-components'
import Song from '../Homepage/Song';
import test from '../data/test.json';


import './Browse.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import BrowseView from '../Homepage/BrowseView';
import { PlayCircleFilledWhite } from '@material-ui/icons';

const SongDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 65vh;
    overflow-y: auto;
`

<<<<<<< HEAD
function Browse(props)
{
        return (
            <div className="browse">
                <BrowseView></BrowseView>
                <SongDiv>
                    <div id = "inside" >
=======
const StyledSettingIcon = styled(SettingsIcon)`
    color: white;
`

const StyledSearch = styled(SearchBar)`
    max-height: 2em;
    margin-left: 1em;
    margin-right: 1em;
`

function Browse(props)
{
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
                            Browse
                        </MenuItem>
                        <StyledSearch
                            placeholder= 'Search User'
                        />

                    </Menu>
                    <hr width="90%" color="black"></hr>
                    <Menu>
                        <MenuItem id="fontlarge">Playlists</MenuItem>
                        {test.playlists.map((playlist) => 
>>>>>>> 73914921f8055945d853a8b941361e14c4a1d28f
                        {
                            test.songs.map((song) =>
                            {
                                return (
                                    <Song 
                                    name  = {song.name}
                                    artist = {song.author}
                                    Browse
                                    />
                                );
                            })
                        }
                    </div>
                </SongDiv>
            </div>
        );
}

export default Browse