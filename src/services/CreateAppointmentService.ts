import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

// Utilizando o princípio de Dependency Inversion
// Foi preciso criar um constructor dentro desta classe para poder definir os valores appointmentsRepository que foram criados no models e podem ser vistos dentro no arquivo de rotas, entretanto este valor para poder ser acessado dentro deste arquivo precisa ser passado como parâmetro do novo contrutor, ficando assim

// código antigo:
// código atualizado:
class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );
        // se tiver um valor dentro do findAppointmentInSameDate ele vai entrar no if e retornar a mensagem, caso não tenha valor ele vai retornar undefined
        if (findAppointmentInSameDate) {
            throw Error('this appointment is already booked');
        }
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
