import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    // Combine main image with gallery
    const allImages = [product.image, ...(product.gallery || [])];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const isDevice = !!product.specs;
    const isLiquid = !!product.flavors;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    {/* Gallery Section */}
                    <div className="modal-gallery">
                        <div className="main-image-wrapper">
                            <img
                                src={allImages[currentImageIndex]}
                                alt={`${product.name} view ${currentImageIndex + 1}`}
                            />
                            {allImages.length > 1 && (
                                <>
                                    <button className="gallery-nav prev" onClick={prevImage}><ChevronLeft /></button>
                                    <button className="gallery-nav next" onClick={nextImage}><ChevronRight /></button>
                                </>
                            )}
                        </div>
                        {allImages.length > 1 && (
                            <div className="gallery-thumbnails">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(idx)}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="modal-details">
                        <div className="modal-header">
                            <span className="modal-brand">{product.brand}</span>
                            <h2>{product.name}</h2>
                            <div className="modal-price-container">
                                {product.oldPrice && (
                                    <span className="modal-old-price">{product.oldPrice}</span>
                                )}
                                <div className={`modal-price ${product.oldPrice ? 'price-promotional' : ''}`}>{product.price}</div>
                            </div>
                        </div>

                        <p className="modal-description">{product.description}</p>

                        {/* Device Specs */}
                        {isDevice && (
                            <div className="specs-section">
                                <h3>Specyfikacja</h3>
                                <div className="specs-grid">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="spec-item">
                                            <span className="spec-label">{key}</span>
                                            <span className="spec-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Liquid Flavors */}
                        {isLiquid && (
                            <div className="flavors-section">
                                <h3>Dostępne Smaki</h3>
                                <div className="flavors-list">
                                    {product.flavors.map((flavor, idx) => (
                                        <span key={idx} className="flavor-tag">{flavor}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Badges in Modal */}
                        {product.badges && (
                            <div className="modal-badges">
                                {(Array.isArray(product.badges) ? product.badges : [product.badges]).map((badge, index) => (
                                    <span key={index} className="modal-badge">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
