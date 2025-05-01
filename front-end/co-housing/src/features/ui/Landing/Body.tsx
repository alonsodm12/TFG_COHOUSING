import React from "react";
import styles from "./LandingPage.module.css";
import Card from "../Card";

import Button from "../Button/Button";

export const Body: React.FC = () => {

  return (
    <section className={styles.container}>
      <div className={styles.headerText}>
        <h1 className={styles.typingH1}>SHARE-SPACE</h1>
        <p className={styles.typingP}>TU ESPACIO COMPARTIDO PARA CREAR Y GESTIONAR TU NUEVA VIDA</p>
      </div>

      <div className={styles.imagecontainer}>
        <div className={styles.imageWrapper}>
          <img src="/TFG_COHOUSING/images/izquierda-usando3.png" alt="Imagen 1" className={styles.image} />
          <p className={styles.caption}>🏘️¿Buscas una nueva comunidad?</p>
        </div>
        <div className={styles.imageWrapper}>
          <img src="/TFG_COHOUSING/images/derecha-usando.png" alt="Imagen 2" className={styles.image2} />
          <p className={styles.caption}>🧍¿Buscas un nuevo miembro?</p>
        </div>


      </div>
      <section className="w-full text-black py-20 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4">Vive en comunidad. Encuentra tu lugar.</h1>
        <p className="text-lg mb-8">Una plataforma para conectar buscadores y creadores de comunidades de cohousing.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/buscar" className="btn">🔍 Buscar Comunidad</a>
          <a href="/ofrecer" className="btn btn-outline">📤 Publicar Comunidad</a>
        </div>
      </section>
      <Button label="EMPEZAR YA" to="/TFG_COHOUSING/registro" />
      <div className={styles.cardsWrapper}>
        <h1 className={styles.typingP}>Lo que dicen nuestros usuarios</h1>
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
