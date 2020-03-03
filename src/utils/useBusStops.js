// @flow

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const BUS_STOPS = gql`
  {
    busStops {
      id
      name
      direction
      isTerminal
    }
  }
`;

export default function useBusStops() {
  const { loading, error, data } = useQuery(BUS_STOPS);
  if (loading || error) return [];
  else return data.busStops;
}
