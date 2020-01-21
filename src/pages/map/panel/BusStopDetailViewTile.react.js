// @flow

import "../../../styles/detail-view-tile.scss";

import { DateTime } from "luxon";
import React from "react";

type Props = {|
  departure: Departure
|};

const STOPS = [
  "Oxford Town Centre",
  "Department of Materials",
  "Summertown Shops",
  "Parkway Park & Ride",
  "Begbroke Science Park"
];

export default function BusStopDetailViewTile({
  departure: { scheduled, predicted }
}: Props) {
  const now = DateTime.local();
  const estimated = predicted ?? scheduled;
  const timeToEstimatedDeparture = estimated.toMillis() - now.toMillis();
  const [hour, minute] = [
    timeToEstimatedDeparture / 60 / 60 / 1000,
    (timeToEstimatedDeparture / 60 / 1000) % 60
  ].map(Math.floor);

  return (
    <div className="detail-view-tile">
      <header>
        <div className="subheader left">
          <h1>{`${hour} hr ${minute} min`}</h1>
        </div>
        <div className="subheader right">
          <p>
            {estimated.toFormat("h:mm a")}
            <span className="tag ghost warning">Delayed</span>
          </p>
          <h3>Scheduled {scheduled.toFormat("h:mm a")}</h3>
        </div>
      </header>
      <div className="lower-half">
        <h3>Bus Route</h3>
        <ul className="route">
          {STOPS.map(stop => (
            <li>
              <div className="icon">
                <div className="wrapper">
                  <div className="bar" />
                </div>
                <div className="wrapper">
                  <div className="bullet" />
                </div>
              </div>
              <span className="name">{stop}</span>
              <span className="time warning">5:15 pm</span>
              <span className="tag ghost warning">Delayed</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
