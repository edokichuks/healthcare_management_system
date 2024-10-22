import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.scss';
import log from '../assets/contents/log.svg'
import { signIn } from '../services/useAuth';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      console.log(data);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  return (
    // <div classNameName="container mx-auto mt-8">
    //   <h1 classNameName="text-3xl font-bold mb-4">Login</h1>
    //   <LoginForm />
    //   <div onClick={()=>navigate("/register")}>Sign up</div>
    // </div>

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
          <button type="submit" className="btn solid">Sign in</button>

          {/* <p className="social-text">Or Sign in with social platforms</p>
          <div className="social-media">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
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

      {/* <div className="panel right-panel">
          <div className="content">
              <h3>One of us?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus est.</p>
              <button className="btn transparent" id="sign-in-btn">Sign In</button>
          </div>
          <img src="./img/register.svg" className="image" alt="" />
      </div> */}
    </div>
  </div>
  );
};