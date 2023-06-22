"use client";

import _countries from "../../../public/countries.json";
import {
  formatGuess,
  FormattedGuess,
  getTodaysAnswer,
  normalizeName,
} from "../../util/calculate";
import { Countries } from "@/types/types";
import { useState } from "react";
import Victory from "./Victory";
import InputGuess from "./InputGuess";
import { PrevGuesses } from "./StoredGuesses";
import { Flag } from "./Flag";

const countries = _countries as Countries;

const MAX_GUESSES = 10;

const todaysAnswer: string | undefined = getTodaysAnswer();

const Game = () => {
  const [guesses, setGuesses] = useState<FormattedGuess[]>([]);
  const [won, setWon] = useState(false);
  const [currAnswer, setCurrAnswer] = useState(todaysAnswer);

  const handleGuess = (userGuess: string) => {
    console.log("handleGuess" + userGuess);

    //Validate guess
    const guessAbr: string | undefined = Object.keys(countries).find(
      (key) => normalizeName(countries[key].name) === normalizeName(userGuess)
    );
    if (!guessAbr || !currAnswer) {
      console.log("Invalid guess");
      return;
    }
    //Add guess to guess history
    if (guesses.length >= MAX_GUESSES) return;
    const validGuess: FormattedGuess = formatGuess(guessAbr, currAnswer);
    setGuesses([validGuess, ...guesses]);

    //Check is user won. If yes, display you won message
    if (normalizeName(guessAbr) == normalizeName(currAnswer)) {
      setWon(true);
    }
    //If no, show updated guess history
  };

  const handleRandomize = () => {
    const keys = Object.keys(countries);
    setCurrAnswer(keys[(keys.length * Math.random()) << 0]);
    setGuesses([]);
    setWon(false);
  };

  if (won)
    return (
      <div className="flex flex-col bg-slate-200 max-w-lg mx-auto text-white shadow-md">
        <Victory guesses={guesses} />
        <PrevGuesses guesses={guesses} />
        <PlayRandom onRandomize={handleRandomize} />
      </div>
    );
  return (
    <div className="flex flex-col bg-slate-200 max-w-lg mx-auto text-white shadow-md">
      <Flag answer={currAnswer} />
      <InputGuess onGuess={handleGuess} />
      <PrevGuesses guesses={guesses} />
      <PlayRandom onRandomize={handleRandomize} />
    </div>
  );
};

const PlayRandom = ({ onRandomize }: { onRandomize: () => void }) => {
  const handleClick = (i: React.MouseEvent) => {
    onRandomize();
  };
  return (
    <button
      className="flex-auto w-30 bg-orange-800 text-white mt-10 mx-5 border-2 border-black shadow-2xl text-sm"
      type="button"
      onClick={handleClick}
    >
      Randomize Flag
    </button>
  );
};

export default Game;
