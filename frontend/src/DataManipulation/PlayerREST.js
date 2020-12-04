import axios from "axios";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import Queue from "queue-fifo";
import { useState } from "react";

const session = getSessionCookie();
var deviceID = "";
const playlistQueue = new Queue();
const songQueue = new Queue();
var currentSong = "";
var currentPos = 0;
var previousSong = "";
var repeat = false;
var finished = true;
var setPlayNav;
// export const setDeviceID = (deviceID) => {
//     setSessionCookie({ id: session.id, username: session.username, accessToken: session.accessToken, deviceID: deviceID});
// }

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
    console.log(state);
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
  currentPos = 0;
  console.log("currentsong uri :" + uri);
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
      console.log("playing song");
    })
    .catch((error) => {
      console.log(error);
      // ...
    });
};

export const loadPlaylist = (playlist, uri) => {
  // loads playlist to playlistQueue
  console.log("loadPlaylist: " + playlist[0].SpotifyURI);
  console.log("currentSong: " + uri);
  let index = -1;
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].SpotifyURI == uri) {
      index = i;
      break;
    }
  }
  playlistQueue.clear();
  if (index != -1) {
    for (let i = index; i < playlist.length; i++) {
      playlistQueue.enqueue(playlist[i].SpotifyURI);
    }
    playSong(playlistQueue.dequeue());
  }
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
  console.log("button clicked :" + playlist);
  if (uri != currentSong) {
    currentPos = 0;
  }
  if (playlist === undefined) {
    playSong(uri);
    console.log("playlist undefined");
  } else {
    if (currentPos === 0) {
      loadPlaylist(playlist, uri);
    } else {
      resumeSong();
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

export const playNextSong = () => {
  //play next song, dequeue either playlistqueue or songqueue before calling playSong
  if (repeat) {
    playSong(currentSong);
  } else {
    if (songQueue.isEmpty()) {
      if (playlistQueue.isEmpty()) {
        console.log("Nothing to play");
      } else {
        previousSong = currentSong;
        playSong(playlistQueue.dequeue());
        console.log("Playing next song in playlistQueue");
      }
    } else {
      previousSong = currentSong;
      playSong(songQueue.dequeue());
      console.log("Playing next song in Song Queue");
    }
  }
};
export const playPrevSong = () => {
  //play previous song
  if (repeat) {
    playSong(currentSong);
  } else {
    if (previousSong == "") {
      console.log("No Previous Song");
    } else {
      playSong(previousSong);
      console.log("Now playing previous song");
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

export const queueSong = (uri) => {
  //add songs to the SongQueue
  songQueue.enqueue(uri);
  console.log("queued next song");
};

export const setSong = (song) => {
  setPlayNav(song);
};

export const setSongFunction = (func) => {
  setPlayNav = func;
};
