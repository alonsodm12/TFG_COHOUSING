import React from "react";
import styles from "../pages/LandingPage.module.css";
import Card from "./Card";

export const Opiniones: React.FC = () => {
  return (
    <section className={styles.container}>

      <div className={styles.cardsWrapper}>
        <h1>Lo que dicen nuestros usuarios</h1>
        <div className={styles.cardsContainer}>
          <Card 
            title="Laura García"
            description="ShareSpace me ha ayudado a encontrar un lugar perfecto para vivir con amigos. Es fácil de usar y todo está organizado."
            emoji="🌟"
            additionalText="Una experiencia increíble"
          />
          <Card 
            title="Juan Pérez"
            description="Me encanta lo fácil que es gestionar las tareas del día a día con la plataforma. Además, la comunidad es muy activa."
            emoji="👏"
            additionalText="¡Altamente recomendado!"
          />
          <Card 
            title="María López"
            description="La seguridad y privacidad son lo más importante para mí, y ShareSpace ofrece ambas cosas con su sistema de autenticación."
            emoji="🔒"
            additionalText="Me siento seguro usando esta plataforma"
          />
        </div>
      </div>
    </section>
  );
};

