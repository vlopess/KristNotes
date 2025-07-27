import React, { useEffect, useState } from 'react';
import './Carousel.css';

const messages = [
    "Advice that works. Notes that stick.",
    "Build your own guide. Learn from others.",
    "From zero to skilled – together.",
];


export default function RightCardCarousel() {
    const [index, setIndex] = useState(0);
    const [fadeState, setFadeState] = useState('fade-in');

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeState('fade-out');
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % messages.length);
                setFadeState('fade-in');
            }, 500); // tempo da animação de saída
        }, 4000); // tempo total por slide

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            <div className={`carousel-slide ${fadeState}`}>
                {messages[index]}
            </div>
            <img src={"src/assets/Notes_of_Inspiration.png"} alt="imagem" className="image-carousel"/>
        </div>
    );
}
