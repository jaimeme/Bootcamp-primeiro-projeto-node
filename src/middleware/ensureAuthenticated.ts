import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import appointmentsRouter from '../routes/appointments.routes';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT Token is missing', 401);
    }
    const [, token] = authHeader.split(' ');

    const { secret } = authConfig.jwt;
    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
// Global Exception Handler
// é um middleware que vai identificar todos os erros que vem da nossa aplicação
// Primeiramente iremos tirar todos os try catchs das rotas
// vamos criar um app.use() dentro de server.ts
