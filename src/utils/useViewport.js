// @flow

import { useEffect, useState } from "react";

import WebMercatorViewport from "viewport-mercator-project";

export default function useViewport() {
  const [viewport, setViewport] = useState<WebMercatorViewport>(
    getDefaultViewport()
  );

  useEffect(() => {
    const resetViewport = () => setViewport(() => getDefaultViewport());
    window.addEventListener("resize", resetViewport);
    return () => window.removeEventListener("resize", resetViewport);
  }, []);

  return [viewport, setViewport];
}

function getDefaultViewport() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortrait = height > width;
  const padding = 64;
  return new WebMercatorViewport({ width, height }).fitBounds(
    [
      [-1.3066886590125932, 51.81811946797804],
      [-1.2556090514719926, 51.75453480503126],
    ],
    {
      padding: {
        bottom: isPortrait ? height / 2 : padding,
        right: isPortrait ? padding : width / 2,
        top: padding,
        left: padding,
      },
    }
  );
}
