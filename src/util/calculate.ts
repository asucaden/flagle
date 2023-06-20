// Source:
// Coordinates => https://developers.google.com/public-data/docs/canonical/countries_csv

import { Countries, StringDict } from "@/types/types";
import _countries from "../../public/countries.json";
import _answers from "../../public/answers.json";
import * as geolib from "geolib";

const countries = _countries as Countries;
const answers = _answers as StringDict;

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
  const guessedCoords = countries[guessAbr];
  const answerCoords = countries[answerAbr];

  const meters = geolib.getDistance(guessedCoords, answerCoords);
  const compassDirection = geolib.getCompassDirection(
    guessedCoords,
    answerCoords
  );
  const name = countries[guessAbr].name;
  const distance = Math.trunc(meters / 1609.344); // 1609.344 meters per mile
  const percentage = (12427.4238 - distance) / 12427.4238; // 1242.74238 miles is furthest distance between 2 points on earth
  const direction = arrows[compassDirection];
  return { name, distance, percentage, direction };
};

const getTodaysAnswer = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const dateKey = `${mm}/${dd}/${yyyy}`;
  return answers[dateKey];
};

const normalizeName = (name: string) => {
  name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return name.toLowerCase();
};

export { getTodaysAnswer };
export { formatGuess };
export { normalizeName };
export type { FormattedGuess };
