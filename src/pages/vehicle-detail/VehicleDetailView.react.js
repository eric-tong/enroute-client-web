// @flow

import BackButton from "../misc/BackButton.react";
import { DateTime } from "luxon";
import React from "react";
import { getHumanReadableTime } from "../../utils/timeUtil";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  registration: string
|};
type QueryResult = {|
  id: number,
  avl: { timestamp: string }
|};

const VEHICLE = gql`
  query getVehicle($registration: String!) {
    vehicle(registration: $registration) {
      id
      avl {
        timestamp
      }
    }
  }
`;

export default function VehicleDetailView({ registration }: Props) {
  const vehicle = useVehicle(registration);
  if (!vehicle)
    return (
      <>
        <BackButton />
        <h2 className="no-bottom-margin">Vehicle {registration}</h2>
      </>
    );

  const lastUpdateString = getHumanReadableTime(
    DateTime.local(),
    DateTime.fromSQL(vehicle.avl.timestamp)
  );
  return (
    <>
      <BackButton />
      <h2 className="no-bottom-margin">Vehicle {registration}</h2>
      <p className="direction">
        <span className="subtle">Last updated:</span>{" "}
        {lastUpdateString === "Now" ? "Just now" : lastUpdateString}
      </p>
    </>
  );
}

function useVehicle(registration): ?QueryResult {
  const { loading, data } = useQuery(VEHICLE, {
    pollInterval: 15000,
    variables: { registration }
  });

  if (!loading) return data?.vehicle;
}
