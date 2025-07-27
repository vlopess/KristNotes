import './App.css'
import {AppRoutes} from "./routes.jsx";
import {useEffect, useState} from "react";

export const isLight = false;

function App() {

    const [isLightMode, setIsLightMode] = useState(isLight);
    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }
    }, [isLightMode]);

    const toggleLightMode = () => {
        setIsLightMode(!isLightMode);
    };

    return (
        <>
            <AppRoutes mode={{isLightMode, toggleLightMode}}/>
        </>
    );

}

export default App;
