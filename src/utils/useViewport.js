// @flow

import { useEffect, useState } from "react";

import WebMercatorViewport from "viewport-mercator-project";

export const PANEL_WIDTH = 33 * 16;
const MEDIUMSCREEN_WIDTH = 768;

export default function useViewport(fullWidth: boolean) {
  const [viewport, setViewport] = useState<?WebMercatorViewport>(
    getDefaultViewport(undefined, fullWidth)
  );

  useEffect(() => {
    setViewport(viewport => getDefaultViewport(viewport, fullWidth));
  }, [fullWidth]);

  useEffect(() => {
    const resetViewport = () =>
      setViewport(viewport => getDefaultViewport(viewport, fullWidth));
    window.addEventListener("resize", resetViewport);
    return () => window.removeEventListener("resize", resetViewport);
  }, [fullWidth]);

  return [showMap() ? viewport : null, setViewport];

  function showMap() {
    return fullWidth || window.innerWidth > MEDIUMSCREEN_WIDTH;
  }
}

function getDefaultViewport(
  defaultViewport: ?WebMercatorViewport,
  fullWidth: boolean
) {
  const padding = 64;
  const width = fullWidth
    ? window.innerWidth
    : Math.max(window.innerWidth - PANEL_WIDTH, padding * 3);
  const height = window.innerHeight;
  return new WebMercatorViewport({ width, height }).fitBounds(
    [
      [-1.3066886590125932, 51.81811946797804],
      [-1.2556090514719926, 51.75453480503126]
    ],
    {
      padding: {
        top: padding,
        left: padding,
        right: padding,
        bottom: fullWidth ? padding * 2 : padding
      }
    }
  );
}
