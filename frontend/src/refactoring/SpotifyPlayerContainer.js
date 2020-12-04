import Script from 'react-load-script'
import React from 'react'
import { getSessionCookie, setSessionCookie } from '../CookieHandler'

function SpotifyPlayerContainer() {

    return (
        <Script 
            url="https://sdk.scdn.co/spotify-player.js"
        />
    )
}

export default SpotifyPlayerContainer;
