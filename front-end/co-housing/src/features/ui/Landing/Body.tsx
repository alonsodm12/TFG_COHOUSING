import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import Card from "../Card";

import Button from "../Button/Button";
import CardHorizontal from "../CardHorizontal";

export const Body: React.FC = () => {
  const images = [
    { src: "/images/pruebilla.png", alt: "Gestión fácil" },
    { src: "/images/pruebon.png", alt: "Eventos compartidos" },
    {
      src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
      alt: "Comunicación fluida",
    },
    {
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
      alt: "Soporte 24/7",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

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
            src="/images/foto-landing2.png"
            alt="Imagen 1"
            className={styles.image2}
          />
        </div>
      </div>
      <section className="w-full text-black py-20 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4">
          Vive en comunidad. Encuentra tu lugar.
        </h1>
        <p className="text-lg mb-8">
          Una plataforma para conectar buscadores y creadores de comunidades de
          cohousing.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="btn" type="button">
            🔍 Buscar Comunidad
          </button>
          <button className="btn btn-outline" type="button">
            📤 Publicar Comunidad
          </button>
        </div>
      </section>
      <Button label="EMPEZAR YA" to="/registro" />

      <section className="tetxmax-w-5xl mx-auto py-20 px-8 text-center bg-white/40 dark:bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl mt-20 shadow-2xl">
        <h2 className="font-bold text-5xl mb-14 text-gray-800 dark:text-black">
          Conoce las características de cada rol
        </h2>
        text-black
        <div className="flex flex-col gap-12 items-center">
          {/* Tarjeta Usuario Buscador */}
          <CardHorizontal
            photoUrl="https://static.vecteezy.com/system/resources/previews/015/146/563/non_2x/search-customers-icon-color-outline-vector.jpg"
            title="Usuario Buscador"
            description={
              <ul className="list-disc ml-6 text-left text-black space-y-2">
                <li>Buscar comunidades activas.</li>
                <li>Filtrar por ubicación, tamaño y servicios.</li>
                <li>Contactar con creadores y miembros.</li>
                <li>Guardar comunidades favoritas.</li>
              </ul>
            }
          />

          <div className="h-[1px] bg-gray-300 dark:bg-gray-600 w-full opacity-40"></div>

          {/* Tarjeta Usuario Ofertante */}
          <CardHorizontal
            photoUrl="https://cdn-icons-png.flaticon.com/512/9166/9166962.png"
            title="Usuario Ofertante"
            description={
              <ul className="list-disc ml-6 text-left text-black space-y-2">
                <li>Publicar nuevas comunidades.</li>
                <li>Gestionar solicitudes y miembros.</li>
                <li>Organizar eventos y actividades.</li>
                <li>Actualizar información y servicios.</li>
              </ul>
            }
          />
        </div>
      </section>

      {/* Carrusel de imágenes estáticas */}
      <h2 className="font-bold text-5xl mt-14 mb-2 text-gray-800 dark:text-black">
        Descubre todo lo que ofrece ShareSpace
      </h2>
      <div className={styles.carouselSection}>
        <div className={styles.carouselContainer}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`${styles.carouselImage} ${index === current ? styles.active : ""}`}
            />
          ))}
          <button className={styles.prev} onClick={prevSlide}>
            &#10094;
          </button>
          <button className={styles.next} onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        <h1 className={styles.typingP}>Lo que dicen nuestros usuarios</h1>
        <div className="flex gap-6 justify-center flex-wrap mt-4 text-black">
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
