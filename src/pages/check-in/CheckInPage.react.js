// @flow

import "../../styles/checkmark.scss";
import "../../styles/check-in.scss";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { gql } from "apollo-boost";

type Props = {|
  vehicleRegistration: ?string
|};
type Department = {|
  type: string,
  name: string
|};
type Status = "departmentsList" | "loading" | "confirmed" | "error";

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
  const {
    selectedDepartment,
    departments,
    setDepartment,
    status
  } = useDepartment(vehicleRegistration ?? "");

  // TODO check for vehicle validity, return vehicle selection page
  if (!vehicleRegistration) return "No bus found";

  const body =
    status === "departmentsList" ? (
      <DepartmentsListSection
        departments={departments}
        onItemClick={setDepartment}
      />
    ) : (
      <ConfirmationSection
        isLoading={status === "loading"}
        departmentName={selectedDepartment?.name ?? ""}
        onChangeClick={() => setDepartment()}
      />
    );
  return (
    <main className="check-in-container">
      <header>
        <h1>Check in to bus {vehicleRegistration}</h1>
      </header>
      {body}
    </main>
  );
}

function CheckMark({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`circle-loader ${!isLoading ? "load-complete" : ""}`}>
      {!isLoading && <div className="checkmark draw"></div>}
    </div>
  );
}

function DepartmentsListSection({
  departments,
  onItemClick
}: {
  departments: Department[],
  onItemClick: Department => void
}) {
  return (
    <section className="options-container">
      {departments.map(department => (
        <div
          key={department.type}
          onClick={() => onItemClick(department)}
          className="option"
        >{`I'm a ${department.name}`}</div>
      ))}
    </section>
  );
}

function ConfirmationSection({
  isLoading,
  departmentName,
  onChangeClick
}: {
  isLoading: boolean,
  departmentName: string,
  onChangeClick: () => void
}) {
  return (
    <section className="confirmation">
      <div className="half-section">
        <CheckMark isLoading={isLoading} />
      </div>
      <div className="half-section">
        <h2>{isLoading ? "Checking in..." : "Check in successful"}</h2>
        {!isLoading && (
          <p>
            Checked in as a {departmentName}.{" "}
            <button onClick={onChangeClick}>Change.</button>
          </p>
        )}
      </div>
    </section>
  );
}

function useDepartment(
  vehicleRegistration: string
): {
  selectedDepartment: ?Department,
  departments: Department[],
  setDepartment: (?Department) => void,
  status: Status
} {
  const { data: departmentsData = { departments: [] } } = useQuery(DEPARTMENTS);
  const [selectedDepartment, setSelectedDepartment] = useState<?Department>();
  const [checkIn, checkInId] = useDeferredCheckInId();

  const status = selectedDepartment
    ? checkInId
      ? "confirmed"
      : "loading"
    : "departmentsList";
  const onSelectDepartment = (department: ?Department) => {
    if (department) {
      checkIn({
        variables: { userType: department.type, vehicleRegistration }
      });
    }
    setSelectedDepartment(department);
  };

  console.log({ selectedDepartment, checkInId, status });

  return {
    selectedDepartment,
    departments: departmentsData.departments,
    setDepartment: onSelectDepartment,
    status
  };
}

function useDeferredCheckInId() {
  const [checkIn, { data: checkInData }] = useMutation(CREATE_NEW_CHECK_IN);
  const checkInId = checkInData?.createNewCheckIn;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deferredCheckIn = (...args) => {
    checkIn(...args);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return [deferredCheckIn, isLoading ? undefined : checkInId];
}
