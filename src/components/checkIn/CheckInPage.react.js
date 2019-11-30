// @flow

import React from "react";

type Props = {|
  vehicleId: ?string,
|};

const options = [
  {
    name: "university",
    message: "I'm a University of Oxford employee or student",
  },
  {
    name: "company",
    message: "I'm a Begbroke company employee",
  },
  {
    name: "visitor",
    message: "I'm a visitor",
  },
];

export default function CheckInPage({ vehicleId }: Props) {
  return (
    <main className="check-in-container">
      <h1>Check in to bus {vehicleId}</h1>
      <section className="options-container">
        {options.map(({ name, message }) => (
          <div key={name} className="option">
            {message}
          </div>
        ))}
      </section>
    </main>
  );
}
