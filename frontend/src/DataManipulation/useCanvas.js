// const randomColor = require("randomcolor");

// const musicHues = [
//   "monochrome",
//   "blue",
//   "green",
//   "purple",
//   "pink",
//   "red",
//   "orange",
//   "yellow",
// ];
// const musicKHues = [
//   "yellow",
//   "yellow",
//   "orange",
//   "red",
//   "red",
//   "pink",
//   "pink",
//   "purple",
//   "blue",
//   "blue",
//   "green",
//   "green",
// ];
// const musicLums = [
//   "light",
//   "bright",
//   "bright",
//   "bright",
//   "light",
//   "bright",
//   "light",
//   "bright",
//   "bright",
//   "light",
//   "bright",
//   "light",
// ];
// const keyNames = [
//   "C",
//   "C♯/D♭",
//   "D",
//   "D♯/E♭",
//   "E",
//   "F",
//   "F♯/G♭",
//   "G",
//   "G♯/A♭",
//   "A",
//   "A♯/B♭",
//   "B",
// ];

// let sunColors = [];
// let sunSize;
// let sunRange;
// let sunPos;

// let landColors;

// let backgroundColor1;
// let backgroundColor2;

// const X_AXIS = 2;
// const Y_AXIS = 1;

// function setup(valence, mode, energy, key) {
//   let valenceColor = musicHues[Math.round(map(valence, 0.0, 1.0, 0, 7))];

//   // MODE -- day/night
//   if (mode == 1) {
//     // Major mode --- DAY
//     backgroundColor1 = color(
//       randomColor({
//         hue: valenceColor,
//         luminosity: "light",
//       })
//     );
//     backgroundColor2 = color(
//       randomColor({
//         luminosity: "light",
//       })
//     );
//     // Large yellow sun
//     sunColors = randomColor({
//       hue: "yellow",
//       count: 2,
//     });
//     sunSize = random(200, 300);
//     sunRange = random(20, 50);
//     // document.getElementById("daynighttime").innerText = "daytime";
//     // document.getElementById("mode").innerText = "major";
//   } else if (mode == 0) {
//     // Minor mode --- NIGHT
//     backgroundColor1 = color(
//       randomColor({
//         hue: valenceColor,
//         luminosity: "dark",
//       })
//     );
//     backgroundColor2 = color(
//       randomColor({
//         luminosity: "dark",
//       })
//     );
//     // Small monochrome moon
//     sunColors = randomColor({
//       luminosity: "light",
//       hue: "monochrome",
//       count: 2,
//     });
//     sunSize = random(75, 150);
//     sunRange = random(5, 10);
//     // document.getElementById("daynighttime").innerText = "nighttime";
//     // document.getElementById("mode").innerText = "minor";
//   }
// }

// function setGradient(x, y, w, h, c1, c2, axis) {
//   noFill();
//   if (axis == Y_AXIS) {
//     // Top to bottom gradient
//     for (var i = y; i <= y + h; i++) {
//       var inter = map(i, y, y + h, 0, 1);
//       var c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(x, i, x + w, i);
//     }
//   } else if (axis == X_AXIS) {
//     // Left to right gradient
//     for (var i = x; i <= x + w; i++) {
//       var inter = map(i, x, x + w, 0, 1);
//       var c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(i, y, i, y + h);
//     }
//   }
// }

// function sun() {
//   noStroke();
//   var sunColor = sunColors[0];
//   sunPos = [random(20, width), random(20, height / 2 - 50)];
//   for (i = sunSize; i > 0; i -= sunRange) {
//     fill(sunColor);
//     sunColor = lerpColor(color(sunColor), color(sunColors[1]), 0.25);
//     ellipse(sunPos[0], sunPos[1], i);
//   }
// }

// function stars() {
//   noStroke();
//   fill(
//     randomColor({
//       luminosity: "light",
//     })
//   );
//   for (i = 0; i < width; i += random(10, 100)) {
//     for (j = 0; j < height; j += random(10, 200)) {
//       ellipse(i, j, random(1, 4));
//     }
//   }
// }

// function makeLand(level, landColor) {
//   // mountains based on this openprocessing sketch: https://www.openprocessing.org/sketch/179401

//   noStroke();
//   fill(landColor);
//   stroke(landColor);
//   strokeWeight(2);
//   noLoop();

//   var yInit = (6 * height) / 7; //initial  y
//   var repetition = level / 4;

//   var yArray = [];
//   for (var j = 0; j < 4; j++) {
//     yArray[4 - j] = yInit;
//     yInit -= repetition / pow(1.2, j);
//   }

//   var dx = 0;

//   // Only two mountains at a time
//   for (var j = 1; j < 3; j++) {
//     var n1 = random(-height / 2, height / 2);
//     var n2 = random(-height / 2, height / 2);

//     var n3 = random(2, 4);

//     var n4 = map(energy, 0.0, 1.0, 5, 100);

//     var n5 = random(-width / 2, width / 2);

//     var n6 = map(energy, 0.0, 1.0, 0.15, 3);

//     for (var x = 0; x < width; x++) {
//       var y = yArray[j];
//       y += 10 * j * sin((2 * dx) / j + n1);
//       y += n3 * j * sin((5 * dx) / j + n2);
//       y += n4 * j * noise((n6 * dx) / j + n5);
//       y += 1.7 * j * noise(10 * dx);

//       line(x, y, x, height);

//       dx += 0.02;
//     }
//   }
// }

// function makeSky(level) {
//   noStroke();
//   fill(getRandomColor());
//   noLoop();
//   var amount = width;
//   var frequency = random(1.0) / 50;
//   var offset = random(200) + 5;
//   var startY = level;
//   beginShape();
//   vertex(0, startY);
//   for (var c = 1; c < amount; c++) {
//     var sinoffset = sin(frequency * c);
//     var sinX = c * (width / amount);
//     var sinY = startY * random(1.5) + sinoffset * offset;
//     bezierVertex(sinX, sinY, sinX, sinY - 1, sinX, sinY);
//   }

//   vertex(width, height);
//   vertex(0, height);
//   endShape();
// }

// function draw() {
//   //makeSky(canvasH);

//   // NIGHT
//   if (mode == 0) stars();

//   //skyRipples();

//   sun();

//   // Number of lands depends on how many songs we've listened to in the past hours
//   if (landN == 2) {
//     makeLand((4 * canvasH) / 6, landColors[3]);
//   }
//   makeLand(canvasH / 2, landColors[0]);
//   if (landN >= 1) {
//     makeLand((random(1, 2) * canvasH) / 6, landColors[1]);
//   }

//   //makeLand(random(2, 3) * canvasH / 6, landColors[1]);
//   // makeLand(random(3, 4) * canvasH / 6, landColors[2]);
//   // makeLand(4 * canvasH / 6, landColors[3]);
//   // makeLand(5 * canvasH / 6, landColors[4]);
// }

// function getRandomColor() {
//   var c = color(random(255), random(255), random(255), random(255));
//   return c;
// }

// function skyRipples() {
//   stroke(
//     randomColor({
//       format: "rgba",
//     })
//   );
//   fill(
//     randomColor({
//       format: "rgba",
//     })
//   );
//   var ellipseR = random(40, 100);
//   for (i = 0; i < width + ellipseR; i += 20) {
//     for (j = 0; j < height; j += 20) {
//       ellipse(i, j, ellipseR);
//     }
//   }
// }

// function makeRibbons() {
//   noFill();
//   smooth(8);
//   noLoop();

//   for (var i = 0; i < random(10) + 2; i++) {
//     var strokeW = random(5) + 3;

//     var amount = 500;
//     var frequency = random(1.0) / 15;
//     var offset = random(200) + 5;

//     var col = getRandomColor();

//     strokeWeight(strokeW);
//     stroke(col, 180);
//     var startY = height / 2;
//     beginShape();
//     curveVertex(canvasH / 3, startY);
//     for (var c = 1; c < amount; c++) {
//       var sinoffset = sin(frequency * c);
//       var sinX = c * (width / amount);
//       var sinY = startY + sinoffset * offset;
//       bezierVertex(sinX, sinY, sinX, sinY - 1, sinX, sinY);
//     }
//     endShape();
//   }
// }
