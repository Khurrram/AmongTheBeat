import { useState } from "react";
import axios from "axios";
import { getSessionCookie, setSessionCookie } from "../CookieHandler";
import { addHistory } from "./AccountREST";
import querystring from "querystring";
import Queue from "queue-fifo";
import { SongContext } from "../refactoring/Home";
import { instance } from "./AccountREST";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const session = getSessionCookie();
var deviceID = "";
const songQueue = new Queue();
var currentSong;
var currentIndex = -1;
var currentPlaylist = [];
var currentPos = 0;
var currentVolume = 50;
var repeat = false;
var finished = true;
var queuedSongs = false;
var shuffle = false;
var setPlayNav;
var queueRerenderFunc;
var queueRerenderVal;

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

setInterval(function () {
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: session.refresh_token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(
              "6e6168bb4f424095b42f948f1e303b69" +
                ":" +
                "d0083b4ff5b743f5888468fe02c2ba9c"
            ).toString("base64"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      setSessionCookie({ id: session.id, username: session.username, accessToken: res.data.access_token, refresh_token: session.refresh_token, expires_in: res.data.expires_in});
    })
    .catch((error) => {
      console.log(error);
    });
}, 600000);

export const refreshToken = () => {
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: session.refresh_token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(
              "6e6168bb4f424095b42f948f1e303b69" +
                ":" +
                "d0083b4ff5b743f5888468fe02c2ba9c"
            ).toString("base64"),
        },
      }
    )
    .then((res) => {
      setSessionCookie({ id: session.id, username: session.username, accessToken: res.data.access_token, refresh_token: session.refresh_token, expires_in: res.data.expires_in})
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

const playSong = async (track) => {
  //should set previous song
  currentSong = track;
  if (!queuedSongs) {
    get_currentSong(track.SpotifyURI);
  }

  currentPos = 0;

  addHistory_wrapper();

  fetch(
    "https://api.spotify.com/v1/me/player/play?" + "device_id=" + deviceID,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [track.SpotifyURI] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      changeVolume(currentVolume);
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
  if (index == -1) {
    console.log("Song not found in get_currentSong ERROR!");
  } else {
    currentIndex = index;
  }
};

export const loadPlaylist = (playlist, track) => {
  // loads playlist to playlistQueue
  currentPlaylist = playlist;
  playSong(track);
};

export const resumeSong = async () => {
  //resumes song
  fetch(
    "https://api.spotify.com/v1/me/player/play?" + "device_id=" + deviceID,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [currentSong.SpotifyURI], position_ms: currentPos }),
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

export const buttonClicked = (playlist, track) => {
    if (currentPlaylist != playlist) { // check if in the same playlist, if it is don't load playlist; if not, load in new playlist
      loadPlaylist(playlist, track);
    } else {
      if (currentSong.SpotifyURI != track.SpotifyURI) { // check if a new song is being played in the current playlist
        playSong(track);
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

export const changeVolume = async (volume) => {
  fetch(
    "https://api.spotify.com/v1/me/player/volume?" +
      "volume_percent=" +
      volume.toString() +
      "&device_id=" +
      deviceID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      currentVolume = volume;
    })
    .catch((err) => {
      console.log("changeVolume ERR");
    });
};

export const playbackInfo = async () => {
  return axios
    .get("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("changeVolume ERR");
    });
};

export const setTime = async (time) => {
  fetch(
    "https://api.spotify.com/v1/me/player/seek?" +
      "position_ms=" +
      time.toString() +
      "&device_id=" +
      deviceID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
    .then((ev) => {
      console.log("set time to ", time, " ms");
    })
    .catch((err) => {
      console.log("changeVolume ERR");
    });
};

export const playNextSong = () => {
  //play next song, dequeue either playlistqueue or songqueue before calling playSong
  if (repeat) {
    playSong(currentSong);
    return currentSong.SpotifyURI;
  } else {
    if (songQueue.isEmpty()) {
        queuedSongs = false;
      if (shuffle) { //shuffle is toggled, play any song from the playlist
        let nextSong = currentPlaylist[getRndInteger(0, currentPlaylist.length)];
        playSong(nextSong);
        return nextSong.SpotifyURI;
      } else {
        if (currentIndex == currentPlaylist.length - 1) {
          console.log("Nothing left to play in playlist");
        } else {
          let nextSong = currentPlaylist[currentIndex+1];
          playSong(nextSong);
          return nextSong.SpotifyURI;
        }
      }
    } else {
      let nextSong = songQueue.dequeue();
      if (queueRerenderFunc) {
      queueRerenderFunc(queueRerenderVal+1);
      }
      console.log("Playing next song in Song Queue");
      playSong(nextSong);
      return nextSong.SpotifyURI;
    }
  }
};

export const playPrevSong = () => {
  //play previous song
  if (songQueue.isEmpty()) {
    queuedSongs = false;
  }
  if (repeat) {
    playSong(currentSong);
    return currentSong.SpotifyURI;
  } else {
    if (shuffle) {
      let prevSong = currentPlaylist[getRndInteger(0, currentPlaylist.length)];
      playSong(prevSong);
      return prevSong.SpotifyURI;
    } else {
      if (currentIndex == 0) {
        console.log("No Previous Song");
      } else {
        let prevSong = currentPlaylist[currentIndex-1];
        playSong(prevSong);
        return prevSong.SpotifyURI;
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
  if (!currentSong) {
    console.log("empty currentSong");
    playNextSong();
  }
  console.log("queued next song");
};

export const dequeueSong = (track) => {
  //removes songs from the SongQueue
  let tempBuffer = []
  console.log("dequeueing song: " + track.SpotifyURI);
  while(!songQueue.isEmpty()) {
    let temp = songQueue.dequeue();
    if (temp.SpotifyURI != track.SpotifyURI) {
      tempBuffer.push(temp);
    }
  }

  for (let i = 0; i < tempBuffer.length; i++) {
    songQueue.enqueue(tempBuffer[i]);
  }
};

export const setSong = (track) => {
  setPlayNav(track);
};

export const setSongFunction = (func) => {
  setPlayNav = func;
};

export const QueueRerender = (func, render) => {
  queueRerenderFunc = func;
  queueRerenderVal = render;
};

export const shuffleSong = () => {
  shuffle = true;
};

export const noShuffleSong = () => {
  shuffle = false;
};

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const addHistory_wrapper = () => {
  let accountID = session.id;
  let songname = currentSong.song_name;
  let artistname = currentSong.artist_name;
  let uri = currentSong.SpotifyURI;
  let time = currentSong.time;
  console.log("added to history: " + songname + artistname + uri + time);
  addHistory(accountID,songname,artistname,uri, time);
}

export const getQueue = () => {
  let queue = [];
  for (let i = 0; i < songQueue.size(); i++) {
    let temp = songQueue.dequeue();
    queue.push(temp);
    songQueue.enqueue(temp);
  }
  return queue;
}

