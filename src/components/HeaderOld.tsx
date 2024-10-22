import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logOut } from '../services/useAuth';
// import { logOut } from '../firebase';

export const Header: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <header>
      <div>
        <Link to="/">Clinic App</Link>
        <nav>
          {user ? (
            <>
              <span className="mr-4">Welcome, {role}</span>
              {role === 'doctor' && <Link to="/appointments">Appointments</Link>}
              {role === 'patient' && <Link to="/book-appointment">Book Appointment</Link>}
              <button onClick={logOut} >Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
