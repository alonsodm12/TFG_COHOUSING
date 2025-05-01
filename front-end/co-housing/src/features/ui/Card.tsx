import React from "react";

interface CardProps {
  title: string;
  description: string;
  emoji: string;
  additionalText: string;
}

const Card: React.FC<CardProps> = ({ title, description, emoji, additionalText }) => {
  return (
    <div className="w-full max-w-xs bg-white border border-gray-300 rounded-2xl p-6 shadow-md transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <span className="text-4xl block mb-2">{emoji}</span>
      <p className="text-sm text-gray-700">{additionalText}</p>
    </div>
  );
};

export default Card;
