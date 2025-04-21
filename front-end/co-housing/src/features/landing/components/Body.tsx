import React from "react";
import styles from "../pages/LandingPage.module.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export const Body: React.FC = () => {

  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/TFG_COHOUSING/registro");
  };



  return (
    <section className={styles.container}>
      <div className={styles.headerText}>
        <h1 className={styles.typingH1}>SHARE-SPACE</h1>
        <p className={styles.typingP}>TU ESPACIO COMPARTIDO PARA CREAR Y GESTIONAR TU NUEVA VIDA</p>
      </div>

      <div className={styles.imagecontainer}>
        <div className={styles.imageWrapper}>
          <img src="/TFG_COHOUSING/images/new-izq.png" alt="Imagen 1" className={styles.image} />
          <p className={styles.caption}>¿Buscas una nueva comunidad?</p>
        </div>
        <div className={styles.imageWrapper}>
          <img src="/TFG_COHOUSING/images/new-izq.png" alt="Imagen 2" className={styles.image} />
          <p className={styles.caption}>¿Buscas integrantes para tu comunidad?</p>
        </div>
      </div>
      <p>Comienza a formar parte de este nueva forma de vida</p>
      <button className={styles.button} onClick={handleStartClick}>
        COMENZAR AHORA
      </button>

      {/* Usamos el componente Card con emoji y texto adicional */}
      <div className={styles.cardsWrapper}>
        <h1>Motivos por los que unirte</h1>
        <div className={styles.cardsContainer}>
          <Card
            title="Fácil de usar"
            description="Diseñada para que cualquier persona pueda empezar sin complicaciones, desde el primer momento."
            emoji="🧠"
            additionalText="Crea, gestiona y colabora sin necesidad de conocimientos técnicos."
          />

          <Card
            title="Seguridad avanzada"
            description="Tu información personal está protegida con los estándares de seguridad más actuales."
            emoji="🛡️"
            additionalText="Implementamos autenticación moderna y cifrado de datos de extremo a extremo."
          />

          <Card
            title="Una comunidad a tu medida"
            description="Encuentra personas con tus mismos intereses y construye juntos algo genial."
            emoji="🌐"
            additionalText="Crea lazos, comparte ideas y haz crecer tus proyectos con el apoyo de otros."
          />
        </div>
      </div>

    </section>
  );
};
