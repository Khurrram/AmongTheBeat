import React from 'react';
import { getToken} from './functions';
import { useHistory } from "react-router-dom";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import axios from "axios";



function RedirectPage(props) {
    const session = getSessionCookie();
    let history = useHistory();

    console.log(window.location.href);
    const accessToken =  
        window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});

    console.log(accessToken.access_token);
    setSessionCookie({ id: session.id, username: session.username, accessToken: accessToken.access_token})
    console.log(session);
    window.location.href = "/home";
    // history.push('/home');
    return null;
}
  
  export default RedirectPage;
/*
http://localhost:3000/redirect?code=AQAkNexbhcSnI4hCNgVxMlBiO_7BwLYheh4CYZKo4fAKSPGFbhV_Aq0sQd0Rywz3izYHVWMiKREAVW0R4Q5Q9wdoY-8I_LR8N0ll9JttWy95xCMHf437om1AGzFiYHuCKF05bs40_GpNzNuWEFcIQdbJ0M5FsdWwYQNboPBntvIp3_Q9M3iEGMZnCKQ6CjldXXx_TD871ys2TzcEorOhBVSjG_7BOYvXJ5f7CZIdhKi42ICeYN1OEeOUWS_hbnyPSJL0nY7sNvaunzNCJTdoNp4xgytE8vU4d13T3cnQm5WRiZqBPoLfcKXGWYlNp_sN3-VxwON9phgnRV-USQ91Gh9_yhJEQb7oRMONukNsmAlh5i5-0Y-_chWqoBM86MtI5CzhITl5uHVdO2H4Hg2_zx13QHTrq0A
*/
