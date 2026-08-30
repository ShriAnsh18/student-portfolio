import { useState } from 'react';

function NavBar() {
  const [activeLink, setActiveLink] = useState('Home');
  const navItems = ['Home', 'About', 'Skills', 'Contact'];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item} className="nav-item">
            <a
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${activeLink === item ? 'active' : ''}`}
              onClick={() => setActiveLink(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
