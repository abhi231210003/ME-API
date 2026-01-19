import React, { useState } from 'react';

function Search({ onSearch, results }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="component-section">
      <h2>Search</h2>

      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by skill, project name, or anything else..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      {results && (
        <div className="search-results">
          <h3>Results for: <em>"{results.query}"</em></h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>Found {results.total_results} results</p>

          {results.total_results > 0 ? (
            results.results.map((result, index) => (
              <div key={index} className="result-item">
                <span className="type">{result.type}</span>
                <h4>
                  {result.title || result.name || result.skill_name}
                </h4>
                {result.description && <p>{result.description}</p>}
                {result.email && <p>Email: {result.email}</p>}
                {result.bio && <p>{result.bio}</p>}
              </div>
            ))
          ) : (
            <p>No results found. Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
