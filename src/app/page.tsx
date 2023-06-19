"use client";

import Image from "next/image";
import Header from "./components/Header";
import Game from "./components/Game";

export default function Home() {
  return (
    <>
      <div className="bg-white text-black">
        <Header />
        <Game></Game>
        <div className="py-[300px]" />
      </div>
    </>
  );
}
