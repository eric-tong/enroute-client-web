// @flow

import React from "react";

type Props = {
  vehicleId: ?string,
};

export default function CheckInDashboard({ vehicleId }: Props) {
  return <p>{vehicleId}</p>;
}
