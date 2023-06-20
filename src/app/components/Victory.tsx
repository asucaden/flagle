"use client";
import { FormattedGuess } from "@/util/calculate";

const Victory = ({ guesses }: { guesses: FormattedGuess[] }) => {
  return (
    <div className="py-[200px] bg-blue-800 text-4xl">
      You won! It took you {guesses.length} guesses. Share with your friends
      --Flagle--
    </div>
  );
};

export default Victory;
