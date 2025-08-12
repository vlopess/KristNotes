import SupabaseService from './supabase.service';
import { SUPABASE_CONFIG } from '../supabase.config';
import {getCurrentUserId} from "../utils/currentUser.js";

class UserService extends SupabaseService {
    constructor() {
        super('users');
    }

    async fetchCurrentUser() {
        const userId = await getCurrentUserId();
        const { data: data, error: error } = await this.getById(userId);
        if (error) throw error;
        return { data,  };
    }

    async getUserById(userId) {
        const { data: data, error: error } = await this.getById(userId);
        if (error) throw error;
        return { data,  };
    }

    async createUserWithPicture(userData, pictureFile) {
        // 1. Upload da imagem
        if (pictureFile) {
            const filePath = `user_${Date.now()}_${pictureFile.name}`;
            const { error: uploadError } = await this.uploadFile(
                SUPABASE_CONFIG.BUCKET_NAME,
                filePath,
                pictureFile
            );

            if (uploadError) throw uploadError;

            // 2. Adiciona a URL da imagem aos dados do usuário
            const { publicUrl } = await this.getFileUrl(
                SUPABASE_CONFIG.BUCKET_NAME,
                filePath
            );
            userData.picture_url = publicUrl;
        }

        return this.upsert(userData);
    }

    async updateUserPicture(userId, pictureFile) {
        const { data: user, error: userError } = await this.getById(userId);
        if (userError) throw userError;

        if (user.picture_url) {
            const oldFilePath = user.picture_url.split('/').pop();
            await this.deleteFile(SUPABASE_CONFIG.BUCKET_NAME, oldFilePath);
        }

        // 3. Faz upload da nova imagem
        const filePath = `${userId}/${Date.now()}_${userId}`;
        const { error: uploadError } = await this.uploadFile(
            SUPABASE_CONFIG.BUCKET_NAME,
            filePath,
            pictureFile
        );

        if (uploadError) throw uploadError;

        // 4. Atualiza a URL da imagem no usuário
        const publicUrl  = await this.getFileUrl(
            SUPABASE_CONFIG.BUCKET_NAME,
            filePath
        );

        return this.update(userId, { picture_url: publicUrl });
    }

    async updateUserBio(userId, newBio) {
        return this.update(userId, { bio: newBio });
    }

    async getByUsername(username) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('username', username)
            .single();
        return { data, error };
    }
}

export default new UserService();