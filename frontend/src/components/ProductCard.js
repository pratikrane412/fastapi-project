import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="product-card">
            <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-id">#{product.id}</span>
            </div>
            <p className="product-description">{product.description}</p>

            <div className="product-details">
                <div className="product-detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value price">${product.price.toFixed(2)}</span>
                </div>
                <div className="product-detail-item">
                    <span className="detail-label">In Stock</span>
                    <span className="detail-value stock">{product.quantity}</span>
                </div>
            </div>

            <div className="product-actions">
                <button onClick={() => onEdit(product)} className="btn-edit">
                    ✏️ Edit
                </button>
                <button onClick={() => onDelete(product.id)} className="btn-delete">
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}

export default ProductCard;