import React from "react";

interface BarraProgresoProps {
  porcentaje: number;
}

const BarraProgreso: React.FC<BarraProgresoProps> = ({ porcentaje }) => {
  let color = "";

  if (porcentaje < 30) {
    color = "red";
  } else if (porcentaje < 70) {
    color = "yellow";
  } else {
    color = "green";
  }

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, height: 20, width: "100%" }}>
      <div
        style={{
          width: `${porcentaje}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.3s ease",
          borderRadius: 4
        }}
      />
    </div>
  );
};

export default BarraProgreso;