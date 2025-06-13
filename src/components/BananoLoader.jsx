import React from "react";
import "../../public/css/BananoLoader.css";

export default function PinaLoader() {
  return (
    <div className="pina-loader-container">
      <img
        src="../../public/banano-bailando.gif"
        alt="Cargando..."
        className="banano-loader"
      />
      <p>Cargando...</p>
    </div>
  );
}