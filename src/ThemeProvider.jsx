// ThemeContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isLightMode, setIsLightMode] = useState(localStorage.getItem('mode') === 'light');

    useEffect(() => {
        const modeSalved = localStorage.getItem('mode');
        if (modeSalved) {
            setIsLightMode(modeSalved === 'light');
        } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            setIsLightMode(prefersLight);
            localStorage.setItem('mode', prefersLight ? 'light' : 'dark');
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-mode', isLightMode);
        document.body.classList.toggle('dark-mode', !isLightMode);
        localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
    }, [isLightMode]);

    const toggleLightMode = () => setIsLightMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleLightMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
