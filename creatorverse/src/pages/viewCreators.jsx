import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './viewCreators.css';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error: fetchError } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        setError(fetchError.message || 'Unable to load creator.');
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ?? null);
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchCreator();

    return () => {
      subscription?.unsubscribe?.();
    };
  }, [id]);

  const handleDelete = async () => {
    setError('');
    if (!user) {
      const msg = 'Please log in to delete creators.';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!creator?.user_id || creator.user_id !== user.id) {
      const msg = 'You can only delete your own creators.';
      setError(msg);
      toast.error(msg);
      return;
    }
    const { error: deleteError } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (deleteError) {
      const msg = deleteError.message || 'Unable to delete creator.';
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success('Creator deleted.');
    navigate('/');
  };

  if (loading) return <div className="creator-view"><p>Loading...</p></div>;
  if (error) return <div className="creator-view"><p className="form-error">{error}</p></div>;
  if (!creator) return <div className="creator-view"><p>Creator not found.</p></div>;

  return (
    <div className="creator-view">
      <header className="view-header">
        <h1>{creator.name}</h1>
        <div className="view-actions">
          <Link to={`/edit/${creator.id}`} className="btn-edit">Edit</Link>
          {user && creator?.user_id === user.id && (
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          )}
          <button onClick={() => navigate('/')} className="btn-secondary">Back</button>
        </div>
      </header>

      <div className="view-content">
        {(creator.image_url || creator.image_url) && (
          <div className="view-image">
            <img src={creator.image_url || creator.image_url} alt={creator.name} />
          </div>
        )}

        <div className="view-details">
          <div className="description-box">
            <h3>Description</h3>
            <p className="view-description">{creator.description}</p>
          </div>

          <div className="social-links">
            <h3>Social Media</h3>
            <div className="social-links-grid">
          {creator.youtube && (
            <a href={creator.youtube} target="_blank" rel="noreferrer" className="social-link youtube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          )}
          {creator.instagram && (
            <a href={creator.instagram} target="_blank" rel="noreferrer" className="social-link instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          )}
          {creator.twitter && (
            <a href={creator.twitter} target="_blank" rel="noreferrer" className="social-link twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
               Twitter
            </a>
          )}
          {creator.tiktok && (
            <a href={creator.tiktok} target="_blank" rel="noreferrer" className="social-link tiktok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              TikTok
            </a>
          )}
          {creator.twitch && (
            <a href={creator.twitch} target="_blank" rel="noreferrer" className="social-link twitch">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
              Twitch
            </a>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCreator;