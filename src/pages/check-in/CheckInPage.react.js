// @flow

import "../../styles/checkmark.scss";
import "../../styles/check-in.scss";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { gql } from "apollo-boost";

type Props = {| vehicleRegistration: ?string |};
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
const CREATE_NEW_CHECK_IN = gql`
  mutation createNewCheckIn($userType: String, $vehicleRegistration: String!) {
    createNewCheckIn(
      userType: $userType
      vehicleRegistration: $vehicleRegistration
    )
  }
`;

export default function CheckInPage({ vehicleRegistration }: Props) {
  const [userType, checkInId, userTypes, setUserType] = useUserType(
    vehicleRegistration ?? ""
  );

  const header = vehicleRegistration
    ? `Check in to bus ${vehicleRegistration}`
    : "No bus found";
  const body = !vehicleRegistration ? (
    undefined
  ) : userType ? (
    <ConfirmationSection
      checkInId={checkInId}
      userTypeName={userTypes.find(({ type }) => userType === type)?.name}
      onButtonClick={() => setUserType()}
    />
  ) : (
    <OptionsList options={userTypes} onItemClick={setUserType} />
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
  onButtonClick,
  checkInId
}: {
  userTypeName: ?string,
  onButtonClick: () => void,
  checkInId: number
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  if (checkInId === 0)
    return (
      <section className="confirmation">
        <h2>An error has occurred. Please try again.</h2>
      </section>
    );

  const showConfirmation = !isLoading && checkInId > -1;

  return (
    <section className="confirmation">
      <div className="half-section">
        <CheckMark isLoading={!showConfirmation} />
      </div>
      <div className="half-section">
        <h2>{showConfirmation ? "Check in successful" : "Checking in..."}</h2>
        {showConfirmation && (
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
  onItemClick
}: {
  options: Department[],
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

function useUserType(
  vehicleRegistration: string
): [?UserType, number, Department[], (?UserType) => void] {
  const [userType, setUserType] = useState<?UserType>(
    localStorage.getItem("userType")
  );
  const { data: departmentsData = { departments: [] } } = useQuery(DEPARTMENTS);
  const [
    checkIn,
    { data: checkInData = { createNewCheckIn: -1 } }
  ] = useMutation(CREATE_NEW_CHECK_IN);

  useEffect(() => {
    if (userType && vehicleRegistration)
      checkIn({ variables: { userType, vehicleRegistration } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({
    id: checkInData.createNewCheckIn,
    userType,
    vehicleRegistration
  });

  return [
    userType,
    checkInData.createNewCheckIn,
    departmentsData.departments,
    (newUserType: ?UserType) => {
      if (newUserType) {
        checkIn({ variables: { userType: newUserType, vehicleRegistration } });
        localStorage.setItem("userType", newUserType);
      } else {
        checkIn({ variables: { userType: undefined, vehicleRegistration } });
        localStorage.removeItem("userType");
      }
      setUserType(newUserType);
    }
  ];
}
