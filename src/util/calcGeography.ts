// Source:
// Coordinates => https://developers.google.com/public-data/docs/canonical/countries_csv

import _coordinates from "../../public/coordinates.json";
import _countries from "../../public/countries.json";
import * as geolib from "geolib";

const coordinates = _coordinates as {
  [key: string]: { latitude: number; longitude: number; name: string };
};
const countries = _countries as { [key: string]: string };

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

interface FormattedGuess {
  name: string;
  distance: number;
  percentage: number;
  direction: string;
}

const formatGuess = (guessAbr: string, answerAbr: string): FormattedGuess => {
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

export { formatGuess };
export type { FormattedGuess };
