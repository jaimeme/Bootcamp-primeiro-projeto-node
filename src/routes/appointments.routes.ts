import { Router, request, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRespository from '../repositories/AppointmentsRespository';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();
const appointmentsRespository = new AppointmentsRespository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRespository.all();

    return response.json(appointments);
});
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInSameDate = appointmentsRespository.findByDate(
        parsedDate,
    );
    // se tiver um valor dentro do findAppointmentInSameDate ele vai entrar no if e retornar a mensagem, caso não tenha valor ele vai retornar undefined
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }
    const appointment = appointmentsRespository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentsRouter;
