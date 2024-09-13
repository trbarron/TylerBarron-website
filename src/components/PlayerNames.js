import React from 'react';

const PlayerNames = ({ gameData }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 transform -translate-y-full p-2">
        <span className="text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {gameData.w_one}, {gameData.w_two}
        </span>
      </div>
      <div className="absolute bottom-0 right-0 transform translate-y-full p-2">
        <span className="text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {gameData.b_one}, {gameData.b_two}
        </span>
      </div>
    </div>
  );
};

export default PlayerNames;