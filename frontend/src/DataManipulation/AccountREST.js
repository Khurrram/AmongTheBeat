import axios from "axios";
// const userModel = require("../../../models/userModel.js");

export const instance = axios.create({ baseURL: "http://localhost:5000" });

export const getToken = async (accountID) => {
  return instance
    .post("/api/getToken", { _id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("GetToken Error");
    });
};

export const checkPassword = async (
  accountID,
  currentPassword,
  newPassword
) => {
  return instance
    .post("/api/user/checkpass", {
      id: accountID,
      oldpass: currentPassword,
      newPassword: newPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("checkPassword Error");
    });
};

export const changePassword = async (
  accountID,
  currentPassword,
  newPassword
) => {
  return instance
    .post("/api/user/changepass", {
      id: accountID,
      oldpass: currentPassword,
      newPassword: newPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("changePassword Error");
    });
};

export const getUsername = async (accountID) => {
  return instance
    .post("/api/user/getusername", { id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("changePassword Error");
    });
};

export const browse = async( accessToken) =>
{
  return instance
    .post("/api/browse", {curraccessToken: accessToken})
}

export const searchTracks = async (search, accessToken) => {
  return instance
    .post("/api/searchTracks", 
    {
      search: search,
      curraccessToken: accessToken
    }).then((res) => {
      return res.data
    }).catch((err) => console.log("searchTracks ERR"));

}

export const getLikedSongs = async(accountID) =>
 {
   return instance
    .post("/api/user/likedsongs",
    {
      id: accountID
    }).then((res) =>
    {
      return res.data;
    }).catch((err) => console.log("getLikedSongs ERR"));
 }
 
export const findLikedSong = async(accountID, uri) =>
{
  return instance
    .post("/api/user/findlikedsong",
    {
      accountID: accountID,
      uri: uri
    }).then((res) =>
    {
      return res.data;
    }).catch((err) => console.log("findLikedSongs ERR"));
}

export const addLikedSong = async(accountID, name, artist, uri) =>
{
  return instance
    .post("/api/user/addlikedsong",
    {
      accountID: accountID,
      song_name: name,
      artist_name: artist,
      uri: uri
    }).then((res) =>
    {
      return res.data;
    }).catch((err) => console.log("addLikedSongs ERR"));
}

export const removeLikedSong = async(accountID, uri) =>
{
  return instance
    .post("/api/user/removelikedsong",
    {
      accountID: accountID,
      uri: uri
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("removeLikedSong ERR"))
}

export const openAlbum = async(playlistID, accessToken) =>
{
  return instance
      .post("/api/openalbum", 
      {
        id: playlistID,
        curraccessToken: accessToken
      }).then((res) =>
      {
        return res.data
      }).catch((err) => console.log("openAlbum ERR"));
}

export const getHistory = async(accountID) =>
{
  return instance
    .post("/api/user/gethistory",
    {accountID: accountID
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("getHistory ERR"));
}

export const getAudioFeatures = async(accessToken, tracks) =>
{
  return instance
    .post("/api/user/audiofeatures",
    {
      accessToken: accessToken,
      tracks: tracks
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("getAudioFeatures ERR"));
}

export const ban = async(ID) =>
{
  return instance
    .post("/api/user/ban", 
    {
      id: ID
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("Ban ERR"));
    
}
export const unban = async(ID) =>
{
  return instance
    .post("/api/user/unban", 
    {
      id: ID
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("Unban ERR"));
    
}
export const remove = async(ID) =>
{
  return instance
    .post("/api/user/remove", 
    {
      id: ID
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("Remove ERR"));
    
}

export const usersList = async(accountType) =>
{
  return instance
    .post("/api/usersList",
    {
      accountType: accountType
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("usersList ERR"));
}

export const checkAdmin = async(id) =>
{
  return instance
    .post("/api/checkAdmin",
    {
      id:id
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("checkAdmin ERR"))
}
 
export const addHistory = (accountID, song_name, artist_name, uri) => {
  console.log("song name: " + song_name);
  console.log("artist name: " + artist_name);
  return instance
    .post("/api/user/addHistory",
    {
      accountID: accountID,
      song_name: song_name,
      artist_name: artist_name,
      uri: uri
    }).then((res) =>
    {
      return res.data;
    }).catch((err) => console.log("addHistory error"));
}
