import React from "react";
import "../../public/css/LoadingOverlay.css";

export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Cerrando sesión...</p>
    </div>
  );
}
