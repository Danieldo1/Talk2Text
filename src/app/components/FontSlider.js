import React, { useState } from 'react';

const FontSizeSlider = ({ min, max, value, onChange }) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    onChange(newValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FontSizeSlider;