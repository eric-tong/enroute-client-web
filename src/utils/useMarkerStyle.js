// @flow

import { useContext, useEffect, useState } from "react";
import { _MapContext as MapContext } from "react-map-gl";

type MarkerStyleType = {
  position: "absolute",
  left: number,
  top: number,
  transition: string,
};

export default function useMarkerStyle(
  longitude: number,
  latitude: number
): MarkerStyleType {
  const [isZooming, setIsZooming] = useState(false);
  const { isDragging, viewport } = useContext(MapContext);

  useEffect(() => {
    setIsZooming(true);
    const id = setInterval(() => setIsZooming(false), 300);
    return () => clearInterval(id);
  }, [viewport.zoom]);

  const [left, top] = viewport.project([longitude, latitude]);
  const transition =
    !isDragging && !isZooming
      ? "left 200ms, top 200ms, transform 200ms"
      : "none";

  return { position: "absolute", left, top, transition };
}
