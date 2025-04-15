import React from "react";
import styles from "../pages/LandingPage.module.css";

interface CardProps {
  title: string;
  description: string;
  emoji: string;  // Añadimos una propiedad emoji para hacerlo más flexible
  additionalText: string;  // Añadimos una propiedad para el texto adicional
}

const Card: React.FC<CardProps> = ({ title, description, emoji, additionalText }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className={styles.emoji}>{emoji}</span> {/* Emoji debajo del texto */}
      <p className={styles.additionalText}>{additionalText}</p> {/* Texto adicional */}
    </div>
  );
};

export default Card;
