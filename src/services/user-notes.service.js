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
        const uid = await getCurrentUserId();

        return this.upsert({
            id: newNote.id,
            user_id: uid,
            title: newNote.title,
            content: newNote.content
        });
    }
}

export default new UserNotesService();