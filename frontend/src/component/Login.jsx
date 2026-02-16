import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from '../data/meteoSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    
    if (formData.username.trim() && formData.password.trim() ){
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: formData.username,
          password: formData.password
        });
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (error) {
        console.log(error.response?.data?.message)
        dispatch(setError(error.response?.data?.message || 'Erreur serveur'));
      }
    }else{
      console.log('Remplir tous les champs du formulaire.')
    }
  };


  return (
    <div className="login-page">
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>

      <div className="login-container glass">
        <div className="login-header">
          <div className="login-icon">☁️</div>
          <h1 className="login-title">Bienvenue</h1>
          <p className="login-subtitle">Connectez-vous pour accéder à votre météo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">User</label>
            <div className="input-wrapper">
              <input 
                type="username" 
                id="username" 
                name="username"
                className="form-input" 
                placeholder="votre username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                id="password" 
                name="password"
                className="form-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-footer">
            <div className="checkbox-wrapper">
              <input 
                type="checkbox" 
                id="remember" 
                name="remember"
                className="checkbox-input"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="checkbox-label">
                Se souvenir de moi
              </label>
            </div>
            <a href="#forgot" className="forgot-link">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="btn-login">Se connecter</button>
        </form>    

        <p className="signup-link">
          Pas encore de compte ? <a href="#signup">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;