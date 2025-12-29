import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';
import { AiFillGithub } from "react-icons/ai";
import '../css/nav-bar.css';

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
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ?? null);
    }

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
  }

  async function signOut(){
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            Creatorverse
          </Link>
          
          <div className="navbar-desktop">
            <Link to="/add" className="navbar-link-add">
              Add Creator
            </Link>

            {user ? (
              <div className="navbar-user">
                <button className='btn-signout' onClick={signOut}>Sign Out</button>
              </div>
            ) : (
              <button className='btn-login' onClick={signInWithGitHub}>Login with Github</button>
            )}
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
              className="navbar-mobile-link-home"
              onClick={() => handleNavClick('/')}>
              Home
            </Link>
            <Link
              to="/add"
              className="navbar-mobile-link-add"
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