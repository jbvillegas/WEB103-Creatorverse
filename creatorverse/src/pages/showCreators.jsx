import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/creatorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useSearchParams } from 'react-router-dom';

function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreators();
    }, []);

    const fetchCreators = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Error fetching creators:', error);
            } else {
                setCreators(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const term = (searchParams.get('search') || '').toLowerCase();
    const filtered = term
        ? creators.filter((c) => {
              const hay = `${c.name ?? ''} ${c.description ?? ''} ${c.url ?? ''}`.toLowerCase();
              return hay.includes(term);
          })
        : creators;

    return (
        <div className="show-creators">
            <header className="page-header">
                <h1>Creatorverse</h1>
                <p>Explore New Content Creators</p>
                
            </header>
            <SearchBar />
            {!loading && (
                <div className="search-meta">
                    {term
                        ? `Showing ${filtered.length} of ${creators.length}`
                        : `Showing ${creators.length} creators...`}
                </div>
            )}
            {loading ? (
                <div className="loading">
                    <p>Loading creators...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="empty-state">
                    <h2>No Creators Yet</h2>
                    <p>Add a Content Creator</p>
                    <Link to="/add">
                        <button className="btn-add-creator">Add Creator</button>
                    </Link>
                </div>
            ) : (
                <div className="creators-grid">
                    {filtered.map((creator) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowCreators;
