import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface requestDTO {
    email: string;
    password: string;
}

interface responseDTO {
    user: User;
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

        return { user };
    }
}

export default AuthenticateUserService;
