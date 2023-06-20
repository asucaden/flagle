"use client";
export const Flag = ({ answer }: { answer: string }) => {
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
