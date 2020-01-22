// @flow

import "../../styles/back-button.scss";

import { NavLink } from "react-router-dom";
import React from "react";

export default function BackButton() {
  return (
    <NavLink to="/" className="back">
      <ArrowIcon />
      Back
    </NavLink>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      class="arrow"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}