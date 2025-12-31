import React from 'react';
import { Facebook, Instagram, Phone, MapPin, Store } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-grid">
                <div className="footer-column">
                    <h4 className="footer-heading">DYMEK</h4>
                    <p className="footer-desc">
                        Twoje sprawdzone centrum tytoniowe.<br />
                        Najlepsza jakość, szeroki wybór i fachowe doradztwo w Twojej okolicy.
                    </p>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Kontakt</h4>
                    <div className="contact-row">
                        <Phone size={18} className="contact-icon" />
                        <a href="tel:+48792793933">+48 792 793 933</a>
                    </div>
                    <div className="contact-row">
                        <MapPin size={18} className="contact-icon" />
                        <span>ul. Polna 4/15, 16-010 Wasilków</span>
                    </div>
                    <div className="contact-row">
                        <MapPin size={18} className="contact-icon" />
                        <span>ul. Białostocka 39, 19-100 Mońki</span>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Dane Firmy</h4>
                    <div className="contact-row">
                        <Store size={18} className="contact-icon" />
                        <span>PHU Piotr Michlewicz</span>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Obserwuj Nas</h4>
                    <div className="footer-socials">
                        <a href="https://www.facebook.com/p/Dymek-61550319159350/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/dymek.official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Dymek. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}
