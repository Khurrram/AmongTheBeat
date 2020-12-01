import { useState, useEffect, useCallback, useReducer } from "react";
import { playlistsReducer, actionTypes } from "./Reducers";
import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylists,
  updatePlaylistSongs,
} from "./PlaylistREST";
import axios from "axios";

// const initalPlaylistState = {
//   playlists: [],
// };

const usePlaylists = (userID) => {
  const id = userID;
  // const [state, dispatch] = useReducer(playlistsReducer, initalPlaylistState);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({});

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

  const changeCurrentPlaylistView = (playlistID) => {
    if (playlistID == -1) {
      setCurrentPlaylist({});
    } else {
      let playlist = playlists.find((obj) => {
        return obj._id === playlistID;
      });
      setCurrentPlaylist(playlist);
    }

    getPlaylists(id).then((response) => {
      setPlaylists(response.data);
    });

    // console.log(currentPlaylist);
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

  const handleOnDragEnd = (result, currentSongs) => {
    if (!result.destination) return;
    const items = currentSongs;
    const [reordereditem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordereditem);
    console.log("Items now: ", items);
    let newids = [];
    for (var i = 0; i < items.length; i++) {
      newids.push(items[i]._id + "");
    }
    let pid = currentPlaylist._id + "";
    let data = { id: pid, upsongs: newids };

    updatePlaylistSongs(pid, newids).then((res) => {
      //currentPlaylist(res);
    });
  };

  return {
    playlists,
    currentPlaylist,
    createPlaylists,
    deletePlaylists,
    editPlaylists,
    changeCurrentPlaylistView,
    handleOnDragEnd,
  };
};

export default usePlaylists;
