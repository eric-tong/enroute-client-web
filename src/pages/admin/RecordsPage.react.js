// @flow

import "../../styles/history.scss";

import React, { useState } from "react";

import { DateTime } from "luxon";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useTable } from "react-table";

const AVLS = gql`
  query getAvls($date: String!) {
    avls(date: $date) {
      id
      priority
      timestamp
      altitude
      longitude
      latitude
      angle
      satellites
      speed
      vehicleId
    }
  }
`;

export default function RecordsPage() {
  const { date, increment, decrement } = useDate();
  const avls = useAvl(date);

  return (
    <>
      <div>
        <button onClick={decrement}>&larr;</button> &nbsp;
        {date.toLocaleString(DateTime.DATE_HUGE)}&nbsp;
        <button onClick={increment} className={increment ? "" : "disabled"}>
          &rarr;
        </button>
      </div>
      {avls ? (
        <Table
          columns={[
            { Header: "Id", accessor: "id" },
            { Header: "Priority", accessor: "priority" },
            { Header: "Timestamp", accessor: "timestamp" },
            { Header: "Altitude", accessor: "altitude" },
            { Header: "Longitude", accessor: "longitude" },
            { Header: "Latitude", accessor: "latitude" },
            { Header: "Angle", accessor: "angle" },
            { Header: "Satellites", accessor: "satellites" },
            { Header: "Speed", accessor: "speed" },
            { Header: "VehicleId", accessor: "vehicleId" }
          ]}
          data={avls}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function useDate() {
  const today = DateTime.local().startOf("day");
  const [date, setDate] = useState(today);
  const isToday = today.valueOf() === date.valueOf();
  return {
    date,
    increment: isToday
      ? undefined
      : () => setDate(date => date.plus({ day: 1 })),
    decrement: () => setDate(date => date.minus({ day: 1 }))
  };
}

function useAvl(date: DateTime) {
  const { loading, error, data } = useQuery(AVLS, {
    variables: { date: date.toISO() }
  });

  if (!loading && !error) {
    return data.avls.map(avl => ({
      ...avl,
      timestamp: DateTime.fromMillis(parseInt(avl.timestamp)).toISO()
    }));
  }
}
