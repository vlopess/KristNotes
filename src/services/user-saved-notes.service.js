import SupabaseService from './supabase.service';

class UserSavedNotesService extends SupabaseService {
    constructor() {
        super('users_saved_notes');
    }

    async getSavedNotesByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user_notes:note_id (*)
      `)
            .eq('user_id', userId);
        return { data, error };
    }

    async saveNoteForUser(userId, noteId) {
        return this.create({
            user_id: userId,
            note_id: noteId,
            saved_at: new Date().toISOString()
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
}

export default new UserSavedNotesService();