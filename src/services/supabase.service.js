import {supabase} from "./supabase.client.js";


class SupabaseService {
    constructor(tableName) {
        this.tableName = tableName;
        this.supabase = supabase;
    }

    // Métodos genéricos CRUD
    async getAll() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*');
        return { data, error };
    }

    async getById(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    }

    async create(item) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .insert(item)
            .select();
        return { data, error };
    }

    async upsert(item) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .upsert(item)
            .select();
        return { data, error };
    }

    async update(id, updates) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .update(updates)
            .eq('id', id)
            .select();
        return { data, error };
    }

    async delete(id) {
        const { error } = await this.supabase
            .from(this.tableName)
            .delete()
            .eq('id', id);
        return { error };
    }

    // Métodos para upload/download de arquivos
    async uploadFile(bucketName, filePath, file) {
        const { data, error } = await this.supabase
            .storage
            .from(bucketName)
            .upload(filePath, file);
        return { data, error };
    }

    async getFileUrl(bucketName, filePath) {
        const { data } = this.supabase
            .storage
            .from(bucketName)
            .getPublicUrl(filePath, {
                transform: {
                    width: 130,
                    height: 130,
                    resize: 'cover'
                }
            });
        return data.publicUrl;
    }

    async deleteFile(bucketName, filePath) {
        const { error } = await this.supabase
            .storage
            .from(bucketName)
            .remove([filePath]);
        return { error };
    }
}

export default SupabaseService;