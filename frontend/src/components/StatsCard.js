import React from 'react';
import '../styles/StatsCard.css';

function StatsCard({ title, value, icon, color }) {
    return (
        <div className={`stats-card stats-card-${color}`}>
            <div className="stats-content">
                <p className="stats-title">{title}</p>
                <p className="stats-value">{value}</p>
            </div>
            <div className={`stats-icon stats-icon-${color}`}>
                <span>{icon}</span>
            </div>
        </div>
    );
}

export default StatsCard;