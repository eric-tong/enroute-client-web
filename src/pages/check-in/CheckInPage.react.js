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
  mutation createNewCheckIn(
    $departmentType: String
    $vehicleRegistration: String!
  ) {
    createNewCheckIn(
      departmentType: $departmentType
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
    ) : status === "loading" || status === "confirmed" ? (
      <ConfirmationSection
        isLoading={status === "loading"}
        departmentName={selectedDepartment?.name ?? ""}
        onChangeClick={() => setDepartment()}
      />
    ) : (
      <ErrorSection />
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

function ErrorSection() {
  return (
    <section className="confirmation">
      <div className="half-section"></div>
      <div className="half-section">
        <h2>An error has occurred</h2>
        <p>Refresh this page to try again.</p>
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
  const previousDepartmentString = localStorage.getItem("department");
  const [selectedDepartment, setSelectedDepartment] = useState<?Department>(
    previousDepartmentString ? JSON.parse(previousDepartmentString) : undefined
  );
  const [checkIn, checkInId] = useDeferredCheckInId();

  useEffect(() => {
    if (selectedDepartment) {
      checkIn({
        variables: {
          departmentType: selectedDepartment.type,
          vehicleRegistration
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = selectedDepartment
    ? checkInId
      ? checkInId > 0
        ? "confirmed"
        : "error"
      : "loading"
    : "departmentsList";
  const onSelectDepartment = (department: ?Department) => {
    if (department) {
      checkIn({
        variables: {
          departmentType: department.type,
          vehicleRegistration
        }
      });
      localStorage.setItem("department", JSON.stringify(department));
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
