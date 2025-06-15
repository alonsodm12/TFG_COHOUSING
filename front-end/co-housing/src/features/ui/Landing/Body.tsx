import React from "react";
import styles from "./LandingPage.module.css";
import Card from "../Card";

import Button from "../Button/Button";

export const Body: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headerText}>
        <h1 className={styles.typingH1}>SHARE-SPACE</h1>
        <p className={styles.typingP}>
          TU ESPACIO COMPARTIDO PARA CREAR Y GESTIONAR TU NUEVA VIDA
        </p>
      </div>

      <div className={styles.imagecontainer}>
        <div className={styles.imageWrapper}>
          <img
            src="/TFG_COHOUSING/images/foto-landing2.png"
            alt="Imagen 1"
            className={styles.image2}
          />
          <p className={styles.caption}>🏘️¿Buscas una nueva comunidad?</p>
        </div>
      </div>
      <section className="w-full text-white py-20 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4">
          Vive en comunidad. Encuentra tu lugar.
        </h1>
        <p className="text-lg mb-8">
          Una plataforma para conectar buscadores y creadores de comunidades de
          cohousing.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/buscar" className="btn">
            🔍 Buscar Comunidad
          </a>
          <a href="/ofrecer" className="btn btn-outline">
            📤 Publicar Comunidad
          </a>
        </div>
      </section>
      <Button label="EMPEZAR YA" to="/TFG_COHOUSING/registro" />
      {/* Carrusel de imágenes estáticas */}
      <h1 className="w-full text-white py-16 text-center text-5xl font-bold">
          ¡Descubre todo lo que ofrece ShareHouse!
        </h1>
      <section className={styles.carouselSection}>
        <div className={styles.carouselTrack}>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="Gestión fácil"
            className={styles.carouselImage}
          />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
            alt="Eventos compartidos"
            className={styles.carouselImage}
          />
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80"
            alt="Comunicación fluida"
            className={styles.carouselImage}
          />
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80"
            alt="Soporte 24/7"
            className={styles.carouselImage}
          />
        </div>
      </section>
      <div className={styles.cardsWrapper}>
        <h1 className={styles.typingP}>Lo que dicen nuestros usuarios</h1>
        <div className="flex gap-6 justify-center flex-wrap mt-4">
          <Card
            photoUrl="https://i.pravatar.cc/150?img=3"
            title="Laura García"
            description="ShareSpace me ha ayudado a encontrar un lugar perfecto para vivir con amigos. Es fácil de usar y todo está organizado."
            emoji="🌟"
            rating={5}
            additionalText="Una experiencia increíble"
          />
          <Card
            photoUrl="https://i.pravatar.cc/150?img=7"
            title="Juan Pérez"
            description="Me encanta lo fácil que es gestionar las tareas del día a día con la plataforma. Además, la comunidad es muy activa."
            emoji="👏"
            rating={4}
            additionalText="¡Altamente recomendado!"
          />
          <Card
            photoUrl="https://i.pravatar.cc/150?img=10"
            title="María López"
            description="La seguridad y privacidad son lo más importante para mí, y ShareSpace ofrece ambas cosas con su sistema de autenticación."
            emoji="🔒"
            rating={5}
            additionalText="Me siento seguro usando esta plataforma"
          />
        </div>
      </div>
    </section>
  );
};
