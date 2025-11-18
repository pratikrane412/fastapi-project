import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-icon">🛒</div>
            <h1 className="header-title">Product Hub</h1>
            <p className="header-subtitle">Modern inventory management at your fingertips</p>
        </div>
    );
}

export default Header;