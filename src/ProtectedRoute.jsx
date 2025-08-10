// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from "./services/supabase.client.js";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/'); // Redireciona se não estiver logado
            }
        };

        checkAuth();
    }, [supabase, navigate]);

    return children;
}
