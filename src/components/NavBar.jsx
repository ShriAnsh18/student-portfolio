import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../api';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!getToken());
    };

    window.addEventListener('auth-changed', handleAuthChange);
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tasks', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path) ||
                (item.path === '/projects' && location.pathname.startsWith('/tasks'));
          return (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
        {isLoggedIn ? (
          <li className="nav-item">
            <button
              type="button"
              onClick={handleLogout}
              className="nav-link nav-btn"
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link
              to="/login"
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
