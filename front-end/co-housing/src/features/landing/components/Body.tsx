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
        <h1 className={styles.typingH1}>BIENVENIDO A SHARE-SPACE</h1>
        <p className={styles.typingP}>TU ESPACIO PARA CREAR Y GESTIONAR TU NUEVA VIDA COMPARTIDA</p>
      </div>

      <img
        src="/TFG_COHOUSING/images/prueba-logo.png"
        alt="Logo de ShareSpace"
        className={styles.logo}
      />

      <button className={styles.button} onClick={handleStartClick}>
        EMPEZAR
      </button>
      <div className={styles.container}>
        {/* Usamos el componente Card con emoji y texto adicional */}
        <div className={styles.cardsWrapper}>
          <h1>Motivos por los que unirte</h1>
          <div className={styles.cardsContainer}>
            <Card 
              title="Fácil de usar" 
              description="Una interfaz sencilla para todos." 
              emoji="😊"
              additionalText="Crea y gestiona con facilidad"
            />
            <Card 
              title="Seguridad" 
              description="Protegemos tus datos con autenticación moderna." 
              emoji="🔒"
              additionalText="Tus datos están a salvo con nosotros"
            />
            <Card 
              title="Comunidad" 
              description="Conecta con personas afines a tus intereses." 
              emoji="🤝"
              additionalText="Haz nuevos amigos y colabora"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
