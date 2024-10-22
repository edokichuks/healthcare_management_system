import React, { useState } from 'react';
// import { signUp } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../utils/roles';
import { signUp } from '../services/useAuth';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.PATIENT);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, role);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value={ROLES.PATIENT}>Patient</option>
        <option value={ROLES.DOCTOR}>Doctor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};