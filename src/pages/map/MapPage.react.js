// @flow

import "../../styles/panel.scss";

import { Route, Switch } from "react-router-dom";

import BusStopDetailView from "./panel/BusStopDetailView.react";
import DepartureBoard from "./panel/DepartureBoard.react";
import Map from "./Map.react";
import MenuButton from "../misc/MenuButton.react";
import { PANEL_WIDTH } from "../../utils/useViewport";
import React from "react";

function MapPage() {
  return (
    <>
      <Map />
      <section id="panel" style={{ width: PANEL_WIDTH }}>
        <MenuButton />
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
    </>
  );
}

export default MapPage;
