// @flow

import "../../styles/bottom-navigation.scss";

import { NavLink, useLocation } from "react-router-dom";

import React from "react";

type IconProps = {|
  filled: boolean
|};

export default function BottomNavigation() {
  const path = useLocation().pathname;

  return (
    <div className="bottom-navigation">
      <NavLink
        to="/"
        className="navigation-item"
        isActive={() => path === "/" || path.startsWith("/stop")}
      >
        <DepartureIcon filled={path === "/" || path.startsWith("/stop")} />
        <p>Departures</p>
      </NavLink>
      <NavLink to="/livemap" className="navigation-item">
        <MapIcon filled={path === "/livemap"} />
        <p>Live Map</p>
      </NavLink>
      <a
        href="http://www.begbroke.ox.ac.uk/wp-content/uploads/2019/04/Minibus-Timetable-1.4.19.png"
        target="_blank"
        rel="noopener noreferrer"
        className="navigation-item"
      >
        <TableIcon filled={false} />
        <p>Timetable</p>
      </a>
    </div>
  );
}

function DepartureIcon({ filled }: IconProps) {
  return filled ? (
    <SVG>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
    </SVG>
  ) : (
    <SVG>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm5.66 2.99H6.34C6.89 4.46 8.31 4 12 4s5.11.46 5.66.99zm.34 2V10H6V6.99h12zm-.34 9.74l-.29.27H6.63l-.29-.27C6.21 16.62 6 16.37 6 16v-4h12v4c0 .37-.21.62-.34.73z" />
      <circle cx="8.5" cy="14.5" r="1.5" />
      <circle cx="15.5" cy="14.5" r="1.5" />
    </SVG>
  );
}

function MapIcon({ filled }: IconProps) {
  return filled ? (
    <SVG>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </SVG>
  ) : (
    <SVG>
      <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
    </SVG>
  );
}

function TableIcon({ filled }: IconProps) {
  return filled ? (
    <SVG>
      <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
    </SVG>
  ) : (
    <SVG>
      <path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-5 14h-5v-9h5v9zM5 10h3v9H5v-9zm12 9v-9h3v9h-3z" />
    </SVG>
  );
}

function SVG({ children }: { children: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon"
    >
      {children}
    </svg>
  );
}
