// @flow

import "../../styles/menu-button.scss";

import React from "react";

export default function MenuButton() {
  return (
    <button className="menu">
      <div className="menu-icon">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <p>Menu</p>
    </button>
  );
}
