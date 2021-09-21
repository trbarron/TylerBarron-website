import React, { useEffect, useState } from "react";
import "../assets/CSS/field.scss"
import useKeypress from '../assets/tools/useKeypress';

const Castle = (params) => {
  const [active, setActive] = useState(false);

  const castleIndex = params.castleIndex;
  const castleTeam = params.castleTeam;
  const troopsVal = params.troopsVal;
  const setTroopsVal = params.setTroopsVal;
  const editable = params.editable;

  const tabIndex = 1 + castleIndex + (castleTeam === "A" ? 0 : 10)

  // }
  useKeypress('ArrowUp', () => {
    if (active) {
      incrementTroops(0.1)
    };
  });

  useKeypress('ArrowDown', () => {
    if (active) {
      incrementTroops(-0.1)
    };
  });

  function blurVal() {
    setActive(false);
    setTroopsVal(castleTeam, castleIndex, Math.round(troopsVal * 10) / 10);
  }

  function incrementTroops(amount) {
    const newTroopVal = Math.round((parseFloat(troopsVal) + amount) * 10) / 10;
    setTroopsVal(castleTeam, castleIndex, newTroopVal);
  }


  return (

    <div className="flex flex-col h-10 w-full relative px-0.5 md:px-1" >

      <button
        className={"font-semibold text-white h-full w-full flex rounded-b focus:outline-none " + (editable ? "cursor-pointer bg-red-200 hover:bg-red-300" : " cursor-not-allowed bg-gray-200 hover:bg-gray-300")} onClick={() => {
          incrementTroops(0.1);
        }}
      >
        <span className="m-auto">+</span>
      </button>

      <input
        className="md:p-2 p-0 text-xs md:text-base border-gray-400 focus:outline-none text-center"
        name="custom-input-number"
        onChange={(e) => setTroopsVal(castleTeam, castleIndex, e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => blurVal()}
        autoComplete={"off"}
        placeholder={troopsVal}
        type="tel"
        // pattern="^-?[0-9]\d*\.?\d*$"
        value={troopsVal}
        tabIndex={tabIndex}
      />

      <button
        className={"font-semibold text-white h-full w-full flex rounded-b focus:outline-none " + (editable ? "cursor-pointer bg-red-200 hover:bg-red-300" : " cursor-not-allowed bg-gray-200 hover:bg-gray-300")}
        onClick={() => {
          incrementTroops(-0.1);
        }}
      >
        <span className="m-auto">-</span>
      </button>

    </div>

  );
};

export default Castle