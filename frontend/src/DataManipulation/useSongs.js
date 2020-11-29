import { useState, useEffect, useCallback, useReducer } from "react";
import { playlistsReducer, actionTypes } from "./Reducers";
import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylists,
} from "./PlaylistREST";

const useSongs = (playlistID) => {
  const id = playlistID;
  const [songs, setSongs] = useState([]);
  const [actionCounter, setActionCounter] = useState(0);
};

export default useSongs;
