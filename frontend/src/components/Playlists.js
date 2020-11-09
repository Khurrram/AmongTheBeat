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
        <div className="playlists">
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

