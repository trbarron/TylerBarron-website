import React, { useEffect, useState } from "react";
import "../assets/CSS/field.scss"
import useKeypress from '../assets/tools/useKeypress';

export default function Castle(castleVal, initialTroopsVal, setCastle) {
  const [troopsVal, setTroopsVal] = useState(initialTroopsVal);
  const [active, setActive] = useState(false);

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

  function updateNumber(e) {
    // const val = e.target.value;
    // If the current value passes the validity test then apply that to state
    // if (e.target.validity.valid) setTroopsVal(e.target.value);
  }

  function blurVal() {
    setActive(false);
    // setTroopsVal(Math.round(troopsVal * 10) / 10)
  }

  function incrementTroops(amount) {
    const newTroopVal = Math.round((troopsVal + amount) * 10) / 10;
    // setTroopsVal(newTroopVal);
    setCastle(newTroopVal);
  }
  

  return (

    <div className="flex flex-col h-10 w-full relative px-1" >
      <span className="m-auto">{castleVal}</span>



      <button
        className="font-semibold bg-red-200 hover:bg-red-300 text-white h-full w-full flex rounded-t focus:outline-none cursor-pointer"
        onClick={() => {
          incrementTroops(0.1);
        }}
      >
        <span className="m-auto">+</span>
      </button>



      <input
        className="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center"
        name="custom-input-number"
        onChange={(e) => updateNumber(e)}
        onFocus={() => setActive(true)}
        onBlur={() => blurVal()}
        autoComplete={"off"}
        placeholder={troopsVal}
        type="tel"
        pattern="^-?[0-9]\d*\.?\d*$"
        value={initialTroopsVal}
        id={castleVal}
      />


      <button
        className="font-semibold bg-red-200 hover:bg-red-300 text-white h-full w-full flex rounded-b focus:outline-none cursor-pointer"
        onClick={() => {
          incrementTroops(-0.1);
        }}
      >
        <span className="m-auto">-</span>
      </button>


    </div>


  );
}