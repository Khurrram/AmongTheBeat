import React from 'react';
import { getSessionCookie, setSessionCookie } from "../CookieHandler";

function RedirectPage() {
    const session = getSessionCookie();

    const accessToken =  
        window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});

    setSessionCookie({ id: session.id, username: session.username, accessToken: accessToken.access_token})
    window.location.href = "/home";
    return null;
}
  
export default RedirectPage;
