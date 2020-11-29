import { instance } from "./AccountREST";

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

export const createPlaylist = async (accountID) => {
  return instance
    .post("/api/playlist/createPlaylist", { id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("createPlaylist Error");
    });
};

export const editPlaylist = async (playlistID, newPlayListName) => {
  return instance
    .post("/api/playlist/editname", {
      id: playlistID,
      updatedname: newPlayListName,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("editPlaylist Error");
    });
};

export const getPlaylists = async();
