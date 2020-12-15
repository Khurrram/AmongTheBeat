import axios from "axios";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";

const session = getSessionCookie();

export const browse = async() =>
{
    return axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists?limit=20",
        {
            method: "GET",
            headers:
            {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`
            }
        }
        )
        .then((res) =>
        {
            return res
        }).catch((err) =>
        {
            console.log("browse ERR");
        })
}

export const openAlbum = async(playlistID) =>
{
    return axios.get(
        "https://api.spotify.com/v1/playlists/" + playlistID.toString(),
        {
            method: "GET",
            headers:
            {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`
            }
        }
        )
        .then((res) =>
        {
            return res.data
        }).catch((err) =>
        {
            console.log("openAlbum ERR");
        })
}

export const searchTracks = async (search) => {
    return axios.get(
        "https://api.spotify.com/v1/search?q=" + search.toString() + "&type=track",
        {
            method: "GET",
            headers:
            {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`
            }
        }
        )
        .then((res) =>
        {
            return res.data
        }).catch((err) =>
        {
            console.log("searchTracks ERR");
        })
}

export const getAudioFeatures = async(tracks) =>
{
    let str = ""
    for(var i = 0; i < tracks.length; i++)
    {
        str += tracks[i].toString() + "%2C";
    }
    return axios.get(
        "https://api.spotify.com/v1/audio-features?ids=" + str,
        {
            method: "GET",
            headers:
            {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`
            }
        }
        )
        .then((res) =>
        {
            return res.data
        }).catch((err) =>
        {
            console.log("getAudioFeatures ERR");
        })
}



