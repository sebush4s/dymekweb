import React from 'react';
import { Cigarette, Zap, Flame, Wind, Briefcase, Star } from 'lucide-react';
import './Offer.css';

const categories = [
    {
        id: 1,
        title: 'Papierosy i Tytonie',
        icon: <Cigarette className="offer-icon" />,
        desc: 'Szeroki wybór marek.'
    },
    {
        id: 2,
        title: 'E-Papierosy',
        icon: <Zap className="offer-icon" />,
        desc: 'Nowoczesne pody, jednorazówki i mody.'
    },
    {
        id: 3,
        title: 'Liquidy i Sole',
        icon: <Wind className="offer-icon" />,
        desc: 'Bogata paleta smaków, różne moce nikotyny.'
    },
    {
        id: 4,
        title: 'Akcesoria',
        icon: <Flame className="offer-icon" />,
        desc: 'Zapalniczki, nabijarki, zwijarki i wiele więcej.'
    },
    {
        id: 5,
        title: 'Shisha',
        icon: <Star className="offer-icon" />,
        desc: 'Węgielki i niezbędne akcesoria.'
    },
    {
        id: 6,
        title: 'Cygara',
        icon: <Briefcase className="offer-icon" />,
        desc: 'Ekskluzywne cygara dla koneserów.'
    }
];

export default function Offer() {
    return (
        <section className="offer-section" id="offer">
            <div className="container">
                <h2>Nasza Oferta</h2>
                <div className="offer-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="offer-card">
                            <div className="icon-wrapper">
                                {cat.icon}
                            </div>
                            <h3>{cat.title}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
