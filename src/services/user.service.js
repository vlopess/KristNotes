import SupabaseService from './supabase.service';
import { SUPABASE_CONFIG } from '../supabase.config';
import {getCurrentUserId} from "../utils/currentUser.js";

class UserService extends SupabaseService {
    constructor() {
        super('users');
    }

    async fetchCurrentUser() {
        const userId = await getCurrentUserId();
        const { data: user, error: userError } = await this.getById(userId);
        if (userError) throw userError;
        return { user, userError };
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
        // 1. Primeiro obtém o usuário para ver se já tem uma imagem
        const { data: user, error: userError } = await this.getById(userId);
        if (userError) throw userError;

        // 2. Se já tiver imagem, deleta a antiga
        if (user.picture_url) {
            const oldFilePath = user.picture_url.split('/').pop();
            await this.deleteFile(SUPABASE_CONFIG.BUCKET_NAME, oldFilePath);
        }

        // 3. Faz upload da nova imagem
        const filePath = `${userId}/${Date.now()}_${pictureFile.name}`;
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
        console.log('publicUrl', publicUrl);

        return this.update(userId, { picture_url: publicUrl });
    }

    async updateUserBio(userId, newBio) {
        return this.update(userId, { bio: newBio });
    }
}

export default new UserService();