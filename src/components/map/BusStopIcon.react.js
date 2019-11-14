// @flow

import React from "react";

type Props = {
  text: string,
};

export default function BusStopIcon({ text }: Props) {
  return (
    <svg
      version="1.1"
      id="bus-stop"
      width="70px"
      height="70px"
      x="0px"
      y="0px"
      viewBox="0 0 70 70"
    >
      <filter
        filterUnits="objectBoundingBox"
        height="171.1%"
        id="filter-2"
        width="171.1%"
        x="-35.5%"
        y="-35.5%"
      >
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="0.5"
          result="shadowSpreadOuter1"
        ></feMorphology>
        <feOffset
          dx="0"
          dy="0"
          in="shadowSpreadOuter1"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="4"
        ></feGaussianBlur>
        <feColorMatrix
          in="shadowBlurOuter1"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.158288043 0"
        ></feColorMatrix>
      </filter>
      <g id="pin" transform="translate(35 50) scale(0.6) translate(-35 -50)">
        <g id="shadow" filter="url(#filter-2)">
          <path
            id="shadow-path_1_"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35,5.7c11.4,0,20.6,14,20.6,25.9S46.4,53,35,53s-20.6-9.6-20.6-21.4S23.6,5.7,35,5.7z"
          />
        </g>
        <path
          id="pin-shape"
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="#002147"
          d="M35,2.2c10.8,0,19.5,9.5,19.5,21.3C54.5,41.5,35,50,35,50s-19.5-8.5-19.5-26.4
		C15.5,11.8,24.2,2.2,35,2.2z"
        />
        <text
          fill="#FFFFFF"
          font-family="MyriadPro-Bold"
          font-size="27px"
          text-anchor="middle"
          x="50%"
          y="46%"
        >
          {text}
        </text>
      </g>
    </svg>
  );
}
