import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Offer from '../components/Offer';
import Testimonials from '../components/Testimonials';
import Locations from '../components/Locations';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <Offer />
            <Testimonials />
            <Locations />
        </>
    );
}
