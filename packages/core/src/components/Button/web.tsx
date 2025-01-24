import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <button 
      onClick={onPress}
      className={`px-4 py-2 rounded ${
        variant === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-gray-800'
      }`}
    >
      {title}
    </button>
  );
}; 