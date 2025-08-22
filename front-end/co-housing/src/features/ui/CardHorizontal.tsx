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
    <div className="p-[2px] rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
      <div className="flex max-w-3xl bg-white rounded-xl overflow-hidden">
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
          <h2 className="text-2xl text-black font-semibold mb-3">
            {title}
          </h2>
          <div className="font-semibold text-black leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
