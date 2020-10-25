import React from 'react';
import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar'
import PlayingNow from '../components/PlayingNow'

import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

function Home() {


    return (
        <div className="homepage">
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem>Dashboard</MenuItem>
                </Menu>
            </ProSidebar>
            <h2>content</h2>
        </div>
    );
}


export default Home;