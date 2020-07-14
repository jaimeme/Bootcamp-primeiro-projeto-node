import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';
// import { parseISO } from 'date-fns';

// import AppointmentsRepository from '../repositories/AppointmentsRepository';
// import CreateAppointmentService from '../services/CreateAppointmentService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        return response.send();
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
// Foi criado um novo arquivo de rotas chamado users.routes.ts , nele terá o método de criação de usuário
// Onde nós temos o routes/index.ts
