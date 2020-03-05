// @flow

import BackButton from "../misc/BackButton.react";
import BusRoute from "../panel/BusRoute.react";
import { DateTime } from "luxon";
import React from "react";
import VehicleDetailLoadingState from "../edge-states/VehicleDetailLoadingState.react";
import { getClass } from "../../utils/jsxUtil";
import { getHumanReadableTime } from "../../utils/timeUtil";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  registration: string
|};
type QueryResult = {|
  id: number,
  trip: { id: ?number },
  avl: { timestamp: string }
|};

const VEHICLE = gql`
  query getVehicle($registration: String!) {
    vehicle(registration: $registration) {
      id
      trip {
        id
      }
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
        <VehicleDetailLoadingState />
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
      <TripTile tripId={vehicle.trip.id} />
    </>
  );
}

type TripTileProps = {|
  tripId: ?number
|};

function TripTile({ tripId }: TripTileProps) {
  const tripIdWithTaxiTrips = tripId
    ? tripId <= 26
      ? tripId
      : tripId + tripId - 26
    : 0;
  return (
    <div
      className={getClass("detail-view-tile", tripId ? undefined : "collapsed")}
    >
      <header>
        <div className="subheader left">
          <h1>{tripId ? `On Trip ${tripIdWithTaxiTrips}` : "Inactive"}</h1>
        </div>
      </header>
      {tripId && (
        <div className="lower-half">
          <h3>Bus Route</h3>
          <BusRoute tripId={tripId} />
        </div>
      )}
    </div>
  );
}

function useVehicle(registration): ?QueryResult {
  const { loading, data } = useQuery(VEHICLE, {
    pollInterval: 15000,
    variables: { registration }
  });

  return !loading ? data?.vehicle : undefined;
}
