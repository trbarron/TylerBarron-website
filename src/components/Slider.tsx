import React, { useState, ChangeEvent } from 'react';

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  handleChange: (value: number) => void;
};

const VerticalSlider: React.FC<SliderProps> = ({ min, max, step = 1 }) => {
  const [value, setValue] = useState<number>((max + min) / 2);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  return (
    <div className="relative w-{80vh} h-full mx-auto bg-pink-200">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className="bg-green-800 w-fit h-1 cursor-pointer slider-thumb z-10"
        onChange={handleChange}
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
        {Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step).map((num) => (
          <span key={num} className="text-xs" style={{ position: 'absolute', left: '100%', bottom: `${((num - min) / (max - min)) * 100}%`, transform: 'translateY(50%)' }}>
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VerticalSlider;