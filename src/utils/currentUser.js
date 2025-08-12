import {supabase} from "../services/supabase.client.js";


export const getCurrentUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const uid = user.id; // UID do usuário
        return uid;
    } else {
        console.log("Nenhum usuário logado.");
        return null;
    }
}

export const getCurrentUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        return user.user_metadata.username;
    } else {
        return null;
    }
}