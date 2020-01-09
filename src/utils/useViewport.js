// @flow

import { useEffect, useState } from "react";

import WebMercatorViewport from "viewport-mercator-project";

export const PANEL_WIDTH = 32 * 16;

export default function useViewport() {
  const [viewport, setViewport] = useState<WebMercatorViewport>(
    getDefaultViewport()
  );

  useEffect(() => {
    const resetViewport = () => setViewport(getDefaultViewport);
    window.addEventListener("resize", resetViewport);
    return () => window.removeEventListener("resize", resetViewport);
  }, []);

  return [viewport, setViewport];
}

function getDefaultViewport(defaultViewport?: WebMercatorViewport) {
  const padding = 64;
  const width = Math.max(window.innerWidth - PANEL_WIDTH, padding * 3);
  const height = window.innerHeight;
  return defaultViewport
    ? new WebMercatorViewport({ ...defaultViewport, width, height })
    : new WebMercatorViewport({ width, height }).fitBounds(
        [
          [-1.3066886590125932, 51.81811946797804],
          [-1.2556090514719926, 51.75453480503126]
        ],
        {
          padding
        }
      );
}
