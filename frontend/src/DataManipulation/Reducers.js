import { createPlaylist } from "./PlaylistREST";

export const actionTypes = {
  createPlaylist: "CREATE_PLAYLIST",
  deletePlaylist: "DELETE_PLAYLIST",
  editPlaylistName: "EDITNAME_PLAYLIST",
};

export const playlistsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.createPlaylist:
      return {
        ...state,
        playlists: action.payload,
      };
    case actionTypes.deletePlaylist:
      return {
        ...state,
        playlists: action.payload,
      };
    case actionTypes.editPlaylistName:
      return {
        ...state,
        playlists: action.payload,
      };

    default:
      return state;
  }
};
