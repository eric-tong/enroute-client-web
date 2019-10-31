// @flow

import React from "react";

export default function VehicleMarker({ bearing }: { bearing: number }) {
  return (
    <svg width="70px" height="70px" viewBox="0 0 70 70" version="1.1">
      <defs>
        <circle id="path-1" cx="19" cy="33" r="19"></circle>
        <filter
          x="-35.5%"
          y="-35.5%"
          width="171.1%"
          height="171.1%"
          filterUnits="objectBoundingBox"
          id="filter-2"
        >
          <feMorphology
            radius="0.5"
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          ></feMorphology>
          <feOffset
            dx="0"
            dy="0"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.158288043 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform={`rotate(${bearing ? bearing : 0} 35 35)`}
      >
        <g
          id="drone-green-copy"
          transform="translate(-116.000000, -116.000000)"
        >
          <g id="Group-2" transform="translate(132.000000, 121.000000)">
            <g id="Group">
              <g id="Oval">
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-2)"
                  xlinkHref="#path-1"
                ></use>
                <use
                  fill="#FFFFFF"
                  fillRule="evenodd"
                  xlinkHref="#path-1"
                ></use>
              </g>
              <circle
                id="Oval-Copy"
                fill="#C6F9AC"
                cx="19"
                cy="33"
                r="14"
              ></circle>
              <circle
                id="Oval-Copy-2"
                fill="#56D716"
                cx="19"
                cy="33"
                r="8"
              ></circle>
              <polygon
                id="Triangle"
                fill="#56D716"
                points="19 0 24 8 14 8"
              ></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
