import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';
import './editCreator.css';

function EditCreator() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    youtube: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    twitch: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const buttonText = submitting ? 'Updating...' : 'Update Creator';

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to edit creators.');
        navigate('/');
        return;
      }
      await fetchCreator();
    }
    init();
  }, [id, navigate]);

  const fetchCreator = async () => {
    const { data, error: fetchError } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      setError(fetchError.message || 'Unable to load creator');
      setLoading(false);
      return;
    }

    if (data) {
      setFormData({
        name: data.name || '',
        description: data.description || '',
        image_url: data.image_url || '',
        youtube: data.youtube || '',
        instagram: data.instagram || '',
        twitter: data.twitter || '',
        tiktok: data.tiktok || '',
        twitch: data.twitch || '',
      });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name || !description) {
      setError('Name and description are required.');
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase
      .from('creators')
      .update({
        name,
        description,
        image_url: formData.image_url.trim(),
        youtube: formData.youtube.trim(),
        instagram: formData.instagram.trim(),
        twitter: formData.twitter.trim(),
        tiktok: formData.tiktok.trim(),
        twitch: formData.twitch.trim(),
      })
      .eq('id', id);

    setSubmitting(false);

    if (updateError) {
      setError(updateError.message || 'Unable to update creator');
      return;
    }

    navigate('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="creator-form-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="creator-form-container">
      <form onSubmit={handleSubmit} className="creator-form">
        <h2>Edit Creator</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Creator Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Input Creator Name"
            required
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Input Description"
            required
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://www.example.com/image.jpg"
            disabled={submitting}
          />
        </div>

        <div className="social-media-section">
          <h3>Social Media Links</h3>
          
          <div className="form-group">
            <label htmlFor="youtube">YouTube</label>
            <input
              type="url"
              id="youtube"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://www.youtube.com/@creator"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://www.instagram.com/creator"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Twitter / X</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/creator"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tiktok">TikTok</label>
            <input
              type="url"
              id="tiktok"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              placeholder="https://www.tiktok.com/@creator"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitch">Twitch</label>
            <input
              type="url"
              id="twitch"
              name="twitch"
              value={formData.twitch}
              onChange={handleChange}
              placeholder="https://www.twitch.tv/creator"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {buttonText}
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCreator;