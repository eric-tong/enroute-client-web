// @flow

import "../../styles/checkmark.scss";
import "../../styles/check-in.scss";

import React, { useEffect, useState } from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {| vehicleId: ?string |};
type UserType = string;
type Department = {| type: UserType, name: string |};

const DEPARTMENTS = gql`
  {
    departments {
      type
      name
    }
  }
`;

export default function CheckInPage({ vehicleId }: Props) {
  const [userType, userTypes, setUserType] = useUserType();

  const header = vehicleId ? `Check in to bus ${vehicleId}` : "No bus found";
  const body = !vehicleId ? (
    undefined
  ) : userType ? (
    <ConfirmationSection
      userTypeName={userTypes.find(({ type }) => userType === type)?.name}
      onButtonClick={() => setUserType()}
    />
  ) : (
    <OptionsList
      options={userTypes}
      vehicleId={vehicleId}
      onItemClick={setUserType}
    />
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
  userTypeName,
  onButtonClick
}: {
  userTypeName: ?string,
  onButtonClick: () => void
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
            Checked in as a {userTypeName}.{" "}
            <button onClick={onButtonClick}>Change.</button>
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
  options,
  vehicleId,
  onItemClick
}: {
  options: Department[],
  vehicleId: string,
  onItemClick: UserType => void
}) {
  return (
    <section className="options-container">
      {options.map(({ type, name }) => (
        <div
          key={type}
          onClick={() => onItemClick(type)}
          className="option"
        >{`I'm a ${name}`}</div>
      ))}
    </section>
  );
}

function useUserType(): [?UserType, Department[], (?UserType) => void] {
  const [userType, setUserType] = useState<?UserType>(
    localStorage.getItem("userType")
  );
  const { data = { departments: [] } } = useQuery(DEPARTMENTS);
  return [
    userType,
    data.departments,
    (newUserType: ?UserType) => {
      if (newUserType) {
        localStorage.setItem("userType", newUserType);
      } else {
        localStorage.removeItem("userType");
      }
      setUserType(newUserType);
    }
  ];
}
