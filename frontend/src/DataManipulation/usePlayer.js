import { useState, useEffect } from "react";

const usePlayer = (authToken) => {
  useEffect(() => {
    // window.onSpotifyWebPlaybackSDKReady = () => {
    //   const player = new window.Spotify.Player({
    //     name: "AmongTheBeat Player",
    //     getOAuthToken: (cb) => {
    //       cb(authToken);
    //     },
    //     volume: 0.25,
    //   });
    //   // Error handling
    //   player.addListener("initialization_error", ({ message }) => {
    //     console.error(message);
    //   });
    //   player.addListener("authentication_error", ({ message }) => {
    //     console.error(message);
    //   });
    //   player.addListener("account_error", ({ message }) => {
    //     console.error(message);
    //   });
    //   player.addListener("playback_error", ({ message }) => {
    //     console.error(message);
    //   });
    //   // Playback status updates
    //   player.addListener("player_state_changed", (state) => {
    //     console.log(state);
    //     if (
    //       state.paused &&
    //       state.position === 0 &&
    //       state.restrictions.disallow_resuming_reasons && // finished?
    //       state.restrictions.disallow_resuming_reasons[0] === "not_paused" &&
    //       finished
    //     ) {
    //       finished = false;
    //       setTimeout(function () {
    //         //needs a timeout because two consecutive calls when song finishes
    //         finished = true;
    //         finishedSong();
    //       }, 1000);
    //     }
    //     if (state) {
    //       setSong(state.track_window.current_track);
    //     }
    //     if (
    //       state.paused &&
    //       state.restrictions.disallow_pausing_reasons &&
    //       state.restrictions.disallow_pausing_reasons[0] === "already_paused"
    //     ) {
    //       currentPos = state.position;
    //     }
    //   });
    //   // Ready
    //   player.addListener("ready", ({ device_id }) => {
    //     console.log("Ready with Device ID", device_id);
    //     deviceID = device_id;
    //     console.log(deviceID);
    //     // setSessionCookie({ id: session.id, username: session.username, accessToken: session.accessToken, deviceID: device_id});
    //   });
    //   // Not Ready
    //   player.addListener("not_ready", ({ device_id }) => {
    //     console.log("Device ID has gone offline", device_id);
    //   });
    //   console.log("player connected");
    //   player.connect();
    // };
  });
};

export default usePlayer;
