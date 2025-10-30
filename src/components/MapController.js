import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], map.getZoom());
    }
  }, [position, map]);

  return null;
};

export default MapController;
