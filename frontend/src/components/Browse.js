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

function Browse(props)
{
        return (
            <div className="browse">
                <BrowseView></BrowseView>
                <SongDiv>
                    <div id = "inside" >
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