import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Slide1Dark from "../../assets/slide1Dark.png";
import Slide2Dark from "../../assets/slide2Dark.png";
import Slide3Dark from "../../assets/slide3Dark.png";

import Slide1Light from "../../assets/slide1Light.png";
import Slide2Light from "../../assets/slide2Light.png";
import Slide3Light from "../../assets/slide3Light.png";
import {useTheme} from "../../ThemeProvider.jsx";

const imagesDark = [
    Slide1Dark,
    Slide2Dark,
    Slide3Dark
];

const imagesLight = [
    Slide1Light,
    Slide2Light,
    Slide3Light
];


export default function Carousel() {
    const [index, setIndex] = useState(0);

    const { isLightMode } = useTheme();
    const images = isLightMode ? imagesLight : imagesDark;

    const next = () => setIndex((prev) => (prev + 1) % images.length);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-64 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={index}
                        src={images[index]}
                        alt="carousel"
                        className="absolute w-full h-64 object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
