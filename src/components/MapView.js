import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import Controls from "./Controls";
import GradientPolyline from "./GradientPolyline";
import MapController from "./MapController";
import InfoPanel from "./InfoPanel";

const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61168.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Helper: interpolate between two coordinates
const interpolatePosition = (start, end, factor) => ({
  latitude: start.latitude + (end.latitude - start.latitude) * factor,
  longitude: start.longitude + (end.longitude - start.longitude) * factor,
});

const MapView = () => {
  const [decodedRoute, setDecodedRoute] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [path, setPath] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(null);

  // Fetch and decode route data
  useEffect(() => {
    fetch("/data/dummy-route.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.length) {
          console.error("No route data found in JSON");
          return;
        }
        const formatted = data.map((p) => ({
          latitude: p.latitude,
          longitude: p.longitude,
        }));
        setDecodedRoute(formatted);
        setVehiclePosition(formatted[0]);
        setPath([formatted[0]]);
      })
      .catch((err) => console.error("Error loading route data:", err));
  }, []);

  // Simulate movement
  useEffect(() => {
    if (decodedRoute.length < 2 || isFinished) return;

    const animateStep = () => {
      if (isPaused || isAnimating) return;
      setIsAnimating(true);
      const start = decodedRoute[index];
      const end = decodedRoute[index + 1];
      let progress = 0;

      const duration = 1000 / speed;
      const stepTime = 20;
      const totalSteps = duration / stepTime;

      const step = () => {
        if (isPaused) return;
        progress += 1 / totalSteps;
        if (progress >= 1) progress = 1;

        const newPos = interpolatePosition(start, end, progress);
        setVehiclePosition(newPos);
        setPath((prev) => [...prev.slice(0, index + 1), newPos]);

        if (progress < 1) {
          animationRef.current = setTimeout(step, stepTime);
        } else {
          setIndex((prev) => {
            const next = prev + 1;
            if (next < decodedRoute.length - 1) {
              setIsAnimating(false);
              return next;
            } else {
              clearInterval(intervalRef.current);
              setIsFinished(true);
              clearInterval(timeRef.current);
              return prev;
            }
          });
        }
      };
      step();
    };

    intervalRef.current = setInterval(animateStep, 1000 / speed);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(animationRef.current);
    };
  }, [index, isPaused, speed, isFinished, decodedRoute]);

  // Track elapsed time
  useEffect(() => {
    if (isPaused || isFinished) return;
    timeRef.current = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timeRef.current);
  }, [isPaused, isFinished]);

  const togglePause = () => setIsPaused((prev) => !prev);
  const handleSpeedChange = (value) => setSpeed(Number(value));

  const restartSimulation = () => {
    clearInterval(intervalRef.current);
    clearTimeout(animationRef.current);
    clearInterval(timeRef.current);
    if (decodedRoute.length > 0) {
      setVehiclePosition(decodedRoute[0]);
      setPath([decodedRoute[0]]);
    }
    setIndex(0);
    setIsPaused(false);
    setIsAnimating(false);
    setIsFinished(false);
    setElapsedTime(0);
  };

  if (!vehiclePosition) return <p>Loading route...</p>;

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      

      <Controls
        isPaused={isPaused}
        onPauseToggle={togglePause}
        onSpeedChange={handleSpeedChange}
        onRestart={restartSimulation}
        speed={speed}
      />

      <InfoPanel position={vehiclePosition} elapsedTime={elapsedTime} speed={speed} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MapContainer
            center={[decodedRoute[0].latitude, decodedRoute[0].longitude]}
            zoom={12}
            style={{
              height: "70vh",
              width: "95%",
              maxWidth: "1200px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
             }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <GradientPolyline path={path} totalLength={decodedRoute.length} />
          <Marker
            position={[vehiclePosition.latitude, vehiclePosition.longitude]}
            icon={vehicleIcon}
          >
            <Popup>
              Vehicle at [{vehiclePosition.latitude.toFixed(5)},{" "}
              {vehiclePosition.longitude.toFixed(5)}]
            </Popup>
          </Marker>
          <MapController position={vehiclePosition} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
