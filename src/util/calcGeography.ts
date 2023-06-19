// Source:
// Coordinates => https://developers.google.com/public-data/docs/canonical/countries_csv

import countries from "public/countries.json";
import coordinates from "public/coordinates.json";
import * as geolib from "geolib";

const arrows = {
  E: "➡️",
  ENE: "↗️",
  ESE: "↘️",
  N: "⬆",
  NE: "↗️",
  NNE: "↗️",
  NNW: "↖️",
  NW: "↖️",
  S: "⬇️",
  SE: "↘️",
  SSE: "↘️",
  SSW: "↙️",
  SW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  WSW: "↙️",
};

const formatGuess = (guessAbr, answerAbr) => {
  const guessedCoords = coordinates[guessAbr];
  const answerCoords = coordinates[answerAbr];

  const meters = geolib.getDistance(guessedCoords, answerCoords);
  const compassDirection = geolib.getCompassDirection(
    guessedCoords,
    answerCoords
  );
  const name = countries[guessAbr];
  const distance = Math.trunc(meters / 1609.344); // 1609.344 meters per mile
  const percentage = (12427.4238 - distance) / 12427.4238; // 1242.74238 miles is furthest distance between 2 points on earth
  const direction = arrows[compassDirection];
  return { name, distance, percentage, direction };
};

export default formatGuess;
