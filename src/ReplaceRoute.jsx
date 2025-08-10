import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {supabase} from "./services/supabase.client.js";

export default function ReplaceRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/me'); // Redireciona se não estiver logado
            }
        };

        checkAuth();
    }, [supabase, navigate]);

    return children;
}