import { useState, useEffect, useCallback, useReducer } from "react";
import { playlistsReducer, actionTypes } from "./Reducers";
import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylists,
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

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await getPlaylists(id);
      setPlaylists(response.data);
    };
    fetchPlaylists();
    // console.log("useplaylists");
    // console.log(playlists);
  }, []);

  const handleOnDragEnd = (result) => {
    // if (!result.destination) return;
    // const items = currentsongs;
    // const [reordereditem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reordereditem);
    // console.log("Items now: ", items);
    // let newids = [];
    // for (var i = 0; i < items.length; i++) {
    //   newids.push(items[i]._id + "");
    // }
    // let pid = currentplaylist._id + "";
    // let data = { id: pid, upsongs: newids };
    // axios
    //   .post("http://localhost:5000/api/song/updateplaylist", data)
    //   .then(function (res) {
    //     console.log("Updated list: ", res.data);
    //     // setPlaylist(res.data);
    //     // setSongs(items);
    //     // setPage(1);
    //   })
    //   .catch((err) => console.log(err));
  };

  return {
    playlists,
    currentPlaylist,
    createPlaylists,
    deletePlaylists,
    editPlaylists,
    changeCurrentPlaylistView,
  };
};

export default usePlaylists;
