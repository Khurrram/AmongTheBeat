import React, {useState} from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import test from './testdata.json'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import PlayListView from '../Homepage/PlayListView';
import Song from '../Homepage/Song';


const SongDiv = styled.div`
    min-height: 65vh;
    max-height: 65vh;
    overflow-y: auto;
`

const CenterDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CenterPanel = styled.div`
  color: white;
  display: flex;
  height: 50vh;
  justify-content: center;
  background: linear-gradient(rgb(46, 0, 48), transparent);
  background-color: rgb(77, 77, 75);
`;

function Testdrag()
{
    const [updatedsongs, updateSongs] = useState(test.songs);

    function handleOnDragEnd(result)
    {
        console.log(result);
        if (!result.destination) return;
        const items = Array.from(updatedsongs);
        const [reordereditem] = items.splice(result.source.index,1);
        items.splice(result.destination.index, 0 , reordereditem);

        updateSongs(items);
    }


    return(
        <CenterDiv>
            <CenterPanel>
                        <SongDiv> 
                            <DragDropContext onDragEnd = {handleOnDragEnd}>
                                <Droppable droppableId = "songs">
                                {( provided) => (
                                <div id = "inside" {...provided.droppableProps} ref = {provided.innerRef}>
                                {updatedsongs.map(({name,author}, index) => 
                                {
                                    return(
                                        <Draggable key = {name} draggableId = {name} index = {index}>
                                            {(provided) => (
                                            <li
                                            {...provided.draggableProps}
                                            ref = {provided.innerRef}
                                            {...provided.dragHandleProps}
                                            >
                                            <Song 
                                            name  = {name}
                                            artist = {author}
                                            type = "Playlists"
                                            />
                                            </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </div>
                                )}
                                </Droppable>
                            </DragDropContext>
                        </SongDiv>

            </CenterPanel>
        </CenterDiv>

    );

}




export default Testdrag;