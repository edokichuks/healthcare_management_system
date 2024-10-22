import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import s from '../styles/components/Home.module.scss';

export const Home: React.FC = () => {
  const { user, role } = useAuth();


  return (
    <div>
      <h1>Welcome to the Clinic App</h1>
      {user ? (
        <p>You are logged in as a {role}.</p>
      ) : (
        <p>Please log in or register to use the app.</p>
      )}
    </div>
  );
};