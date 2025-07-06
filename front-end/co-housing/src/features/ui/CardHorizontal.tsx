import React from "react";

interface CardProps {
  title: string;
  description: React.ReactNode;
  photoUrl: string;
  rating?: number; // opcional, por defecto 5
}

const CardHorizontal: React.FC<CardProps> = ({
  photoUrl,
  title,
  description,
}) => {
  return (
    <div className="flex max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-2xl duration-300">
      {/* Contenedor imagen izquierda */}
      <div className="w-40 flex-shrink-0">
        <img
          src={photoUrl}
          alt={title}
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      {/* Línea vertical separadora con degradado */}
      <div
        className="w-1 mx-5 my-6 rounded"
        style={{
          background:
            "linear-gradient(to bottom, #4f46e5, #3b82f6, #06b6d4)",
        }}
      />

      {/* Contenido texto a la derecha */}
      <div className="flex flex-col justify-center px-6 py-5">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>
        <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
