import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

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
      </ul>
    </nav>
  );
}

export default NavBar;
