import React from 'react';
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import axios from 'axios';
import querystring from 'querystring';

function RedirectPage() {
    const session = getSessionCookie();

    const code =  
        // window.location.hash
        // .substring(1)
        // .split('&')
        // .reduce((initial, item) => {
        //     let parts = item.split('=');
        //     initial[parts[0]] = decodeURIComponent(parts[1]);
        //     return initial;
        // }, {});
        window.location.href.split('=')[1];

    const redirect_uri = 'http://localhost:3000/redirect';
    const url = 'https://accounts.spotify.com/api/token';
    const client_id = "6e6168bb4f424095b42f948f1e303b69";
    const client_secret = 'd0083b4ff5b743f5888468fe02c2ba9c';

    // setSessionCookie({ id: session.id, username: session.username, accessToken: accessToken.access_token});
    console.log(code);
    let data = {grant_type: "authorization_code" ,code: code, redirect_uri: "http://localhost:3000/redirect", client_id: '6e6168bb4f424095b42f948f1e303b69', client_secret: 'd0083b4ff5b743f5888468fe02c2ba9c'};

    // fetch(
    //     "https://accounts.spotify.com/api/token",
    //     {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: {
    //         'Content-Type':'application/x-www-form-urlencoded'
    //       },
    //     }
    //   )
    //     .then((ev) => {
    //       console.log(ev);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // ...
    //     });

        // axios({
        //     url: 'https://accounts.spotify.com/api/token',
        //     method: 'post',
        //     params: {
        //       grant_type: 'authorization_code',
        //       code: code,
        //       redirect_uri: redirect_uri
        //     },
        //     headers: {
        //       'Accept':'application/json',
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     auth: {
        //       username: '6e6168bb4f424095b42f948f1e303b69',
        //       password: 'd0083b4ff5b743f5888468fe02c2ba9c'
        //     }
        //   }).then(function(response) {
        //       console.log(response);
        //   }).catch(function(error) {
        //   });
        axios.post('https://accounts.spotify.com/api/token',querystring.stringify({ grant_type: 'authorization_code', code: code, redirect_uri: redirect_uri }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) }, })
        .then(res => { 
            console.log(res);
            setSessionCookie({ id: session.id, username: session.username, accessToken: res.data.access_token, refresh_token: res.data.refresh_token}); 
            window.location.href = "/home";   
        })
        .catch(error => { console.log(error) })
    return null;
}
  
export default RedirectPage;
