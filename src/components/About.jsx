import React from 'react';
import './About.css';

export default function About() {
    return (
        <section className="about-section" id="about">
            <div className="container about-container">
                <div className="about-text">
                    <h4 className="section-subtitle">O Nas</h4>
                    <h2>Pasja i Doświadczenie</h2>
                    <p>Dymek to coś więcej niż sklep – to przestrzeń tworzona przez ludzi i dla ludzi, których łączy wspólna pasja. Budujemy miejsce, w którym liczy się nie tylko oferta, ale przede wszystkim atmosfera, rozmowa i poczucie przynależności do społeczności.
                    </p>
                    <p>
                        Stawiamy na jakość, zaufanie i relacje. Chcemy, żeby każdy czuł się u nas swobodnie – niezależnie od doświadczenia. Zawsze możesz liczyć na szczere doradztwo, wymianę doświadczeń i pomoc w wyborze tego, co najlepiej pasuje do Ciebie.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy3N2cg5I3CNEhuGkTZJRB7taJ6CbMJmwZHG2H1ZmOnh2KTjjyqZaF9EngZP9jbQxj9AmvikohzGERAnYeG-Hk-ImbNsDgWYDymi7o1jRb7cnEmOboQf-AHRfM1V336gMYxx7qQCjXfGnyo=s680-w680-h510-rw"
                        alt="Wnętrze sklepu tytoniowego - ilustracja"
                    />
                </div>
            </div>
        </section>
    );
}
