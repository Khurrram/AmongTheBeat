import { useState, useEffect, useCallback, useReducer } from "react";
import { playlistsReducer, actionTypes } from "./Reducers";
import {
  addSongToPlaylist,
  getPlaylistSongs,
  removeSongFromPlaylist,
  getValidSongPlaylists,
} from "./PlaylistREST";

const useSongs = (playlistID) => {
  let id = playlistID;
  const [songs, setSongs] = useState([]);

  const addSongToPlaylistID = (songURI) => {
    addSongToPlaylist(id, songURI).then(() => {
      getPlaylistSongs(id).then((response) => {
        setSongs(response.data);
      });
    });
  };

  const removeSongFromPlaylistID = (songURI) => {
    removeSongFromPlaylist(id, songURI).then(() => {
      getPlaylistSongs(id).then((response) => {
        setSongs(response.data);
      });
    });
  };

  const getValidPlaylists = (userID, songName, artistName, uri) => {
    getValidSongPlaylists(userID, songName, artistName, uri).then((res) => {
      return res.data;
    });
  };

  const getPlaylistIDSongs = () => {
    getPlaylistSongs(id).then((response) => {
      setSongs(response.data);
    });
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await getPlaylistSongs(id);
      setSongs(response.data);
    };
    fetchSongs();
  }, [playlistID]);

  return {
    songs,
    addSongToPlaylistID,
    removeSongFromPlaylistID,
    getPlaylistIDSongs,
  };
};

export default useSongs;
