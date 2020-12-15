import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { SessionContext } from "../App";
import { getHistory} from "../DataManipulation/AccountREST";
import {getAudioFeatures} from "../DataManipulation/BrowseREST"
import moodboard from "../data/MoodBoard.json";
import Sketch from "react-p5";
import randomColor from "randomcolor";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import MoodSketch from "./Canvas";

function HomeDashView(props) {
  const session = useContext(SessionContext);
  const [songs, setSongs] = useState();
  const [mood, setMood] = useState();
  const [quote, setQuote] = useState("");
  const [audioFeature, setAudioFeature] = useState();

  const moodRef = useRef(mood);
  const quoteRef = useRef(quote);

  //func that takes only the ID part of the URI
  const getSongIDS = (arr) => {
    const result = [];
    for (var i = 0; i < arr.length; i++) {
      let x = arr[i].SpotifyURI;
      result.push(x.substring(14));
    }
    return result;
  };

  const tallyMood = (arr) => {
    let moodstally = [0, 0, 0, 0, 0, 0]; //an element for each moood (6 total moods)

    for (var i = 0; i < arr.length; i++) {
      let mood = arr[i];
      switch (mood) {
        case "Jolly":
          moodstally[0] += 1;
          break;
        case "Melancholy":
          moodstally[1] += 1;
          break;
        case "Inspired":
          moodstally[2] += 1;
          break;
        case "Energized":
          moodstally[3] += 1;
          break;
        case "Relaxed":
          moodstally[4] += 1;
          break;
        case "Flirty":
          moodstally[5] += 1;
          break;
      }
    }

    let maxTally = moodstally.indexOf(Math.max(...moodstally)); //get the index of the mood with the most tallies
    return maxTally;
  };

  const closestMood = (song) => {
    let danceability = 0,
      speechiness = 0,
      acousticness = 0,
      liveness = 0;
    let moodarr = [];

    for (
      var i = 0;
      i < moodboard.moods.length;
      i++ //for each mood
    ) {
      let mood = moodboard.moods[i];
      danceability = Math.abs(mood.danceability - song.danceability); //find the absolute diff between each core audio feature and that of the song being analyzed
      speechiness = Math.abs(mood.speechiness - song.speechiness);
      acousticness = Math.abs(mood.acousticness - song.acousticness);
      liveness = Math.abs(mood.liveness - song.liveness);
      moodarr.push([danceability, speechiness, acousticness, liveness]); //push that into an array
    }

    let mindance = [moodarr[0][0], ""],
      minspeech = [moodarr[0][1], ""],
      minact = [moodarr[0][2], ""],
      minlive = [moodarr[0][3], ""]; //default the values
    for (var j = 0; j < moodarr.length; j++) {
      let song = moodarr[j];
      if (song[0] <= mindance[0]) {
        //if the songs danceability is less than the current minimum danceability
        mindance[0] = song[0]; //change the current minimum danceability to the one of song
        mindance[1] = moodboard.moods[j].type; //set which mood this danceability came from
      }
      if (song[1] <= minspeech[0]) {
        //for speechiness
        minspeech[0] = song[1];
        minspeech[1] = moodboard.moods[j].type;
      }
      if (song[2] <= minact[0]) {
        //for acousticness
        minact[0] = song[2];
        minact[1] = moodboard.moods[j].type;
      }
      if (song[3] <= minlive[0]) {
        //for liveness
        minlive[0] = song[3];
        minlive[1] = moodboard.moods[j].type;
      }
    }

    let tallyindex = tallyMood([
      mindance[1],
      minspeech[1],
      minact[1],
      minlive[1],
    ]); //tallyMood takes in the mood

    return moodboard.moods[tallyindex].type;
  };

  const getMood = (tracks) => {
    let mood = [];
    for (var i = 0; i < tracks.audio_features.length; i++) {
      let song = tracks.audio_features[i];
      mood.push(closestMood(song));
    }

    let finalmoodindex = tallyMood(mood);

    quoteRef.current =
      moodboard.moods[finalmoodindex].quotes[Math.floor(Math.random() * 10)];
    setQuote(quoteRef.current); //select a random quote from that specific mood
    return moodboard.moods[finalmoodindex].type;
  };

  useEffect(() => {
    getHistory(session.id).then((res) => {
      //takes history of songs and returns songs
      //if there is no songs in history it returns an empty array
      if (res.length !== 0) {
        //res contains songs from songModel
        setSongs(res);
        let songIDS = getSongIDS(res);

        //get the audio features of the songs
        getAudioFeatures(songIDS).then((res) => {
          //res contains audio features
          moodRef.current = getMood(res);
          setAudioFeature(res.audio_features);
          setMood(moodRef.current);
        });
      }
    });
  }, []);

  //mood and quote loaded for you here already
  return (
    <StyledDiv>
      <h1>Dashboard</h1>
      <MarginLeftDiv>
        {/* {mood && <h3>Mood: {mood}</h3>}
        {
          quote && <div>{quote}</div>
          //Might also go here if there is nothing in the history array; maybe add like a screen thats says "You currently have no played songs"
          //"Listen to some songs to see some data!" //or something like that
        } */}
        {mood && quote ? (
          <div>
            <h3>Mood: {mood}</h3>
            <MarginLeftDiv>{quote}</MarginLeftDiv>
          </div>
        ) : (
          <div>
            <h4 className="red">
              You do not have any recorded Songs. Listen to some songs to see
              your calculated data.
            </h4>
          </div>
        )}
        {audioFeature && <MoodSketch trackFeatures={audioFeature} />}
      </MarginLeftDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  margin-right: 1rem;
  color: white;
  height: 100%;
  width: 100%;

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
    color: white;
    font-weight: bold;
  }

  & h3 {
    color: white;
  }

  &:#red {
    color: red;
  }
`;

const MarginLeftDiv = styled.div`
  margin-left: 1rem;
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

const SongDiv = styled.div`
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 0.5em;
  color: white;
  border: none;
  margin: 0.5em;
  width: 5%;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  background-color: Transparent;
`;

export default HomeDashView;
