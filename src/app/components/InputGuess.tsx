"use client";
import { useState } from "react";

const InputGuess = ({ onGuess }: { onGuess: (userGuess: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmission = (i: React.MouseEvent | React.KeyboardEvent) => {
    console.log("handleclick" + inputValue);
    onGuess(inputValue);
    setInputValue("");
  };
  return (
    <div className="flex flex-row gap-2 text-center text-black p-4 bg-cyan-800 my-6">
      <input
        className="flex-auto w-[450px]"
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmission(e);
          }
        }}
        value={inputValue}
      />
      <button
        className="flex-auto w-20 bg-green-800 text-white mx-5 border-2 border-black shadow-2xl"
        type="button"
        onClick={handleSubmission}
      >
        Submit
      </button>
    </div>
  );
};

export default InputGuess;
