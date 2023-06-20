"use client";
import { FormattedGuess } from "@/util/calculate";

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

export { PrevGuess };
export { PrevGuesses };
