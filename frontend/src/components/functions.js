import axios from 'axios';

export const getToken = (code, client_id, client_secret, redirect_uri) => {
    return axios({
        method: 'post',
        url:'https://accounts.spotify.com/api/token',
        params: {
            grant_type :'authorization_code',
            code,
            redirect_uri: redirect_uri,
            client_id: client_id,
            client_secret: client_secret
        }
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    }).then(token => {
        return token;
    }).catch(e=> {
        return e.response;
    });
};