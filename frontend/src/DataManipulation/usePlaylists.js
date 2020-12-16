import { useState, useEffect, useCallback, useReducer } from "react";
import { playlistsReducer, actionTypes } from "./Reducers";
import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getValidSongPlaylists,
} from "./PlaylistREST";

const initalPlaylistState = {
  playlists: [],
};

const usePlaylists = (userID) => {
  const id = userID;
  const [state, dispatch] = useReducer(playlistsReducer, initalPlaylistState);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [actionCounter, setActionCounter] = useState(0);

  const createPlaylists = () => {
    createPlaylist(id).then(() => {
      getPlaylists(id).then((response) => {
        setPlaylists(response.data);
      });
    });
  };
  const deletePlaylists = (playlistID) => {
    deletePlaylist(playlistID, id).then(() => {
      getPlaylists(id).then((response) => {
        setPlaylists(response.data);
      });
    });
  };
  const editPlaylists = (playlistID, newName) => {
    editPlaylist(playlistID, newName).then(() => {
      getPlaylists(id).then((response) => {
        setPlaylists(response.data);
      });
    });
  };

  const addSongToPlaylistID = (playlistID, songURI) => {
    addSongToPlaylist(playlistID, songURI).then(() => {
      getPlaylists(id).then((response) => {
        setPlaylists(response.data);
      });
    });
  };

  const removeSongFromPlaylistID = (playlistID, songURI) => {
    removeSongFromPlaylist(playlistID, songURI).then(() => {
      getPlaylists(id).then((response) => {
        setPlaylists(response.data);
      });
    });
  };

  const getValidPlaylists = (userID, songName, artistName, uri) => {
    getValidSongPlaylists(userID, songName, artistName, uri).then((res) => {
      return res.data;
    });
  };

  const changeCurrentPlaylistView = (playlistID) => {
    let playlist = playlists.find((obj) => {
      return obj._id === playlistID;
    });
    setCurrentPlaylist(playlist);

    getPlaylists(id).then((response) => {
      setPlaylists(response.data);
    });

    // console.log(currentPlaylist);
  };

  const rerender = () => {
    getPlaylists(id).then((response) => {
      setPlaylists(response.data);
    });
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await getPlaylists(id);
      setPlaylists(response.data);
    };
    fetchPlaylists();
    // console.log("useplaylists");
    // console.log(playlists);
  }, []);

  return {
    playlists,
    currentPlaylist,
    createPlaylists,
    deletePlaylists,
    editPlaylists,
    changeCurrentPlaylistView,
    removeSongFromPlaylistID,
    addSongToPlaylistID,
    getValidPlaylists,
    rerender,
  };
};

export default usePlaylists;
