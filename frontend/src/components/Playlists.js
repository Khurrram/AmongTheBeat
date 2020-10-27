import React from 'react';

import test from '../data/test.json';
import Song from '../Homepage/Song';

import './Playlists.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import {useLocation} from 'react-router-dom';

function Playlists(props) {

    return(

        <div id = "inside" >
            {props.name}


            {props.songs.map((song) => 
            {
                return(

                    <Song 
                    name  = {song.name}
                    />
                );
            })}

        </div>

    );
}

export default Playlists

