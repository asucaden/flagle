"use client";
import { useState } from "react";
import Autosuggest from "react-autosuggest";
import countries2 from "../../../public/countries2.json";
import { normalizeName } from "../../util/calculate";

// Autosuggest functions begin
const getSuggestions = (value: string) => {
  const inputValue = normalizeName(value);
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : countries2.filter(
        (country) => country.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// Autosuggest functions end

const InputGuess = ({ onGuess }: { onGuess: (userGuess: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmission = (i: React.MouseEvent | React.KeyboardEvent) => {
    console.log("handleclick" + inputValue);
    onGuess(inputValue);
    setInputValue("");
  };

  const inputProps = {
    value: inputValue,
    onChange: (_e: any, { newValue }: { newValue: string }) =>
      setInputValue(newValue),
    type: "text",
    placeholder: "Start Typing a Country Name",
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmission(e);
      }
    },
  };

  const input = (
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
  );

  return (
    <div className="flex flex-row gap-2 text-center text-black p-4 bg-cyan-800 my-6">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={() =>
          setSuggestions(getSuggestions(inputValue))
        }
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => (
          <div className="border-2 dark:bg-slate-800 dark:text-slate-100">
            {suggestion}
          </div>
        )}
        inputProps={inputProps}
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
