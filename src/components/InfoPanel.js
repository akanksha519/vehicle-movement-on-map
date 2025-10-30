import React from "react";

const InfoPanel = ({ position, elapsedTime, speed }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "10px 15px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        maxWidth: "300px",
        margin: "10px auto",
        textAlign: "left",
        fontSize: "14px",
      }}
    >
      <h4 style={{ marginBottom: "8px", textAlign: "center" }}>📍 Vehicle Info</h4>
      <p>
        <strong>Latitude:</strong> {position.latitude.toFixed(5)}
      </p>
      <p>
        <strong>Longitude:</strong> {position.longitude.toFixed(5)}
      </p>
      <p>
        <strong>Elapsed Time:</strong> {elapsedTime}s
      </p>
      <p>
        <strong>Speed:</strong> {speed.toFixed(1)}x
      </p>
    </div>
  );
};

export default InfoPanel;
