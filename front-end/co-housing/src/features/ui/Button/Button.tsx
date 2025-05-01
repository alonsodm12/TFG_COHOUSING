import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../index.css';


interface ButtonProps {
  label: string;
  to: string;
  state?: any; // 👈 opcional
}

const Button: React.FC<ButtonProps> = ({ label, to, state }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (state) {
      navigate(to, { state });
    } else {
      navigate(to);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
