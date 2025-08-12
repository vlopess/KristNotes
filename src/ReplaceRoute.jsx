import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "./services/supabase.client.js";
import {getCurrentUsername} from "./utils/currentUser.js";

export default function ReplaceRoute({ children }) {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if(!isLoaded){
                const username = await getCurrentUsername();

                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    navigate(`/${username}`);
                }
                setIsLoaded(true);
            }
        };

        checkAuth();
    }, [supabase, navigate]);

    return isLoaded ? children : (<></>);
}