import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface requestDTO {
    email: string;
    password: string;
}

interface responseDTO {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: requestDTO): Promise<responseDTO> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Incorrect email/password combination');
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        const token = sign({}, '71ce3d0643c01de3024af66c79470695', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
