import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/creatorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import '../css/show-creators.css';

function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const creatorsContentRef = useRef(null);
    const [selectedTag, setSelectedTag] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [sortBy, setSortBy] = useState('newest');

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
        fetchCreators();
    }, [user]);

    const fetchCreators = async () => {
        try {
            let query = supabase.from('creators').select('*');
            
            if (user) {
                query = query.or(`is_public.eq.true,user_id.eq.${user.id}`);
            } else {
                query = query.eq('is_public', true);
            }
            
            const { data, error } = await query.order('id', { ascending: false });

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
    
    // Get all unique tags from creators
    const allTags = [...new Set(creators.flatMap(c => c.tags || []))];
    
    let filtered = term
        ? creators.filter((c) => {
              const hay = `${c.name ?? ''} ${c.description ?? ''} ${c.url ?? ''}`.toLowerCase();
              return hay.includes(term);
          })
        : creators;
    
    // Filter by tag
    if (selectedTag) {
        filtered = filtered.filter(c => c.tags && c.tags.includes(selectedTag));
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
        filtered = filtered.filter(c => c.is_favorite);
    }
    
    // Sort creators
    filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'alphabetical':
                return a.name.localeCompare(b.name);
            case 'oldest':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'newest':
            default:
                return new Date(b.created_at) - new Date(a.created_at);
        }
    });

    const scrollToCreators = () => {
        creatorsContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="show-creators">
            <header className="page-header">
                <h1>Creatorverse</h1>
                <p> 
                A minimalist platform for managing your favorite content creators and <br></br>building a collection that reflects your unique taste.
                </p>
                <button className="start-searching-btn" onClick={scrollToCreators}>
                    Start Exploring
                </button>
            </header>
            <div className="creators-content" ref={creatorsContentRef}>
            <SearchBar />
            
            <div className="filters-container">
                <div className="filter-group">
                    <label htmlFor="tag-filter">Filter by Tag:</label>
                    <select 
                        id="tag-filter"
                        value={selectedTag} 
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Tags</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-group">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={showFavoritesOnly}
                            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                        />
                        <span>Favorites Only</span>
                    </label>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="sort-select">Sort by:</label>
                    <select 
                        id="sort-select"
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="alphabetical">A-Z</option>
                    </select>
                </div>
            </div>
            
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
                <div className="loop-shell">
                    <div className="loop-track">
                        {[...filtered, ...filtered].map((creator, i) => (
                            <CreatorCard key={`${creator.id}-${i}`} creator={creator} />
                        ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default ShowCreators;
