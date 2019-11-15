// @flow

import WebMercatorViewport from "viewport-mercator-project";

const viewport = new WebMercatorViewport({
  width: window.innerWidth,
  height: window.innerHeight,
}).fitBounds(
  [
    [-1.3066886590125932, 51.81811946797804],
    [-1.2556090514719926, 51.75453480503126],
  ],
  { padding: 64 }
);

export default viewport;
