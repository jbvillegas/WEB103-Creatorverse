import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img_url: '',
        youtube: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        twitch: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const buttonText = submitting ? 'Adding...' : 'Add Creator';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        const { data, error: insertError } = await supabase
            .from('creators')
            .insert([
                {
                    name,
                    description,
                    img_url: formData.img_url.trim(),
                    youtube: formData.youtube.trim(),
                    instagram: formData.instagram.trim(),
                    twitter: formData.twitter.trim(),
                    tiktok: formData.tiktok.trim(),
                    twitch: formData.twitch.trim(),
                },
            ])
            .select()
            .single();

        setSubmitting(false);

        if (insertError) {
            setError(insertError.message || 'Unable to add creator.');
            return;
        }

        if (data) navigate('/');
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="creator-form-container">
            <form onSubmit={handleSubmit} className="creator-form">
                <h2>Add Creator</h2>

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
                    <label htmlFor="img_url">Image URL</label>
                    <input
                        type="url"
                        id="img_url"
                        name="img_url"
                        value={formData.img_url}
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

export default AddCreator;