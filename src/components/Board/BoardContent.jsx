import React, { useState, useEffect, useMemo } from 'react';
import ContentRenderer from '../Content/ContentRenderer';
import FilterSystem from '../Common/FilterSystem';
import SearchBar from '../Common/SearchBar';
import { fetchContent, applyFilters } from '../../utils/api';

const BoardContent = ({ board, subject, contentType }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    year: null,
    chapter: null,
    difficulty: null,
    topic: null
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await fetchContent(board, subject, contentType);
        setContent(data);
        setError(null);
      } catch (err) {
        setError('Failed to load content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [board, subject, contentType]);

  const filteredContent = useMemo(() => {
    if (!content) return null;
    return applyFilters(content, filters, searchQuery);
  }, [content, filters, searchQuery]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading content</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="board-content">
      <div className="content-controls">
        <h2>
          {board} - {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h2>
        <SearchBar 
          onSearch={(query) => setSearchQuery(query)}
          placeholder="Search within content..."
        />
      </div>

      <FilterSystem 
        filters={filters}
        onFilterChange={setFilters}
        availableOptions={{
          years: content?.metadata?.years || [],
          chapters: content?.metadata?.chapters || [],
          difficulties: ['Easy', 'Medium', 'Hard'],
          topics: content?.metadata?.topics || []
        }}
      />

      {filteredContent && (
        <div className="content-display">
          {filteredContent.items.length > 0 ? (
            filteredContent.items.map((item, index) => (
              <div key={index} className="content-item">
                <div className="item-metadata">
                  <span className="item-number">Q{index + 1}</span>
                  {item.year && <span className="item-year">Year: {item.year}</span>}
                  {item.chapter && <span className="item-chapter">Chapter: {item.chapter}</span>}
                  {item.difficulty && <span className={`item-difficulty ${item.difficulty.toLowerCase()}`}>
                    {item.difficulty}
                  </span>}
                </div>
                <ContentRenderer 
                  content={item.content} 
                  contentType={contentType}
                />
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No content found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardContent;