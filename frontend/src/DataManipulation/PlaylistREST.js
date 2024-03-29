import { instance } from "./AccountREST";

export const getPlaylistSongs = async (playlistID) => {
  return instance
    .post("api/playlist/getplaylistsongs", { id: playlistID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("getPlaylistSongs Error");
    });
};

export const getOwner = async (username) => 
{
  return instance
    .post("/api/playlist/getowner", {username: username})
    .then((res) => {
      return res;
    })
    .catch((err) => {console.log("getOwner Error")})
}

export const getPlaylistOwner = async(playlistID) =>
{
  return instance
    .post("/api/playlist/getplaylistowner",
    {
      id: playlistID
    }).then((res) =>
    {
      return res.data
    }).catch((err) => console.log("getPlaylistOwner ERR"));
}

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
  console.log("rest");
  console.log(playlistID);
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

export const getPlaylists = async (accountID) => {
  return instance
    .post("/api/playlist/getplaylists", { id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("getPlaylists Error");
    });
};

export const getValidSongPlaylists = async (
  accountID,
  songName,
  artistName,
  uri,
  time
) => {
  return instance
    .post("/api/song/getplaylists", {
      id: accountID,
      song_name: songName,
      artist_name: artistName,
      uri: uri,
      time: time
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("getValidSongPlaylists Error");
    });
};

export const addSongToPlaylist = async (playlistID, uri) => {
  return instance
    .post("/api/song/addtoplaylist", {
      id: playlistID,
      song_uri: uri,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("addSongToPlaylist Error");
    });
};

export const removeSongFromPlaylist = async (playlistID, song) => {
  return instance
    .post("/api/song/removefromplaylist", {
      id: playlistID,
      song: song,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("removeSongFromPlaylist Error");
    });
};

export const deletePlaylist = async (playlistID, accountID) => {
  return instance
    .post("/api/playlist/delete", {
      id: playlistID,
      owner: accountID,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("deletePlaylist Error");
    });
};

export const updatePlaylist = async(playlistID, song_ids) => 
{
  return instance
    .post("/api/song/updateplaylist",
    {
      playlistID: playlistID,
      song_ids: song_ids
    })
    .then((res) =>
    {
      return res.data;
    })
    .catch((err) => {console.log("updatePlaylist Error")});
}

export const forkPlaylist = async(ownerID, playlist) =>
{
  return instance
    .post("/api/playlist/forkplaylist",
    {
      id: ownerID,
      playlist: playlist
    })
    .then((res) =>
    {
      return res.data
    })
    .catch((err) => {console.log("forkPlaylist ERR")})
}
