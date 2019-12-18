// @flow

import "../../../styles/time-travel-slider.scss";

import React from "react";

type Props = {
  steps: number,
  currentIndex: number,
  onValueChange: number => void,
};

export default function TimeTravelSlider({
  steps = 1,
  currentIndex,
  onValueChange,
}: Props) {
  return (
    <div className="time-travel-slider-container">
      <div className="card">
        <input
          disabled={steps < 2}
          type="range"
          min="0"
          max={steps}
          value={currentIndex}
          onChange={event => onValueChange(event.target.value)}
          className="slider"
        />
      </div>
    </div>
  );
}
