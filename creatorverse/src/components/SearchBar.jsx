import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import '../css/search-bar.css';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(param);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(param);
  }, [param]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const { data, error } = await supabase
        .from('creators')
        .select('id, name')
        .ilike('name', `%${searchTerm}%`)
        .limit(5);

      if (!error && data) {
        setSuggestions(data);
        setShowSuggestions(true);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = (term = searchTerm) => {
    const trimmedTerm = term.trim();
    if (trimmedTerm) {
      setSearchParams({ search: trimmedTerm });
      setShowSuggestions(false);
    } else {
      setSearchParams({});
    }
  };

  const handleSuggestionClick = (creatorId) => {
    navigate(`/view/${creatorId}`);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSearchParams({});
  };

  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <span className="search-icon" aria-hidden="true">
          
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
            if (e.key === 'Escape') {
              handleClear();
              setShowSuggestions(false);
            }
          }}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          placeholder="Search creators..."
          className="search-input"
          aria-label="Search creators"
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-dropdown">
            {suggestions.map((creator) => (
              <div
                key={creator.id}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(creator.id)}
              >
                {creator.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="search-button" onClick={() => handleSearch()}>
        Search
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
