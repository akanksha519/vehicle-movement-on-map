import React from "react";
import { Polyline } from "react-leaflet";

// Helper functions
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const interpolateColor = (startColor, endColor, factor) => {
  const result = startColor.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (endColor[i] - startColor[i]));
  }
  return `rgb(${result.join(",")})`;
};

const GradientPolyline = ({ path, totalLength }) => {
  const startColor = hexToRgb("#00ff00"); // green
  const endColor = hexToRgb("#ff0000"); // red
  const segments = [];

  for (let i = 0; i < path.length - 1; i++) {
    const factor = i / (totalLength - 1);
    const color = interpolateColor(startColor, endColor, factor);
    segments.push({
      positions: [
        [path[i].latitude, path[i].longitude],
        [path[i + 1].latitude, path[i + 1].longitude],
      ],
      color,
    });
  }

  return (
    <>
      {segments.map((seg, i) => (
        <Polyline key={i} positions={seg.positions} color={seg.color} />
      ))}
    </>
  );
};

export default GradientPolyline;
