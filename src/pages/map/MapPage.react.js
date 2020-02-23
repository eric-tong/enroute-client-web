// @flow

import "../../styles/panel.scss";

import { Route, Switch } from "react-router-dom";

import BusStopDetailView from "./panel/BusStopDetailView.react";
import DepartureBoard from "./panel/DepartureBoard.react";
import Map from "./Map.react";
import { PANEL_WIDTH } from "../../utils/useViewport";
import React from "react";

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
        <Route path="/" component={DepartureBoard} />
      </Switch>
    </section>
  );
}

export default MapPage;
