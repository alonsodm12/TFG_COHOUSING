import React from "react";

interface CardProps {
  title: string;
  description: React.ReactNode;
  emoji: string;
  additionalText: string;
  photoUrl: string;
  rating?: number; // opcional, por defecto 5
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  emoji,
  additionalText,
  photoUrl,
  rating = 5,
}) => {
  // Generar estrellas según rating
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  }

  return (
    <div className="w-full max-w-xs bg-white border border-gray-300 rounded-2xl p-6 shadow-md transition-transform hover:scale-105">
      <div className="flex items-center mb-4 gap-4">
        <img
          src={photoUrl}
          alt={title}
          className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
        />
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          {title} <span className="text-2xl">{emoji}</span>
        </h2>
      </div>
      <div className="mb-2">{stars}</div>
      <p className="text-gray-600 mb-4 italic">"{description}"</p>
      <p className="text-sm text-green-600 font-semibold">{additionalText}</p>
    </div>
  );
};

export default Card;
