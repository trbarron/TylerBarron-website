import React from 'react';

const ProgressTimer = ({ timeRemaining, totalTime }) => {
  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressTimer;