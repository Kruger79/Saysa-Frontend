// src/components/BananoLoader.jsx
import React from "react";
import "../../public/css/BananoLoader.css";

export default function BananoLoader() {
  return (
    <div className="banano-overlay">
      <img
        src="../../public/banano-bailando.gif"
        alt="Cerrando sesión..."
        className="banano-loader"
      />
      <p className="texto-cierre">Cerrando sesión...</p>
    </div>
  );
}
