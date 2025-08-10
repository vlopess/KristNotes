import {supabase} from "../services/supabase.client.js";


export const getCurrentUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const uid = user.id; // UID do usuário
        console.log("UID:", uid);
        return uid;
    } else {
        console.log("Nenhum usuário logado.");
        return null;
    }
}