// @flow

import "../../styles/checkmark.scss";

import React, { useState } from "react";

type Props = {|
  vehicleId: ?string,
|};
type UserType = $Keys<typeof userTypeNames>;

const userTypes: UserType[] = ["university", "company", "visitor"];
const userTypeNames: { [UserType]: string } = {
  university: "University of Oxford employee or student",
  company: "Begbroke company employee",
  visitor: "visitor",
};

export default function CheckInPage({ vehicleId }: Props) {
  const [userType, setUserType] = useState<?UserType>();

  const header = vehicleId ? `Check in to bus ${vehicleId}` : "No bus found";
  const body = vehicleId ? (
    userType ? (
      <ConfirmationSection userType={userType} />
    ) : (
      <OptionsList vehicleId={vehicleId} onItemClick={setUserType} />
    )
  ) : (
    undefined
  );

  return (
    <main className="check-in-container">
      <header>
        <h1>{header}</h1>
      </header>
      {body}
    </main>
  );
}

function ConfirmationSection({ userType }: { userType: UserType }) {
  return (
    <section className="confirmation">
      <CheckMark isLoading={false} />
      <h2>Check in successful</h2>
      <p>Checked in as {userTypeNames[userType]}. Change.</p>
    </section>
  );
}

function CheckMark({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`circle-loader ${!isLoading ? "load-complete" : ""}`}>
      {!isLoading && <div className="checkmark draw"></div>}
    </div>
  );
}

function OptionsList({
  vehicleId,
  onItemClick,
}: {
  vehicleId: string,
  onItemClick: UserType => void,
}) {
  return (
    <section className="options-container">
      {userTypes.map(type => (
        <div
          key={type}
          onClick={() => onItemClick(type)}
          className="option"
        >{`I'm a ${userTypeNames[type]}`}</div>
      ))}
    </section>
  );
}
