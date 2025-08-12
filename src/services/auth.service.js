import {supabase} from "./supabase.client.js";



class AuthService {
    constructor() {
        this.supabase = supabase;
    }

    // Cadastro com email e senha
    async signUpWithEmail(email, password, userMetadata = {}) {
        try{
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        ...userMetadata
                    }
                }
            });
            return { data, error };
        }catch (e) {
            console.log(e);
            alert(e);
            return {e}
        }
    }

    // Login com email e senha
    async signInWithEmail(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    }

    // Logout
    async signOut() {
        const { error } = await this.supabase.auth.signOut();
        return { error };
    }
}

export default new AuthService();