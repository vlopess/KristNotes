import SupabaseService from './supabase.service';

class UserNotesService extends SupabaseService {
    constructor() {
        super('user_notes');
    }

    async getNotesByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId);
        return { data, error };
    }

    async searchNotes(userId, searchTerm) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .textSearch('content', searchTerm);
        return { data, error };
    }
}

export default new UserNotesService();