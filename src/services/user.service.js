import SupabaseService from './supabase.service';
import { SUPABASE_CONFIG } from './supabase.config';

class UserService extends SupabaseService {
    constructor() {
        super('users');
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

        // 3. Cria o usuário
        return this.create(userData);
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
        const filePath = `user_${userId}_${Date.now()}_${pictureFile.name}`;
        const { error: uploadError } = await this.uploadFile(
            SUPABASE_CONFIG.BUCKET_NAME,
            filePath,
            pictureFile
        );

        if (uploadError) throw uploadError;

        // 4. Atualiza a URL da imagem no usuário
        const { publicUrl } = await this.getFileUrl(
            SUPABASE_CONFIG.BUCKET_NAME,
            filePath
        );

        return this.update(userId, { picture_url: publicUrl });
    }
}

export default new UserService();