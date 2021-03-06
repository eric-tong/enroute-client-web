// @flow

import "../../styles/panel.scss";

import { Route, Switch } from "react-router-dom";

import BusStopDetailView from "../bus-stop-detail/BusStopDetailView.react";
import DepartureBoard from "../departure-board/DepartureBoard.react";
import Map from "./Map.react";
import { PANEL_WIDTH } from "../../utils/useViewport";
import React from "react";
import VehicleDetailView from "../vehicle-detail/VehicleDetailView.react";

type Props = {|
  mapOnly?: boolean
|};

function MapPage({ mapOnly = false }: Props) {
  return (
    <>
      <Map fullWidth={mapOnly} />
      {!mapOnly && <Panel />}
    </>
  );
}

function Panel() {
  return (
    <section id="panel" style={{ width: PANEL_WIDTH }}>
      <Switch>
        <Route
          path="/stop/:busStopUrl"
          render={props =>
            props.match.params.busStopUrl ? (
              <BusStopDetailView busStopUrl={props.match.params.busStopUrl} />
            ) : null
          }
        />
        <Route
          path="/vehicle/:vehicleRegistration"
          render={props =>
            props.match.params.vehicleRegistration ? (
              <VehicleDetailView
                registration={props.match.params.vehicleRegistration}
              />
            ) : null
          }
        />
        <Route path="/" component={DepartureBoard} />
      </Switch>
    </section>
  );
}

export default MapPage;
