// @flow

import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  busStopUrl: string
|};

const BUS_STOP = gql`
  query getBusStop($url: String!) {
    busStop(url: $url) {
      id
      name
      street
      direction
      departures {
        scheduled
        predicted
      }
    }
  }
`;

export default function BusStopDetailView({ busStopUrl }: Props) {
  const { data } = useQuery(BUS_STOP, { variables: { url: busStopUrl } });
  if (!data) return "Loading...";

  const { name, street, direction, departures } = data?.busStop;

  const STOPS = [
    "Oxford Town Centre",
    "Department of Materials",
    "Summertown Shops",
    "Parkway Park & Ride",
    "Begbroke Science Park"
  ];

  return (
    <>
      <button class="back">Back to Departures</button>
      <h1 className="no-bottom-margin">{name}</h1>
      <p className="direction">
        {street}
        <span className="chevron higher" />
        <span className="subtle">Towards {direction}</span>
      </p>
      <h3>Next Departure</h3>
      <div className="unit">
        <header>
          <div className="subheader left">
            <h1>2 min</h1>
          </div>
          <div className="subheader right">
            <p>4:15 pm</p>
            <h3>
              <span className="warning">Delayed</span>
              <span className="interpunct" />
              Scheduled 4:17 pm
            </h3>
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
    </>
  );
}
