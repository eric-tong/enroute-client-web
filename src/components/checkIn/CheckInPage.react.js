// @flow

import "../../styles/checkmark.scss";

import React, { useEffect, useState } from "react";

type Props = {|
  vehicleId: ?string,
|};
/* eslint-disable-next-line no-use-before-define */
type UserType = $Keys<typeof userTypeNames>;

const userTypes: UserType[] = ["university", "company", "visitor"];
const userTypeNames: { [UserType]: string } = {
  university: "University of Oxford employee or student",
  company: "Begbroke company employee",
  visitor: "visitor",
};

export default function CheckInPage({ vehicleId }: Props) {
  const [userType, setUserType] = useUserType();

  const header = vehicleId ? `Check in to bus ${vehicleId}` : "No bus found";
  const body = !vehicleId ? (
    undefined
  ) : userType ? (
    <ConfirmationSection
      userType={userType}
      onButtonClick={() => setUserType()}
    />
  ) : (
    <OptionsList vehicleId={vehicleId} onItemClick={setUserType} />
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

function ConfirmationSection({
  userType,
  onButtonClick,
}: {
  userType: UserType,
  onButtonClick: () => void,
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="confirmation">
      <div className="half-section">
        <CheckMark isLoading={isLoading} />
      </div>
      <div className="half-section">
        <h2>{isLoading ? "Checking in..." : "Check in successful"}</h2>
        {!isLoading && (
          <p>
            Checked in as a {userTypeNames[userType]}.{" "}
            <a onClick={onButtonClick}>Change.</a>
          </p>
        )}
      </div>
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

function useUserType() {
  const [userType, setUserType] = useState<?UserType>(
    localStorage.getItem("userType")
  );
  return [
    userType,
    (newUserType: ?UserType) => {
      if (newUserType) {
        localStorage.setItem("userType", newUserType);
      } else {
        localStorage.removeItem("userType");
      }
      setUserType(newUserType);
    },
  ];
}
