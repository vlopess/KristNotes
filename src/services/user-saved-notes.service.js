import SupabaseService from './supabase.service';
import {getCurrentUserId} from "../utils/currentUser.js";

class UserSavedNotesService extends SupabaseService {
    constructor() {
        super('users_saved_notes');
    }

    async getSavedNotesCurrentUser() {
        const uid = await getCurrentUserId();

        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
                users_notes ( title, user_id ),
                note_id
            `)
            .eq('user_id', uid);
        return { data, error };
    }

    async getSavedNotesByUsername(username) {
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
            .select(`
                users_notes ( title, user_id ),
                note_id
            `)
            .eq('user_id', users.id);

        return { data, error };
    }

    async saveNoteForUser(userId, noteId) {
        return this.create({
            user_id: userId,
            note_id: noteId
        });
    }

    async unsaveNoteForUser(userId, noteId) {
        const { error } = await this.supabase
            .from(this.tableName)
            .delete()
            .eq('user_id', userId)
            .eq('note_id', noteId);
        return { error };
    }

    async isSavedNote(userId, noteId){
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('note_id', noteId);
        return data.length !== 0;
    }
}

export default new UserSavedNotesService();