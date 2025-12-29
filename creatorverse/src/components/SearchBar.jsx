import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/search-bar.css';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(param);

  useEffect(() => {
    setSearchTerm(param);
  }, [param]);

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm('');
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
            if (e.key === 'Escape') handleClear();
          }}
          placeholder="Search creators..."
          className="search-input"
          aria-label="Search creators"
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
