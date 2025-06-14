import React from "react";
import "../../public/css/PinaLoader.css";

export default function PinaLoader() {
  return (
    <div className="pina-loader-container">
      <img
        src="/pina-bailando.gif"
        alt="Cargando..."
        className="pina-loader"
      />
      <p>Cargando...</p>
    </div>
  );
}