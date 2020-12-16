import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import { HomeContext } from "./Home";
import {
  getPlaylistSongs,
  updatePlaylist,
} from "../DataManipulation/PlaylistREST";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SongDisplay from "./SongDisplay";
import Modal from "react-modal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Tune } from "@material-ui/icons";

Modal.setAppElement("#root");

function PlayListView(props) {
  const { state, actions } = useContext(HomeContext);
  const { playlistID } = useParams();
  const history = useHistory();
<<<<<<< HEAD
  let {url} = useRouteMatch();
  let sharepath = "https://among-the-beat-sbu.herokuapp.com/home/share/" + url.substr(15);
=======
  let { url } = useRouteMatch();
  let sharepath = "http://localhost:3000/home/share/" + url.substr(15);
>>>>>>> master

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [disableTitle, setdisableTitle] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const playlistTitle = useRef(null);

  const [totalLength, setTotalLength] = useState("0");

  const [currSongs, setCurrSongs] = useState();
  const [currSongIDS, setCurrSongIDS] = useState(
    state.currentPlaylist.songs_ids
  );

  // THIS IS FOR GETTING INITIAL PLAYLIST TITLE

  useLayoutEffect(() => {
    if (state.currentPlaylist.playlist_name === undefined) {
      history.push("/home");
    }
    setPlaylistName(state.currentPlaylist.playlist_name);
  }, [playlistID]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await getPlaylistSongs(playlistID);
      setTotalLength(getTrackLength(response.data));
      setCurrSongs(response.data);
    };
    fetchSongs();
  }, [state.playlists]);

  useEffect(() => {
    return () => {
      setModalIsOpen(false);
      setdisableTitle(false);
      setTotalLength("0");
      setCurrSongs(null);
      setCurrSongIDS(null);
    };
  }, []);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const getTrackLength = (arr) => {
    let totalsecs = 0;
    for (var i = 0; i < arr.length; i++) {
      let x = arr[i];
      let y = x.time.split(":");
      let secs = +y[0] * 60 + +y[1];
      totalsecs += secs;
    }
    totalsecs *= 1000;

    var seconds = Math.floor((totalsecs / 1000) % 60),
      minutes = Math.floor((totalsecs / (1000 * 60)) % 60),
      hours = Math.floor((totalsecs / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const dClick = () => {
    setdisableTitle(false);
    playlistTitle.current.focus();
  };

  const handleOnChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const saveTitle = (e) => {
    setdisableTitle(true);
    // playlistTitle.current = e.target.value;
    actions.editPlaylists(playlistID, e.target.value);
    console.log(e.target.value);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = currSongs;
    const [reordereditem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordereditem);

    let newsong_ids = currSongIDS;
    const [reordersong] = newsong_ids.splice(result.source.index, 1);
    newsong_ids.splice(result.destination.index, 0, reordersong);

    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < newsong_ids.length; j++) {
        if (items[i]._id === newsong_ids[j].song_id) {
          newsong_ids[j].order = i;
        }
      }
    }
    newsong_ids.sort(function (a, b) {
      return a.order - b.order;
    });

    let pid = playlistID + "";
    updatePlaylist(pid, newsong_ids).then((res) => {
      setCurrSongs(items);
      setCurrSongIDS(newsong_ids);
    });
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    // console.log(id);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledDiv>
      <span>
        <div onDoubleClick={dClick}>
          {state.currentPlaylist ? (
            <PlayListTitle
              ref={playlistTitle}
              type="text"
              readOnly={disableTitle}
              onChange={handleOnChange}
              value={playlistName}
              spellCheck={false}
              onBlur={saveTitle}
            />
          ) : (
            <div></div>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Test"
          style={customStyles}
        >
          <ModalHeader>Copy This Link To Share!</ModalHeader>
          <ModalContent>{sharepath}</ModalContent>
        </Modal>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              actions.deletePlaylists(playlistID);
              history.push("/home");
            }}
          >
            Confirm
          </MenuItem>
          <MenuItem onClick={() => handleClose()}>Cancel</MenuItem>
        </Menu>

        <StyledButton
          variant="contained"
          disableElevation
          onClick={() => toggleModal()}
        >
          Share
        </StyledButton>
        <StyledTrash
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => handleClick(e)}
        />
        <h6 id="timestamp">{totalLength}</h6>
        <h6>
          {state.currentPlaylist.songs_ids &&
            state.currentPlaylist.songs_ids.length + " "}
          {state.currentPlaylist.songs_ids &&
            (state.currentPlaylist.songs_ids.length === 1 ? "Song" : "Songs")}
        </h6>
      </span>
      <span>
        <hr />
      </span>

      <SongDiv>
        {currSongs ? (
          <DragDropContext onDragEnd={(res) => handleOnDragEnd(res)}>
            <Droppable droppableId="songs">
              {(provided) => (
                <div
                  id="inside"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currSongs.map(
                    (
                      { song_name, artist_name, _id, SpotifyURI, time },
                      index
                    ) => {
                      return (
                        <Draggable key={_id} draggableId={_id} index={index}>
                          {(provided) => (
                            <CustomP
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            >
                              <SongDisplay
                                name={song_name}
                                artist={artist_name}
                                id={_id}
                                playlist_id={playlistID}
                                uri={SpotifyURI}
                                time={time}
                                playlist={currSongs}
                                type="Playlists"
                              />
                            </CustomP>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>Loading...</p>
        )}
      </SongDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem;
  margin-right: 1rem;

  & span {
    display: flex;
    align-items: center;
  }

  & span hr {
    width: 100%;
    color: white;
    background-color: white;
  }

  & h1 {
    padding-right: 2rem;
    color: white;
    font-weight: bold;
  }

  & #timestamp {
    font-weight: normal;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  & h6 {
    color: white;
  }
`;

const SongDiv = styled.div`
  min-height: 200px;
  max-height: 65vh;
  height: 90%;
  overflow-y: auto;
`;

const StyledSpan = styled.span`
  margin-left: 5.5em;
  margin-right: auto;
  margin-top: 1em;
  margin-bottom: -1em;
  display: inline-grid;
  width: 43%;
  grid-template-columns: auto auto;
  justify-content: space-between;
  grid-column-gap: 3em;
`;

const Artist = styled.h6`
  grid-column-start: 3;
  grid-row-end: 3;
`;

const Title = styled.h6`
  grid-column-start: 1;
  grid-row-end: 1;
`;

const CustomP = styled.div`
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-bottom: 0rem;
`;

const StyledTrash = styled(TrashIcon)`
  margin-left: 1rem;
  color: ${"white"}; 

  &:hover {
    color: ${"blue"};
  }
}
`;

const StyledButton = styled(Button)`
  &&& {
    margin-left: 2rem;
    max-height: 2rem;
  }
`;

const PlayListTitle = styled.input`
  background: transparent;
  border: none;
  border-width: 0;
  box-shadow: none;
  color: white;
  height: auto;
  width: auto;
  font-size: 2rem;
  font-weight: bold;
  outline: none;

  // &:hover,
  // &:focus {
  //   opacity: 0.8;
  // }
`;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transform: "translate(-40%, -10%)",
    background:
      "linear-gradient(160deg, rgba(49,22,101,1) 59%, rgba(127,60,142,1) 100%)",
    color: "white",
  },
};

const ModalHeader = styled.div`
  font-size: 24px;
  padding-bottom: 2em;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ModalContent = styled.div`
  font-size: 15px;
  padding-bottom: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background-color: #686868;
  }
`;

export default PlayListView;
