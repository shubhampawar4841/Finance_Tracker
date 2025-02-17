// src/components/ui/Card.jsx

import React from 'react';

const Card = ({ title, content, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{content}</p>
    </div>
  );
};

export default Card;
