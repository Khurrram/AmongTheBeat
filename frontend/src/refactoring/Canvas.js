import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import randomColor from "randomcolor";

const musicHues = [
  "monochrome",
  "blue",
  "green",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
];
const musicKHues = [
  "yellow",
  "yellow",
  "orange",
  "red",
  "red",
  "pink",
  "pink",
  "purple",
  "blue",
  "blue",
  "green",
  "green",
];
const musicLums = [
  "light",
  "bright",
  "bright",
  "bright",
  "light",
  "bright",
  "light",
  "bright",
  "bright",
  "light",
  "bright",
  "light",
];
const keyNames = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
];

let sunColors = [];
let sunSize;
let sunRange;
let sunPos;

var i, j;

let landColors;

let backgroundColor1;
let backgroundColor2;

const X_AXIS = 2;
const Y_AXIS = 1;

let yoff = 0.0;

function stars(p5) {
  p5.noStroke();
  p5.fill(
    randomColor({
      luminosity: "light",
    })
  );
  for (let i = 0; i < p5.width; i += p5.random(10, 100)) {
    // for (let i = 0; i < p5.width; i += 57) {
    for (let j = 0; j < p5.height; j += p5.random(10, 200)) {
      // for (let j = 0; j < p5.height; j += 184) {
      p5.ellipse(i, j, p5.random(1, 4));
    }
  }
}

function makeLand(p5, level, landColor, energy) {
  // mountains based on this openprocessing sketch: https://www.openprocessing.org/sketch/179401
  p5.noStroke();
  p5.fill(landColor);
  p5.stroke(landColor);
  p5.strokeWeight(2);
  p5.noLoop();
  var yInit = (6 * p5.height) / 7; //initial  y
  var repetition = level / 4;
  var yArray = [];
  for (var j = 0; j < 4; j++) {
    yArray[4 - j] = yInit;
    yInit -= repetition / p5.pow(1.2, j);
  }
  var dx = 0;
  // Only two mountains at a time
  for (var j = 1; j < 3; j++) {
    var n1 = p5.random(-p5.height / 2, p5.height / 2);
    var n2 = p5.random(-p5.height / 2, p5.height / 2);
    var n3 = p5.random(2, 4);
    var n4 = p5.map(energy, 0.0, 1.0, 5, 100);
    var n5 = p5.random(-p5.width / 2, p5.width / 2);
    var n6 = p5.map(energy, 0.0, 1.0, 0.15, 3);
    for (var x = 0; x < p5.width; x++) {
      var y = yArray[j];
      y += 10 * j * p5.sin((2 * dx) / j + n1);
      y += n3 * j * p5.sin((5 * dx) / j + n2);
      y += n4 * j * p5.noise((n6 * dx) / j + n5);
      y += 1.7 * j * p5.noise(10 * dx);
      p5.line(x, y, x, p5.height);
      dx += 0.02;
    }
  }
}

function sun(p5) {
  p5.noStroke();
  var sunColor = sunColors[0];
  sunPos = [p5.random(20, p5.width), p5.random(20, p5.height / 2 - 50)];
  for (i = sunSize; i > 0; i -= sunRange) {
    p5.fill(sunColor);
    sunColor = p5.lerpColor(p5.color(sunColor), p5.color(sunColors[1]), 0.25);
    p5.ellipse(sunPos[0], sunPos[1], i);
  }
}

function setGradient(p5, x, y, w, h, c1, c2, axis) {
  p5.noFill();
  if (axis == Y_AXIS) {
    // Top to bottom gradient
    for (var i = y; i <= y + h; i++) {
      var inter = p5.map(i, y, y + h, 0, 1);
      var c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(x, i, x + w, i);
    }
  } else if (axis == X_AXIS) {
    // Left to right gradient
    for (var i = x; i <= x + w; i++) {
      var inter = p5.map(i, x, x + w, 0, 1);
      var c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(i, y, i, y + h);
    }
  }
}

function fade(p5) {
  for (let i = 0; i < p5.height / 3; i++) {
    let alfa = p5.map(i, 0, p5.height / 3, 360, 0);

    p5.strokeWeight(1);
    p5.stroke(200, alfa);
    p5.line(0, i, p5.width, i);
  }
}

function clouds(p5) {
  let begin = p5.random(50); //changes the begin of noise each time

  let i = 0;

  for (let x = 0; x < p5.width; x += 2) {
    let j = 0;

    for (let y = 0; y < p5.height / 3; y += 2) {
      let alfaMax = p5.map(y, 0, p5.height / 4, 520, 0); //the clouds become transparent as they become near to the mountains
      let alfa = p5.noise(begin + i, begin + j);
      alfa = p5.map(alfa, 0.4, 1, 0, alfaMax);

      p5.noStroke();
      p5.fill(222, alfa);
      p5.ellipse(x, y, 2, 2);

      j += 0.06; //increase j faster than i so the clouds look horizontal
    }

    i += 0.01;
  }
}

function frequent(arr1) {
  var mf = 1;
  var m = 0;
  var item;
  for (var i = 0; i < arr1.length; i++) {
    for (var j = i; j < arr1.length; j++) {
      if (arr1[i] == arr1[j]) m++;
      if (mf < m) {
        mf = m;
        item = arr1[i];
      }
    }
    m = 0;
  }
  return item;
}

function MoodSketch(props) {
  const [danceability, setDanceability] = useState(0);
  const [key, setKey] = useState([]);
  const [loudness, setLoudness] = useState(0);
  const [valence, setValence] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [mode, setMode] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [speechiness, setSpeechiness] = useState(0);
  const [acousticness, setAcousticness] = useState(0);
  const [instrumentalness, setInstrumentalness] = useState(0);
  const [liveness, setLiveness] = useState(0);
  const [loading, setLoading] = useState(false);

  function setup(p5, canvasParentRef) {
    let valenceColor = musicHues[Math.round(p5.map(valence, 0.0, 1.0, 0, 7))];

    if (mode == 1) {
      // Major mode --- DAY
      backgroundColor1 = p5.color(
        randomColor({
          hue: valenceColor,
          luminosity: "light",
        })
      );
      backgroundColor2 = p5.color(
        randomColor({
          luminosity: "light",
        })
      );
      // Large yellow sun
      sunColors = randomColor({
        hue: "yellow",
        count: 2,
      });
      sunSize = p5.random(200, 300);
      sunRange = p5.random(20, 50);
      // document.getElementById("daynighttime").innerText = "daytime";
      // document.getElementById("mode").innerText = "major";
    } else if (mode == 0) {
      // Minor mode --- NIGHT
      backgroundColor1 = p5.color(
        randomColor({
          hue: valenceColor,
          luminosity: "dark",
        })
      );
      backgroundColor2 = p5.color(
        randomColor({
          luminosity: "dark",
        })
      );
      // Small monochrome moon
      sunColors = randomColor({
        luminosity: "light",
        hue: "monochrome",
        count: 2,
      });
      sunSize = p5.random(75, 150);
      sunRange = p5.random(5, 10);
      // document.getElementById("daynighttime").innerText = "nighttime";
      // document.getElementById("mode").innerText = "minor";
    }

    let currentHue = musicKHues[key];
    let currentLum = musicLums[key];

    landColors = randomColor({
      hue: currentHue,
      luminosity: currentLum,
      count: 5,
      format: "rgba",
      alpha: 0.5,
    });

    p5.createCanvas(900, 500).parent(canvasParentRef);
    sunColors = randomColor({
      hue: "yellow",
      count: 2,
    });
    sunSize = p5.random(200, 300);
    sunRange = p5.random(20, 50);
    p5.noLoop();
    // p5.frameRate(30);
    setGradient(p5, 0, 0, 900, 500, backgroundColor1, backgroundColor2, Y_AXIS);
  }

  function draw(p5) {
    if (mode === 0) stars(p5);
    console.log(mode);
    sun(p5);
    fade(p5);
    clouds(p5);
    makeLand(p5, p5.height / 2, landColors[0], energy);
    // p5.fill(255);
    // p5.stroke(1);
    // // //We are going to draw a polygon out of the wave points
    // p5.beginShape();

    // let xoff = 0; // Option #1: 2D Noise
    // // let xoff = yoff; // Option #2: 1D Noise
    // for (let j = 0; j < 3; j++) {
    //   let offsety = j * 85;
    //   // Iterate over horizontal pixels
    //   for (let x = 0; x <= p5.width; x += 10) {
    //     // Calculate a y value according to noise, map to

    //     // Option #1: 2D Noise
    //     let y = p5.map(
    //       p5.noise(xoff, yoff),
    //       0,
    //       1,
    //       200 + offsety,
    //       300 + offsety
    //     );

    //     // Option #2: 1D Noise
    //     // let y = map(noise(xoff), 0, 1, 200,300);

    //     // Set the vertex
    //     p5.vertex(x, y + 50);
    //     // Increment x dimension for noise
    //     xoff += 0.1;
    //   }
    //   // increment y dimension for noise
    //   yoff += 0.01;
    //   p5.vertex(p5.width, p5.height);
    //   p5.vertex(0, p5.height);
    //   p5.endShape();
    // }
  }

  useEffect(() => {
    setLoading(false);
    props.trackFeatures.forEach(function (p1, p2, p3) {
      setDanceability((prev) => prev + p1.danceability);
      setKey((prev) => [...prev, p1.key]);
      setLoudness((prev) => prev + p1.loudness);
      setValence((prev) => prev + p1.valence);
      setTempo((prev) => prev + p1.tempo);
      setMode((prev) => prev + p1.mode);
      setEnergy((prev) => prev + p1.energy);
      setSpeechiness((prev) => prev + p1.speechiness);
      setAcousticness((prev) => prev + p1.acousticness);
      setInstrumentalness((prev) => prev + p1.instrumentalness);
      setLiveness((prev) => prev + p1.liveness);
    });
    setDanceability((prev) => prev / props.trackFeatures.length);
    setKey((prev) => frequent(prev));
    setLoudness((prev) => prev / props.trackFeatures.length);
    setValence((prev) => prev / props.trackFeatures.length);
    setTempo((prev) => prev / props.trackFeatures.length);
    setMode((prev) => Math.round(prev / props.trackFeatures.length));
    setEnergy((prev) => prev / props.trackFeatures.length);
    setSpeechiness((prev) => prev / props.trackFeatures.length);
    setAcousticness((prev) => prev / props.trackFeatures.length);
    setInstrumentalness((prev) => prev / props.trackFeatures.length);
    setLiveness((prev) => prev / props.trackFeatures.length);
    setLoading(true);
  }, []);

  return <div>{loading && <Sketch setup={setup} draw={draw} />}</div>;
}

export default MoodSketch;
