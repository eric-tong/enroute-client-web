// @flow

import "../../../styles/time-travel-slider.scss";

import React, { useState } from "react";

export default function TimeTravelSlider() {
  const [time, setTime] = useState(50);

  return (
    <div className="time-travel-slider-container">
      <div className="card">
        <input
          type="range"
          min="1"
          max="100"
          value={time}
          onChange={event => setTime(event.target.value)}
          className="slider"
        />
      </div>
    </div>
  );
}
