import React from "react";

interface BarraProgresoProps {
  porcentaje: number;
  size?: number; // tamaño opcional del círculo
}

const BarraProgreso: React.FC<BarraProgresoProps> = ({ porcentaje, size = 100 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (porcentaje / 100) * circumference;

  let color = "";
  if (porcentaje < 30) {
    color = "#ef4444"; // rojo
  } else if (porcentaje < 70) {
    color = "#facc15"; // amarillo
  } else {
    color = "#22c55e"; // verde
  }

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          fontWeight="bold"
        >
          {porcentaje}%
        </text>
      </svg>
    </div>
  );
};

export default BarraProgreso;
