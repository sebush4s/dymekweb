import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductModal from '../components/ProductModal';
import './Products.css';

// Map slugs to file names
const categoryMap = {
  'longfille': 'longfills',
  'olejki': 'olejki',
  'urzadzenia': 'urzadzenia'
};

const categoryTitles = {
  'longfille': 'Longfille',
  'olejki': 'Olejki i Liquidy',
  'urzadzenia': 'Urządzenia i Pody'
};

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        const fileKey = categoryMap[category];
        if (!fileKey) {
          throw new Error('Kategoria nieznana');
        }

        // Dynamic import of JSON data
        // Note: Vite can import JSON directly
        const data = await import(`../data/products/${fileKey}.json`);
        setProducts(data.default);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(true);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0); // Scroll to top on category change
      }
    };

    if (category) {
      loadProducts();
    }
  }, [category]);

  const title = categoryTitles[category] || 'Produkty';

  return (
    <div className="container products-page">
      <div className="products-header">
        <Link to="/" className="back-link">
          <ChevronLeft size={20} /> Strona główna
        </Link>
        <h1>{title}</h1>
      </div>

      {loading && <div className="loading-state">Ładowanie produktów...</div>}

      {error && (
        <div className="error-state">
          <h2>Nie znaleziono kategorii lub wystąpił błąd.</h2>
          <p>Spróbuj wybrać inną kategorię z menu.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} loading="lazy" />

                {/* Badges Rendering */}
                {product.badges && (
                  <div className="product-badges">
                    {(Array.isArray(product.badges) ? product.badges : [product.badges]).map((badge, index) => {
                      // Normalize badge text for class name (remove polish chars, lowercase)
                      const badgeClass = badge
                        .toLowerCase()
                        .replace(/ć/g, 'c')
                        .replace(/ś/g, 's')
                        .replace(/ł/g, 'l')
                        .replace(/ó/g, 'o')
                        .replace(/ę/g, 'e')
                        .replace(/ą/g, 'a')
                        .replace(/ż/g, 'z')
                        .replace(/ź/g, 'z')
                        .replace(/ń/g, 'n');

                      return (
                        <span key={index} className={`product-badge badge-${badgeClass}`}>
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  {product.capacity && product.capacity !== 'N/A' && (
                    <span className="product-capacity">{product.capacity}</span>
                  )}
                  <div className="price-container">
                    {product.oldPrice && (
                      <span className="product-old-price">{product.oldPrice}</span>
                    )}
                    <span className={`product-price ${product.oldPrice ? 'price-promotional' : ''}`}>{product.price}</span>
                  </div>
                </div>
                <button
                  className="quick-view-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  Szybki podgląd
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
