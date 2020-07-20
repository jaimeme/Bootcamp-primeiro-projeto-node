/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }
        if (user.avatar) {
            // Apagando caso exista
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            // Juntando o path de onde fica o arquivo com o nome do arquivo
            const userAvatarFileExist = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
