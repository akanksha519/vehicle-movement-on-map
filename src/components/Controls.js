import React from "react";

const Controls = ({ isPaused, onPauseToggle, onSpeedChange, onRestart, speed }) => {
  return (
    <div
      style={{
        margin: "15px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onPauseToggle}
        style={{
          padding: "8px 16px",
          backgroundColor: isPaused ? "#4caf50" : "#f44336",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "0.3s",
        }}
      >
        {isPaused ? "▶ Resume" : "⏸ Pause"}
      </button>

      <button
        onClick={onRestart}
        style={{
          padding: "8px 16px",
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "0.3s",
        }}
      >
        🔄 Restart
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label htmlFor="speedRange" style={{ fontSize: "14px", fontWeight: "bold" }}>
          Speed:
        </label>
        <input
          id="speedRange"
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          style={{ cursor: "pointer" }}
        />
        <span style={{ fontWeight: "bold" }}>{speed.toFixed(1)}x</span>
      </div>
    </div>
  );
};

export default Controls;
