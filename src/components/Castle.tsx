import React, { useState, FC } from "react";
import "../assets/CSS/field.css"
import useKeypress from '../assets/tools/useKeypress';

type CastleProps = {
  castleIndex: number;
  castleTeam: string;
  troopsVal: number | string;
  setTroopsVal: (team: string, index: number, value: number | string) => void;
  editable: boolean;
};

const Castle: FC<CastleProps> = ({
  castleIndex,
  castleTeam,
  troopsVal,
  setTroopsVal,
  editable
}) => {
  const [active, setActive] = useState<boolean>(false);

  const tabIndex = 1 + castleIndex + (castleTeam === "A" ? 0 : 10);

  useKeypress('ArrowUp', () => {
    if (active) {
      incrementTroops(0.1);
    }
  });

  useKeypress('ArrowDown', () => {
    if (active) {
      incrementTroops(-0.1);
    }
  });

  function blurVal() {
    setActive(false);
    setTroopsVal(castleTeam, castleIndex, Math.round(parseFloat(troopsVal as string) * 10) / 10);
  }

  function incrementTroops(amount: number) {
    const newTroopVal = Math.round((parseFloat(troopsVal as string) + amount) * 10) / 10;
    setTroopsVal(castleTeam, castleIndex, newTroopVal);
  }

  return (
    <div className="flex flex-col h-10 w-full relative px-0.5 md:px-1" >
      <button
        className={"font-semibold text-white h-full w-full flex rounded-b focus:outline-none " + (editable ? "cursor-pointer bg-gray-700 hover:bg-gray-600" : " cursor-not-allowed bg-gray-200 hover:bg-gray-300")} 
        onClick={() => incrementTroops(0.1)}
      >
        <span className="m-auto">+</span>
      </button>
      <input
        className="md:p-2 p-0 text-xs md:text-base border-gray-400 focus:outline-none text-center"
        name="custom-input-number"
        onChange={(e) => setTroopsVal(castleTeam, castleIndex, e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={blurVal}
        autoComplete="off"
        placeholder={troopsVal.toString()}
        type="tel"
        value={troopsVal.toString()}
        tabIndex={tabIndex}
      />
      <button
        className={"font-semibold text-white h-full w-full flex rounded-b focus:outline-none " + (editable ? "cursor-pointer bg-gray-700 hover:bg-gray-600" : " cursor-not-allowed bg-gray-200 hover:bg-gray-300")}
        onClick={() => incrementTroops(-0.1)}
      >
        <span className="m-auto">-</span>
      </button>
    </div>
  );
};

export default Castle;
