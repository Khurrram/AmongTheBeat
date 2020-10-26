import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;

`

const SongInfo = styled.div`
    display: flex;
    margin-right: auto;

`

const SongAction = styled.div`
    display: flex;
    margin-left: auto;
    
`


function Song() {
    
    return (
        <Container>
            <SongInfo>

            </SongInfo>
        </Container>
    );
}

export default Song;