import React from 'react';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-slats"></div>
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1>
                    <span className="text-white">Tradycja</span> <span className="text-primary">i</span> <span className="text-white">Nowoczesność</span>
                </h1>
                <p className="hero-subtitle">
                    Najlepszy wybór produktów tytoniowych i akcesoriów.
                </p>
                <div className="hero-buttons">
                    <a href="#locations" className="btn-primary">Znajdź Nas</a>
                    <a href="#offer" className="btn-outline">Zobacz Ofertę</a>
                </div>
            </div>
        </section>
    );
}
