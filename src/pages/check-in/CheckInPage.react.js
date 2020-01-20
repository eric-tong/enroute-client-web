// @flow

import "../../styles/checkmark.scss";
import "../../styles/check-in.scss";

import type { Department } from "../../utils/useDepartment";
import React from "react";
import useDepartment from "../../utils/useDepartment";

type Props = {|
  vehicleRegistration: ?string
|};

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
