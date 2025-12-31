import React from 'react';
import { Award, PackageCheck, Smile, ThumbsUp } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <Award />,
        title: "Najwyższa Jakość",
        desc: "Współpracujemy tylko ze sprawdzonymi dostawcami i topowymi markami."
    },
    {
        icon: <PackageCheck />,
        title: "Szeroki Asortyment",
        desc: "Od klasyki po nowości vape. U nas znajdziesz wszystko w jednym miejscu."
    },
    {
        icon: <Smile />,
        title: "Fachowe Doradztwo",
        desc: "Nie wiesz co wybrać? Nasza, zawsze uśmiechnięta obsługa chętnie doradzi."
    }
];

export default function Features() {
    return (
        <section className="features-section">
            <div className="container">
                <h4 className="section-subtitle center">Dlaczego My?</h4>
                <h2>Twój Zaufany Sklep</h2>
                <div className="features-grid">
                    {features.map((item, index) => (
                        <div key={index} className="feature-item">
                            <div className="feature-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
