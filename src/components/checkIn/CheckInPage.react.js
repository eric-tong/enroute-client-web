// @flow

import React from "react";

type Props = {|
  vehicleId: ?string,
|};

export default function CheckInPage({ vehicleId }: Props) {
  return (
    <main className="check-in-container">
      <h1>Check in to bus {vehicleId}</h1>
      <section className="options-container">
        <div className="option">
          I'm a University of Oxford employee or student
        </div>
        <div className="option">I'm a Begbroke company employee</div>
        <div className="option">I'm a visitor</div>
      </section>
    </main>
  );
}
