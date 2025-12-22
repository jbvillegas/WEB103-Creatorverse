import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            Creatorverse
          </Link>

          <div className="navbar-desktop">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/add" className="navbar-link navbar-link-primary">
              Add Creator
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="navbar-mobile">
            <Link
              to="/"
              className="navbar-mobile-link"
              onClick={() => handleNavClick('/')}>
              Home
            </Link>
            <Link
              to="/add"
              className="navbar-mobile-link navbar-mobile-link-primary"
              onClick={() => handleNavClick('/add')}>
              Add Creator
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;