// @flow

import { useEffect, useState } from "react";

import WebMercatorViewport from "viewport-mercator-project";

export const PANEL_WIDTH = 33 * 16;
const MEDIUMSCREEN_WIDTH = 768;

export default function useViewport(fullWidth: boolean) {
  const [viewport, setViewport] = useState<?WebMercatorViewport>(
    getDefaultViewport()
  );

  useEffect(() => {
    const resetViewport = () => setViewport(getDefaultViewport);
    window.addEventListener("resize", resetViewport);
    return () => window.removeEventListener("resize", resetViewport);
  }, []);

  return [viewport, setViewport];

  function getDefaultViewport(defaultViewport?: ?WebMercatorViewport) {
    if (!fullWidth && window.innerWidth < MEDIUMSCREEN_WIDTH) return null;

    const padding = 64;
    const width = fullWidth
      ? window.innerWidth
      : Math.max(window.innerWidth - PANEL_WIDTH, padding * 3);
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
}
