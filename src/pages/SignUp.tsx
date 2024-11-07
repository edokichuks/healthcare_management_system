import '../styles/components/Login.scss';
import register from '../assets/contents/register.svg'
import { signUp } from '../services/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ROLES } from '../utils/roles';
import toast from 'react-hot-toast';
import SpinnerMini from '@/components/SpinnerMini';

function SignUp() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState(ROLES.PATIENT);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signUp(email, password, role, userName);
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred. Try again");
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
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
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
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='slt'
            >
                <option value={ROLES.PATIENT}>Patient</option>
                <option value={ROLES.DOCTOR}>Doctor</option>
            </select>
              <button type='submit' className="btn solid">
                {isLoading? <SpinnerMini /> : "Sign Up"}
              </button>

            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
              <div className="content">
                  <h3>One of us?</h3>
                  <p>If you have an existing account then log in here.</p>
                  <button 
                    className="btn transparent" id="sign-in-btn"
                    onClick={()=>navigate('/login')}
                    >
                        Sign In
                    </button>
              </div>
              <img src={register} className="image" alt="hbjvhjrf" />
          </div>
        </div>
      </div>
    )
}

export default SignUp;