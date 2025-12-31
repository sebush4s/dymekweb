import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import './Locations.css';

const locations = [
    {
        id: 1,
        city: 'Wasilków',
        address: 'ul. Polna 4/15',
        hours: 'Pon-Sob: 9:00 - 20:00',
        link: 'https://www.google.com/search?q=dymek+wasilkow'
    },
    {
        id: 2,
        city: 'Mońki',
        address: 'ul. Białostocka 39',
        hours: 'Pon-Sob: 9:00 - 18:00',
        link: 'https://www.google.com/search?q=dymek+mo%C5%84ki'
    }
];

export default function Locations() {
    return (
        <section className="locations-section" id="locations">
            <div className="container">
                <h2>Nasze Lokalizacje</h2>
                <div className="locations-grid">
                    {locations.map((loc) => (
                        <div key={loc.id} className="location-card">
                            <h3>{loc.city}</h3>
                            <div className="loc-detail">
                                <MapPin className="loc-icon" />
                                <span>{loc.address}</span>
                            </div>
                            <div className="loc-detail">
                                <Clock className="loc-icon" />
                                <span>{loc.hours}</span>
                            </div>
                            <a href={loc.link} target="_blank" rel="noopener noreferrer" className="btn-primary map-btn">
                                Zobacz na Mapie
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
