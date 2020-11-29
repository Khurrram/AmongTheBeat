import axios from "axios";
const userModel = require("../../../models/userModel.js");

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

export const getPlaylistSongs = async (playlistID) => {
  return instance
    .post("/api/playlist/getsongs", { id: playlistID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("getPlaylistSongs Error");
    });
};
