import React from 'react';
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import axios from 'axios';
import querystring from 'querystring';

function RedirectPage() {
    const session = getSessionCookie();

    const code = window.location.href.split('=')[1];

    const redirect_uri = "https://among-the-beat-sbu.herokuapp.com/redirect";
    const url = 'https://accounts.spotify.com/api/token';
    const client_id = "6e6168bb4f424095b42f948f1e303b69";
    const client_secret = 'd0083b4ff5b743f5888468fe02c2ba9c';

    console.log(code);

        axios.post('https://accounts.spotify.com/api/token',querystring.stringify({ grant_type: 'authorization_code', code: code, redirect_uri: redirect_uri }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) }, })
        .then(res => { 
            console.log(res);
            setSessionCookie({ id: session.id, username: session.username, accessToken: res.data.access_token, refresh_token: res.data.refresh_token, expires_in: res.data.expires_in}); 
            window.location.href = "/home";   
        })
        .catch(error => { console.log(error) });
    return null;
}
  
export default RedirectPage;
