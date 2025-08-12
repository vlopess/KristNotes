// src/components/ProtectedRoute.jsx
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from "./services/supabase.client.js";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const checkAuth = async () => {
            if(!isLoaded){
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/'); // Redireciona se não estiver logado
                }
                setIsLoaded(true);
            }
        };

        checkAuth();
    }, [supabase, navigate]);

    return isLoaded ? children : (<></>);
}
