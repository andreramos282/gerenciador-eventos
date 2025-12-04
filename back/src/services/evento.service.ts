import EventoModel from "../models/eventos.model";
import EventoType from "../types/evento.type";
import EventoEditType from "../types/eventoEdit.type";

class EventoService {
    public async create(evento: EventoType) {
        const newEvento = new EventoModel(evento)
        newEvento.save()
    }

    public async read(titulo?: string) {
        if (titulo) {
            const eventos = await EventoModel.find({ titulo })
            return eventos
        } else {
            const eventos = await EventoModel.find()
            console.log(eventos)
            return eventos
        }
    }

    public async update(id: string, evento: EventoEditType) {
        await EventoModel.findByIdAndUpdate(id, evento, { new: true })
    }

    public async delete(id: string) {
        await EventoModel.findByIdAndDelete(id)
    }
}

export default EventoService