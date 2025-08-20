import React from 'react';
import './Filter.css';

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${currentFilter === key ? 'active' : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
