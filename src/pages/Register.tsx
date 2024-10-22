import React from 'react';
import { RegisterForm } from '../components/RegisterForm';

export const Register: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </div>
  );
};