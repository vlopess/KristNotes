import SupabaseService from './supabase.service';
import {getCurrentUserId} from "../utils/currentUser.js";

class UserNotesService extends SupabaseService {
    constructor() {
        super('users_notes');
    }

    async getNotesCurrentUser() {
        const uid = await getCurrentUserId();

        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', uid);
        return { data, error };
    }

    async getNotesByUsername(username) {
        const { data: users, error: userError } = await this.supabase
            .from('users')
            .select('id')
            .eq('username', username)
            .single();

        if (userError || !users) {
            return { data: null, error: userError || new Error('Usuário não encontrado') };
        }

        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', users.id);
        return { data, error };
    }


    async getNotesByUserId(uid) {

        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', uid);
        return { data, error };
    }

    async fetchByID(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('id', id);
        return { data, error };
    }

    async createNote(newNote) {
        newNote.user_id = await getCurrentUserId();
        return this.upsert(newNote);
    }
}

export default new UserNotesService();