import React, { useEffect, useState, useLayoutEffect } from "react";
import Sketch from "react-p5";
import randomColor from "randomcolor";
import styled from "styled-components";

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

let landN;

var i, j;

let landColors;

let backgroundColor1;
let backgroundColor2;

let cloudColor1;
let cloudColor2;

let rainColor;

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

function fade(p5, color) {
  for (let i = 0; i < p5.height / 3; i++) {
    let alfa = p5.map(i, 0, p5.height / 3, 360, 0);

    p5.strokeWeight(1);
    p5.stroke([color[0], color[1], color[2], alfa]);
    p5.line(0, i, p5.width, i);
  }
}

function clouds(p5, color) {
  console.log(color);
  let begin = p5.random(50); //changes the begin of noise each time

  let i = 0;

  for (let x = 0; x < p5.width; x += 2) {
    let j = 0;

    for (let y = 0; y < p5.height / 3; y += 2) {
      let alfaMax = p5.map(y, 0, p5.height / 4, 520, 0); //the clouds become transparent as they become near to the mountains
      let alfa = p5.noise(begin + i, begin + j);
      alfa = p5.map(alfa, 0.4, 1, 0, alfaMax);

      p5.noStroke();
      p5.fill([color[0], color[1], color[2], alfa]);
      p5.ellipse(x, y, 2, 2);

      j += 0.06; //increase j faster than i so the clouds look horizontal
    }

    i += 0.01;
  }
}

function frequent(arr) {
  const counts = {};
  let maxCount = 0;
  let maxKey = arr[0];
  // Count how many times each object (or really its string representation)
  // appears, and keep track of the highest count we've seen.
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const count = (counts[key] = (counts[key] || 0) + 1);
    if (count > maxCount) {
      maxCount = count;
      maxKey = key;
    }
  }
  // Return (one of) the highest keys we've seen, or undefined.
  return maxKey;
}

function rain(p5, num) {
  for (let i = 0; i < num; i++) {
    let x = p5.random(p5.width);
    let y = p5.random(p5.height / 1.6);

    p5.noStroke();
    p5.fill(cloudColor2);
    p5.rect(x, y, p5.random(0.3, 1.2), p5.random(2, 6) * 3);
  }
}

function birds(p5, mode, acousticness) {
  p5.noStroke();
  // p5.colorMode(p5.HSL, 360, 255, 255, 1);
  if (mode === 0) {
    p5.colorMode(p5.HSL, 255, 0, 100);
  } else {
    p5.colorMode(p5.HSL, 360, 255, 255, 1);
  }
  for (let y = 0; y < p5.height / 3; y += 16) {
    let ny = y / p5.height;
    for (let x = 0; x < p5.width; x += 3) {
      let nx = x / p5.width;
      let nox = p5.noise(nx * 2, ny * 8);
      let nox2 = p5.noise(nx, ny);
      let nox3 = p5.noise(nx / 8, ny / 8);
      let n =
        ((p5.sin(nx * p5.PI * 4 + ny * p5.PI * 6 + nox * p5.PI * 0.15) +
          p5.cos(ny * p5.PI * 10 * nox3 + nx * p5.PI * 2)) /
          2) *
        nox2;

      let yy = p5.height / 8 + y - n * (p5.height / 3) * (1 - ny);

      if (p5.random() > 0.99 + Math.abs(acousticness - 1) / 100) {
        // if (true) {
        p5.stroke(0, 0, 0, 1);
        p5.strokeWeight(0.5);
        let tx = x + p5.random(1, 6);
        let ty = yy + p5.random(1, 6);
        p5.line(x, yy, tx, ty);
        p5.line(
          tx,
          ty,
          tx + p5.random(1, 6) * (1 - ny),
          ty - p5.random(1, 4) * (1 - ny)
        );
      }
    }
  }
}
let keymode = "";
let daynighttime = "";
let valancestringcolor = "";
let valancestring = "";
let mountainjag = "";
let mountainpairs = "";
let mountaindance = "";
let keycolor = "";
let keyname = "";
let birdspresent = "";
let valancesetting = "";
let birdsaccoustic = "";

function MoodSketch(props) {
  const [danceability, setDanceability] = useState(0.0);
  const [key, setKey] = useState([]);
  const [loudness, setLoudness] = useState(0.0);
  const [valence, setValence] = useState(0.0);
  const [tempo, setTempo] = useState(0.0);
  const [mode, setMode] = useState(0.0);
  const [energy, setEnergy] = useState(0.0);
  const [speechiness, setSpeechiness] = useState(0.0);
  const [acousticness, setAcousticness] = useState(0.0);
  const [instrumentalness, setInstrumentalness] = useState(0.0);
  const [liveness, setLiveness] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [valenceColor, setValenceColor] = useState("");

  const { height, width } = useWindowDimensions();

  function setup(p5, canvasParentRef) {
    p5.smooth();
    let valenceColor = musicHues[Math.round(p5.map(valence, 0.0, 1.0, 0, 7))];
    setValenceColor(valenceColor);
    landN = p5.random([0, 1, 2]);

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

      cloudColor1 = randomColor({
        luminosity: "light",
        hue: valenceColor,
        format: "rgbArray",
      });

      cloudColor2 = randomColor({
        luminosity: "light",
        format: "rgbArray",
      });

      rainColor = p5.color(
        randomColor({
          luminosity: "light",
          hue: valenceColor,
        })
      );

      // Large yellow sun
      sunColors = randomColor({
        hue: "yellow",
        count: 2,
      });
      sunSize = p5.random(200, 300);
      sunRange = p5.random(20, 50);
      daynighttime = "day time";
      keymode = "major";
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

      cloudColor1 = randomColor({
        luminosity: "light",
        hue: valenceColor,
        format: "rgbArray",
      });
      cloudColor2 = randomColor({
        luminosity: "light",
        format: "rgbArray",
      });

      rainColor = p5.color(
        randomColor({
          luminosity: "dark",
          hue: valenceColor,
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
      daynighttime = "night time";
      keymode = "minor";
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

    p5.createCanvas(width / 2, height / 2.5).parent(canvasParentRef);
    setGradient(
      p5,
      0,
      0,
      width / 2,
      height / 2.5,
      backgroundColor1,
      backgroundColor2,
      Y_AXIS
    );
  }

  function draw(p5) {
    if (mode === 0) {
      stars(p5);
    }
    sun(p5);
    // if (p5.random() < 0.33) {
    //   let amt = p5.random([100, 250, 500]);
    //   rain(p5, amt);
    // }
    if (valence < 0.33) {
      rain(p5, 500);
      fade(p5, cloudColor2);
      clouds(p5, cloudColor1);
    } else if (valence < 0.45) {
      rain(p5, 250);
      fade(p5, cloudColor2);
    } else if (valence < 0.67) {
      rain(p5, 100);
      clouds(p5, cloudColor1);
    }

    // if (p5.random() < 0.5) {
    //   fade(p5, cloudColor2);
    // }
    // if (p5.random() < 0.5) {
    //   clouds(p5, cloudColor1);
    // }
    // if (p5.random() < 0.5) clouds(p5, cloudColor2);
    if (danceability >= 0.5) {
      makeLand(p5, (4 * p5.height) / 6, landColors[3], energy);
      makeLand(p5, p5.height / 2, landColors[0], energy);
      makeLand(p5, (p5.random(1, 2) * p5.height) / 6, landColors[1], energy);
    } else if (danceability >= 0.3) {
      makeLand(p5, p5.height / 2, landColors[0], energy);
      makeLand(p5, (p5.random(1, 2) * p5.height) / 6, landColors[1], energy);
    } else {
      makeLand(p5, p5.height / 2, landColors[0], energy);
    }

    if (acousticness > 0.2) {
      birds(p5, mode, acousticness);
    }
  }

  useEffect(() => {
    setLoading(false);
    let test = [];
    props.trackFeatures.forEach(function (p1, p2, p3) {
      setDanceability((prev) => prev + p1.danceability);
      // setKey((prev) => [...prev, p1.key]);
      test.push(p1.key);
      console.log(test);
      // setKey(key.append(p1.key));
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
    console.log(test);
    setDanceability((prev) => prev / props.trackFeatures.length);
    // setKey((prev) => frequent(prev));
    setKey(frequent(test));
    setLoudness((prev) => prev / props.trackFeatures.length);
    setValence((prev) => prev / props.trackFeatures.length);
    setTempo((prev) => prev / props.trackFeatures.length);
    setMode((prev) => Math.round(prev / props.trackFeatures.length));
    setEnergy((prev) => prev / props.trackFeatures.length);
    setSpeechiness((prev) => prev / props.trackFeatures.length);
    setAcousticness((prev) => prev / props.trackFeatures.length);
    setInstrumentalness((prev) => prev / props.trackFeatures.length);
    setLiveness((prev) => prev / props.trackFeatures.length);
    console.log(frequent(danceability));
    // let valenceColor = musicHues[Math.round(Math.map(valence, 0.0, 1.0, 0, 7))];

    setLoading(true);
  }, []);

  useEffect(() => {
    let currentHue = musicKHues[key];
    let currentLum = musicLums[key];

    keycolor = currentLum + " " + currentHue;
    keyname = keyNames[key];
    valancestringcolor = valenceColor;

    if (mode === 0) {
      daynighttime = "night time";
      keymode = "minor";
    } else if (mode === 1) {
      daynighttime = "day time";
      keymode = "major";
    }
    if (valence < 0.5) {
      valancestring = "postive";
    } else {
      valancestring = "negative";
    }

    if (energy < 0.5) {
      mountainjag = "more";
    } else {
      mountainjag = "less";
    }

    if (valence >= 0.67) {
      valancesetting = "no rain";
    } else if (valence < 0.67) {
      valancesetting = "light rain";
    } else if (valence < 0.45) {
      valancesetting = "moderate rain";
    } else if (valence < 0.33) {
      valancesetting = "heavy rain";
    }

    if (danceability >= 0.5) {
      mountainpairs = "three pairs";
      mountaindance = "more";
    } else if (danceability >= 0.3) {
      mountainpairs = "two pairs";
      mountaindance = "more";
    } else {
      mountainpairs = "one pair";
      mountaindance = "less";
    }

    if (acousticness > 0.74) {
      birdspresent = "more birds";
      birdsaccoustic = "more";
    } else if (acousticness > 0.2) {
      birdspresent = "less birds";
      birdsaccoustic = "less";
    } else {
      birdspresent = "no birds";
      birdsaccoustic = "less";
    }
  }, [loading]);

  return (
    <FlexDiv>
      {loading && <Sketch setup={setup} draw={draw} />}
      {loading && (
        <VerticalFlexDiv>
          <span>
            The background color is <BoldP>{valenceColor}</BoldP> because you've
            been listening to <BoldP>{valancestring}</BoldP> music
          </span>
          <span>
            It is currently <BoldP>{daynighttime}</BoldP> because you've been
            listening to music in <BoldP>{keymode}</BoldP> scale
          </span>
          <span>
            There is currently <BoldP>{valancesetting}</BoldP> because you've
            been listening to <BoldP>{valancestring}</BoldP> music
          </span>
          <span>
            The mountains are <BoldP>{mountainjag}</BoldP> rough because you've
            been listening to <BoldP>{mountainjag}</BoldP> energetic music
          </span>
          <span>
            You have <BoldP> {mountainpairs} </BoldP> of mountains since the
            music you've been listening to are <BoldP>{mountaindance}</BoldP>{" "}
            danceable
          </span>
          <span>
            The mountain colors are similar to
            <BoldP>{musicLums[key] + " " + musicKHues[key]}</BoldP> because your
            music are played in the key <BoldP>{keyNames[key]}</BoldP>
          </span>
          <span>
            There are <BoldP>{birdspresent}</BoldP> because you've been
            listening to <BoldP>{birdsaccoustic}</BoldP> acoustic music
          </span>
        </VerticalFlexDiv>
      )}
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & p {
    margin: 0;
  }
`;

const VerticalFlexDiv = styled(FlexDiv)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const BoldP = styled.p`
  font-weight: bold;
  &&& {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default MoodSketch;
