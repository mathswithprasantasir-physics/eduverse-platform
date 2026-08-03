import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSystem = ({ filters, onFilterChange, availableOptions }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const updated = { ...localFilters, [key]: value || null };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    const cleared = { year: null, chapter: null, difficulty: null, topic: null };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="filter-system">
      <div className="filter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="filter-title">
          <FaFilter /> Advanced Filters
        </div>
        <div className="filter-actions">
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div className="filter-body">
          <div className="filter-grid">
            {availableOptions.years && availableOptions.years.length > 0 && (
              <div className="filter-group">
                <label>Year</label>
                <select 
                  value={localFilters.year || ''}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  <option value="">All Years</option>
                  {availableOptions.years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {availableOptions.chapters && availableOptions.chapters.length > 0 && (
              <div className="filter-group">
                <label>Chapter</label>
                <select 
                  value={localFilters.chapter || ''}
                  onChange={(e) => handleFilterChange('chapter', e.target.value)}
                >
                  <option value="">All Chapters</option>
                  {availableOptions.chapters.map(chapter => (
                    <option key={chapter} value={chapter}>{chapter}</option>
                  ))}
                </select>
              </div>
            )}

            {availableOptions.difficulties && availableOptions.difficulties.length > 0 && (
              <div className="filter-group">
                <label>Difficulty</label>
                <select 
                  value={localFilters.difficulty || ''}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                  <option value="">All Levels</option>
                  {availableOptions.difficulties.map(diff => (
                    <option key={diff} value={diff.toLowerCase()}>{diff}</option>
                  ))}
                </select>
              </div>
            )}

            {availableOptions.topics && availableOptions.topics.length > 0 && (
              <div className="filter-group">
                <label>Topic</label>
                <select 
                  value={localFilters.topic || ''}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                >
                  <option value="">All Topics</option>
                  {availableOptions.topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSystem;