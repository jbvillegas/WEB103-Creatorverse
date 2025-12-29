import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';
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
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
            {user ? (
              <div className="navbar-user" ref={avatarRef}>
                <button
                  type="button"
                  className="avatar-button"
                  onClick={() => setAvatarOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={avatarOpen}
                >
                  {user?.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || 'GitHub avatar'}
                      className="navbar-avatar"
                    />
                  )}
                </button>
                {avatarOpen && (
                  <div className="navbar-menu" role="menu">
                    <Link to="/" className="navbar-menu-item" role="menuitem" onClick={() => setAvatarOpen(false)}>
                      Home
                    </Link>
                    <Link to="/add" className="navbar-menu-item" role="menuitem" onClick={() => setAvatarOpen(false)}>
                      Add Creator
                    </Link>
                    <button className="navbar-menu-item" role="menuitem" onClick={signOut}>
                      Sign Out
                    </button>
                  </div>
                )}
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