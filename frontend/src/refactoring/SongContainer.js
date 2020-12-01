import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { HomeContext } from "./Home";
import SongDisplay from "./SongComponent";

function SongContainer(props) {
  const { state, actions } = useContext(HomeContext);
  return (
    <DragDropContext onDragEnd={(res) => actions.handleOnDragEnd(res)}>
      <Droppable droppableId="songs">
        {(provided) => (
          <div id="inside" {...provided.droppableProps} ref={provided.innerRef}>
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
                        <SongDisplay
                          name={song_name}
                          artist={artist_name}
                          id={_id}
                          playlist_id={"TEST"}
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
  );
}

const CustomP = styled.p`
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-bottom: 0rem;
`;

export default SongContainer;
