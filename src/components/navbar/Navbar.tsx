import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import './Navbar.css';

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="nav-container">
      <Link to="/characters">Characters</Link>
      <Link to="/planets">Planets</Link>
      <Link to="/starships">Starships</Link>
      <button onClick={handleAuthClick} className="auth-button">
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;
