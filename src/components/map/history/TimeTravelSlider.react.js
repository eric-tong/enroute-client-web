// @flow

import React from "react";

export default function TimeTravelSlider() {
  return (
    <div className="slidecontainer">
      <input
        type="range"
        min="1"
        max="100"
        value="50"
        class="slider"
        id="myRange"
      />
      Hello World
    </div>
  );
}
