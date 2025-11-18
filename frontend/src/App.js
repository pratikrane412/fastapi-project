import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import './styles/App.css';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProduct, setCurrentProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });
      if (response.ok) {
        fetchProducts();
        closeModal();
      }
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product?id=${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });
      if (response.ok) {
        fetchProducts();
        closeModal();
      }
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/product?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const openAddModal = () => {
    setCurrentProduct({
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: '',
      description: '',
      price: 0,
      quantity: 0
    });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct({ id: 0, name: '', description: '', price: 0, quantity: 0 });
  };

  const handleSubmit = () => {
    editMode ? handleUpdateProduct() : handleAddProduct();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="app">
      <div className="background-blob blob1"></div>
      <div className="background-blob blob2"></div>
      <div className="background-blob blob3"></div>

      <div className="container">
        <Header />

        <div className="stats-container">
          <StatsCard title="Total Products" value={totalProducts} icon="📦" color="purple" />
          <StatsCard title="Total Stock" value={totalStock} icon="📊" color="blue" />
          <StatsCard title="Inventory Value" value={`$${totalValue.toFixed(2)}`} icon="💰" color="green" />
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddClick={openAddModal}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="empty-title">No products found</p>
            <p className="empty-subtitle">Add your first product to get started!</p>
          </div>
        )}

        {showModal && (
          <ProductModal
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            editMode={editMode}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;