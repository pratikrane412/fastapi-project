import React from 'react';
import '../styles/ProductModal.css';

function ProductModal({ currentProduct, setCurrentProduct, editMode, onClose, onSubmit }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{editMode ? '✏️ Edit Product' : '✨ New Product'}</h2>
                    <button onClick={onClose} className="close-button">✖</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={currentProduct.name}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={currentProduct.description}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                            placeholder="Enter product description"
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                value={currentProduct.quantity}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button onClick={onClose} className="btn-cancel">Cancel</button>
                        <button onClick={onSubmit} className="btn-submit">
                            💾 {editMode ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;