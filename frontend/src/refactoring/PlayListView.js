import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function PlayListView(props) {
  // const { state, actions } = useContext(ViewPage);
  const [disableTitle, setdisableTitle] = useState(false);
  const playlistTitle = useRef("");
  let DEFAULT_VALUE = "DEFAULT";

  const click = () => {
    setdisableTitle(false);
    playlistTitle.current.focus();
  };

  const saveTitle = (e) => {
    setdisableTitle(true);
    playlistTitle.current = e.target.value;
    console.log(e.target.value);
  };

  return (
    <StyledDiv>
      <span>
        <div onDoubleClick={click}>
          <PlayListTitle
            ref={playlistTitle}
            type="text"
            readOnly={disableTitle}
            defaultValue={DEFAULT_VALUE}
            spellCheck={false}
            onBlur={saveTitle}
          ></PlayListTitle>
        </div>

        <StyledButton variant="contained" disableElevation onClick={click}>
          Share
        </StyledButton>
        <StyledTrash />
        <h6 id="timestamp">{DEFAULT_VALUE}</h6>
        <h6>
          {/* {state.currentsongs.length + " "} */}
          Songs
        </h6>
      </span>
      <StyledSpan>
        <Title>Title</Title>
        <Artist>Artist</Artist>
      </StyledSpan>
      <span>
        <hr />
      </span>
      <SongDiv>
        {/* <DragDropContext onDragEnd={(res) => props.handleOnDragEnd(res)}>
          <Droppable droppableId="songs">
            {(provided) => (
              <div
                id="inside"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.currentsongs.map(
                  ({ song_name, artist_name, _id }, index) => {
                    return (
                      <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided) => (
                          <CustomP
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
                            <Song
                              name={song_name}
                              artist={artist_name}
                              id={_id}
                              playlist_id={id}
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
        </DragDropContext> */}
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
  min-height: 65vh;
  max-height: 65vh;
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

const CustomP = styled.p`
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-bottom: 0rem;
`;

const StyledTrash = styled(TrashIcon)`
  margin-left: 1rem;
  color: white;
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

export default PlayListView;
