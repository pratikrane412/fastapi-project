import React from 'react';
import '../styles/SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, onAddClick }) {
    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <button onClick={onAddClick} className="add-button">
                <span>➕</span> Add New Product
            </button>
        </div>
    );
}

export default SearchBar;