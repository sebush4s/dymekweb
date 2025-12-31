import React from 'react';
import './Testimonials.css';

const reviews = [
    {
        text: "Git lokal, z obsługą gadasz jak z ziomkami, a to się ceni, napewno będę często odwiedzał, duży wybór, jest tanio i solidnie",
        rating: 5
    },
    {
        text: "Świetny sklep! Ogromny wybór liquidów i sprzętu, ceny bardzo fair, a obsługa cierpliwie doradza i zna się na rzeczy. Zamówienie zrealizowane ekspresowo. Zdecydowanie polecam Vape Shop Dymek!",
        rating: 5
    },
    {
        text: "Obsluga klienta na wysokim poziomie. Dobrze zaopatrzony (nigdy nie mialem problemu z zakupem produktu). Polecam.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="testimonials-section">
            <div className="container">
                <h2>Opinie Klientów</h2>
                <div className="testimonials-grid">
                    {reviews.map((review, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="stars">
                                {"★".repeat(review.rating)}
                            </div>
                            <p className="testimonial-text">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
