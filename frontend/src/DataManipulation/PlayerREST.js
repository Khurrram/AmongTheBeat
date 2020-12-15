import axios from "axios";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import {addHistory} from "./AccountREST";
import Queue from "queue-fifo";
import { useState } from "react";
import { instance } from "./AccountREST";

const session = getSessionCookie();
var deviceID = "";
const songQueue = new Queue();
var currentSong = "";
var currentIndex = -1;
var currentPlaylist = [];
var currentPos = 0;
var currentVolume = 50;
var repeat = false;
var finished = true;
var queuedSongs = false;
var shuffle = false;
var setPlayNav;


window.onSpotifyWebPlaybackSDKReady = () => {
  console.log("SDK Callback");
  const session = getSessionCookie();
  const token = session.accessToken;
  const player = new window.Spotify.Player({
    name: "AmongTheBeat Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.25,
  });

  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener("player_state_changed", (state) => {
    if (
      state.paused &&
      state.position === 0 &&
      state.restrictions.disallow_resuming_reasons && // finished?
      state.restrictions.disallow_resuming_reasons[0] === "not_paused" &&
      finished
    ) {
      finished = false;
      setTimeout(function () {
        //needs a timeout because two consecutive calls when song finishes
        finished = true;
        finishedSong();
      }, 1000);
    }

    if (state) {
      setSong(state.track_window.current_track);
    }

    if (
      state.paused &&
      state.restrictions.disallow_pausing_reasons &&
      state.restrictions.disallow_pausing_reasons[0] === "already_paused"
    ) {
      currentPos = state.position;
    }
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    deviceID = device_id;
    console.log(deviceID);
    // setSessionCookie({ id: session.id, username: session.username, accessToken: session.accessToken, deviceID: device_id});
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  console.log("player connected");
  player.connect();
};

export const finishedSong = () => {
  //finished song function calls playNextSong in queue
  if (finished) {
    console.log("finished song");
    playNextSong();
  }
};

const playSong = async (uri) => {
  //should set previous song
  currentSong = uri;
  if (!queuedSongs) {
    get_currentSong(uri);
  }
  currentPos = 0;
  addHistory_wrapper();
  fetch(
    "https://api.spotify.com/v1/me/player/play?" + "device_id=" + deviceID,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      changeVolume(currentVolume)
    })
    .catch((error) => {
      console.log(error);
      // ...
    });
};

const get_currentSong = (uri) => {
  let index = -1;
  for (let i = 0; i < currentPlaylist.length; i++) {
    if (currentPlaylist[i].SpotifyURI == uri) {
      index = i;
      break;
    }
  }
  if (index == -1 ){
    console.log("Song not found in get_currentSong ERROR!")
  } else {
    currentIndex = index;
  }
}

export const loadPlaylist = (playlist, uri) => {
  // loads playlist to playlistQueue
  currentPlaylist = playlist;
  playSong(uri);
};

export const resumeSong = async () => {
  //resumes song
  fetch(
    "https://api.spotify.com/v1/me/player/play?" + "device_id=" + deviceID,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [currentSong], position_ms: currentPos }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      console.log("resuming song");
    })
    .catch((error) => {
      console.log(error);
      // ...
    });
};

export const buttonClicked = (playlist, uri) => {
    if (currentPlaylist != playlist) { // check if in the same playlist, if it is don't load playlist; if not, load in new playlist
      loadPlaylist(playlist, uri);
    } else {
      if (currentSong != uri) { // check if a new song is being played in the current playlist
        playSong(uri);
      } else {
        resumeSong(); //if not new song, resume at currentPos
      }
    }
  return "song_played";
};

export const pauseSong = async () => {
  fetch(
    "https://api.spotify.com/v1/me/player/pause?" + "device_id=" + deviceID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      console.log("pause song: " + ev);
    })
    .catch((error) => {
      console.log(error);
      // ...
    });
  return "song_paused";
};

export const changeVolume = async(volume) =>
{
  fetch(
    "https://api.spotify.com/v1/me/player/volume?" + "volume_percent=" + volume.toString()  + "&device_id=" + deviceID,
    {
      method: "PUT",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      }
    }
  )
    .then((ev) =>
    {
      currentVolume = volume
    }).catch((err) =>
    {
      console.log("changeVolume ERR");
    })
}

export const playbackInfo = async() =>
{

  return axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      }
    }
    )
    .then((res) =>
    {
      return res.data
    }).catch((err) =>
    {
      console.log("changeVolume ERR");
    })
}

export const setTime = async(time) =>
{
  fetch(
    "https://api.spotify.com/v1/me/player/seek?" + "position_ms=" + time.toString()  + "&device_id=" + deviceID,
    {
      method: "PUT",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      }
    }
  )
    .then((ev) =>
    {
      console.log("set time to ", time, " ms");
    }).catch((err) =>
    {
      console.log("changeVolume ERR");
    })
}

export const playNextSong = () => {
  //play next song, dequeue either playlistqueue or songqueue before calling playSong
  if (repeat) {
    playSong(currentSong);
  } else {
    if (songQueue.isEmpty()) {
        queuedSongs = false;
      if (shuffle) { //shuffle is toggled, play any song from the playlist
        playSong(currentPlaylist[getRndInteger(0, currentPlaylist.length)].SpotifyURI);
      } else {
        if (currentIndex == currentPlaylist.length - 1) {
          console.log("Nothing left to play in playlist");
        } else {
          playSong(currentPlaylist[currentIndex+1].SpotifyURI);
          console.log("Playing next song in playlistQueue");
        }
      }
    } else {
      playSong(songQueue.dequeue().uri);
      console.log("Playing next song in Song Queue");
    }
  }
};
export const playPrevSong = () => {
  //play previous song
  if (repeat) {
    playSong(currentSong);
  } else {
    if (shuffle) {
      playSong(currentPlaylist[getRndInteger(0, currentPlaylist.length)].SpotifyURI);
    } else {
      if (currentIndex == 0) {
        console.log("No Previous Song");
      } else {
        playSong(currentPlaylist[currentIndex-1].SpotifyURI);
        console.log("Now playing previous song");
      }
    }
  }
};

export const repeatSong = () => {
  //toggle repeat song
  repeat = true;
};

export const noRepeatSong = () => {
  //toggle repeat song
  repeat = false;
};

export const queueSong = (track) => {
  //add songs to the SongQueue
  songQueue.enqueue(track);
  queuedSongs = true;
  console.log("queued next song");
};

export const setSong = (track) => {
  setPlayNav(track);
};

export const setSongFunction = (func) => {
  setPlayNav = func;
};

export const shuffleSong = () => {
  shuffle = true;
}

export const noShuffleSong = () => {
  shuffle = false;
}

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const addHistory_wrapper = () => {
  let accountID = session.id;
  let songname = currentPlaylist[currentIndex].song_name;
  let artistname = currentPlaylist[currentIndex].artist_name;
  let uri = currentSong;
  let time = currentPlaylist[currentIndex].time
  addHistory(accountID,songname,artistname,uri, time);
}

export const getQueue = () => {
  let queue = [];
  for (let i = 0; i < songQueue.size(); i++) {
    let temp = songQueue.dequeue();
    console.log (" song queue : " + temp.song_name)
    queue.push(temp);
    songQueue.enqueue(temp);
  }
  return queue;
}