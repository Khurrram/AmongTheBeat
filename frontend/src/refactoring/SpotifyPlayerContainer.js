import Script from 'react-load-script'
import React from 'react'
import { getSessionCookie } from '../CookieHandler'

function SpotifyPlayerContainer() {

    // window.onSpotifyWebPlaybackSDKReady = () => {
    //     console.log("SDK Callback");
    //     // const token = '[My Spotify Web API access token]';
    //     // const player = new Spotify.Player({
    //     //   name: 'Web Playback SDK Quick Start Player',
    //     //   getOAuthToken: cb => { cb(token); }
    //     // });
    // }
  

    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("SDK Callback");
        const session = getSessionCookie();
        const token = session.accessToken;
        const player = new window.Spotify.Player({
            name: 'AmongTheBeat Player',
            getOAuthToken: cb => { cb(token) }
        });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            
        console.log("player connected");
        player.connect();
    }

    return (
        <Script 
            url="https://sdk.scdn.co/spotify-player.js"
            // onLoad={handleScriptLoad}
        />
    )
}

export default SpotifyPlayerContainer;
