import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

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

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
