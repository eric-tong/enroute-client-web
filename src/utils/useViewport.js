// @flow

import { useContext, useEffect, useState } from "react";
import { _MapContext as MapContext } from "react-map-gl";

export default function useViewport(longitude: number, latitude: number) {
  const [isZooming, setIsZooming] = useState(false);
  const { isDragging, viewport } = useContext(MapContext);

  const [left, top] = viewport.project([longitude, latitude]);
  useEffect(() => {
    setIsZooming(true);
    const id = setInterval(() => setIsZooming(false), 300);
    return () => clearInterval(id);
  }, [viewport.zoom]);

  return { left, top, isDragging, isZooming };
}
