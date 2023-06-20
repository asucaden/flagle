"use client";
import _answers from "../../../public/answers.json";
import _countries from "../../../public/countries.json";
import { formatGuess, FormattedGuess } from "../../util/calcGeography";
import { useState } from "react";

const answers = _answers as { [key: string]: string };
const countries = _countries as { [key: string]: string };

const Victory = ({ guesses }: { guesses: FormattedGuess[] }) => {
  return (
    <div className="py-[200px] bg-blue-800 text-4xl">
      You won! It took you {guesses.length} guesses. Share with your friends
      --Flagle--
    </div>
  );
};

const Flag = ({ answer }: { answer: string }) => {
  return (
    <div>
      <img
        className="max-w-xs mx-auto my-8 shadow-2xl"
        src={`/svg_flags/${answer.toLowerCase()}.svg`}
        alt="new"
      />
    </div>
  );
};

const GuessRow = ({ onGuess }: { onGuess: (userGuess: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const handleClick = (i: React.MouseEvent) => {
    console.log("handleclick" + inputValue);
    onGuess(inputValue);
  };
  return (
    <div className="flex flex-row gap-2 text-center text-black p-4 bg-cyan-800 my-6">
      <input
        className="flex-auto w-[450px]"
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="flex-auto w-20 bg-green-800 text-white mx-5 border-2 border-black shadow-2xl"
        type="button"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

const PrevGuess = ({ guess }: { guess: FormattedGuess }) => (
  <div
    className="grid grid-cols-4 bg-cyan-700 text-white border-4 border-cyan-900"
    key="{guess.name}"
  >
    <div>{guess.name}</div>
    <div>{guess.distance} mi</div>
    <div>{guess.direction}</div>
    <div>{(guess.percentage * 100).toFixed()}%</div>
  </div>
);

function PrevGuesses({ guesses }: { guesses: FormattedGuess[] }) {
  const history: React.JSX.Element[] = [];
  guesses.forEach((guess) => history.push(<PrevGuess guess={guess} />));

  return <div className="container grid grid-rows-6 gap-4">{history}</div>;
}

const Game = () => {
  const [guesses, setGuesses] = useState<FormattedGuess[]>([]);
  const [won, setWon] = useState(false);

  const date = getDate();
  const answer: string | undefined = answers[date];
  const handleGuess = (userGuess: string) => {
    console.log("handleGuess" + userGuess);
    //Validate guess
    const guessAbr: string | undefined = Object.keys(countries).find(
      (key) => countries[key] === userGuess
    );
    if (!guessAbr) {
      console.log("Invalid guess");
      return;
    }
    //Add guess to guess history
    if (guesses.length > 10) return;
    const validGuess: FormattedGuess = formatGuess(guessAbr, answer);
    setGuesses([validGuess, ...guesses]);

    //Check is user won. If yes, display you won message
    if (guessAbr == answer) {
      setWon(true);
    }
    //If no, show updated guess history
  };

  if (won)
    return (
      <div className="flex flex-col bg-slate-200 max-w-lg mx-auto text-white shadow-md">
        <Victory guesses={guesses} />
        <PrevGuesses guesses={guesses} />
      </div>
    );
  return (
    <div className="flex flex-col bg-slate-200 max-w-lg mx-auto text-white shadow-md">
      <Flag answer={answer} />
      <GuessRow onGuess={handleGuess} />
      <PrevGuesses guesses={guesses} />
    </div>
  );
};

const getDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${mm}/${dd}/${yyyy}`;
};

export default Game;
