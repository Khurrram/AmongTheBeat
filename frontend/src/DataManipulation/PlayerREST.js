import axios from 'axios'
import { getSessionCookie } from '../CookieHandler'

const session = getSessionCookie();

export const playSong = async (uri) => {
    console.log("uri :" + uri);
    fetch("https://api.spotify.com/v1/me/player/play?" +
    "device_id=" + session.deviceID, {
    method: 'PUT',
    body: JSON.stringify({uris: [uri]}),
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${session.accessToken}`
    }}).then((ev) => {
        console.log("playing song");
    }).catch((error) => {
        console.log(error);
        // ...
    })
  };

export const pauseSong = async () => {
    fetch("https://api.spotify.com/v1/me/player/pause?" +
    "device_id=" + session.deviceID, {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${session.accessToken}`
    }}).then((ev) => {
        console.log("pause song");
    }).catch((error) => {
        console.log(error);
        // ...
    })
}