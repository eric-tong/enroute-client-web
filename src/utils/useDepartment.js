// @flow

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { gql } from "apollo-boost";

export type Department = {|
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
    $departmentType: String!
    $vehicleRegistration: String!
  ) {
    createNewCheckIn(
      departmentType: $departmentType
      vehicleRegistration: $vehicleRegistration
    )
  }
`;
const CHECK_OUT = gql`
  mutation checkOut($id: Int!) {
    checkOut(id: $id)
  }
`;

export default function useDepartment(
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
  const [checkInId, checkIn, checkOut] = useDeferredCheckInId();

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
    } else {
      checkOut();
      localStorage.removeItem("department");
    }
    setSelectedDepartment(department);
  };

  return {
    selectedDepartment,
    departments: departmentsData.departments,
    setDepartment: onSelectDepartment,
    status
  };
}

function useDeferredCheckInId() {
  const [checkIn, { data: checkInData }] = useMutation(CREATE_NEW_CHECK_IN);
  const [checkOut, { data: checkOutData }] = useMutation(CHECK_OUT);
  const checkInId = checkInData?.createNewCheckIn;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deferredCheckIn = (...args) => {
    checkIn(...args);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (checkOutData && checkOutData.id === 1)
    console.error("Tried to delete check in entry that doesn't exist");

  return [
    isLoading ? undefined : checkInId,
    deferredCheckIn,
    () => checkOut({ variables: { id: checkInId } })
  ];
}
