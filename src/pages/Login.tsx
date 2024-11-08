import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.scss';
import log from '../assets/contents/log.svg'
import { signIn } from '../services/useAuth';
import toast from 'react-hot-toast';
import SpinnerMini from '@/components/SpinnerMini';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await signIn(email, password);
      console.log(data);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
    <div className="forms-container">
      <div className="signin-signup">
        <form action="" className="sign-in-form" onSubmit={handleSubmit}>
          <h2 className="title">Sign In</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
               />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <input type="submit" value="Login" className="btn solid" /> */}
          <button type="submit" className="btn solid">
            {isLoading? <SpinnerMini /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>

    <div className="panels-container">

      <div className="panel left-panel">
          <div className="content">
              <h3>New here?</h3>
              <p>Create an account as a medical practioner or a patient.</p>
              <button 
                className="btn transparent" 
                id="sign-up-btn"
                onClick={()=>navigate('/register')}
                >
                  Sign Up
                </button>
          </div>
          <img src={log} className="image" alt="" />
      </div>
    </div>
  </div>
  );
};