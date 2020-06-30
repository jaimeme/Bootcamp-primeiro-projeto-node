import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
    // provider = o nome do profissional que vai atender
    //
    const { provider, date } = request.body;

    const appointment = {
        id: uuid(),
        provider,
        date,
    };
    appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentsRouter;
// adicionar uuidv4:
// yarn add uuidv4
