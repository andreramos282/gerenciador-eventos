import { Request, Response } from "express";
import EventoService from "../services/evento.service";
import EventoType from "../types/evento.type";
import EventoEditType from "../types/eventoEdit.type";

class EventoController {
    private service: EventoService

    constructor() {
        this.service = new EventoService()
    }

    public async create(req: Request, res: Response) {
        try {
            const { titulo, descricao, data, local, valor } = req.body
            if (!titulo || !data || !local || !valor) {
                res.status(400).json({ message: "titulo, data, local e valor são obrigatórios" })
                return
            }

            const evento = { titulo, descricao, data: new Date(data), local, valor: Number(valor) }
            await this.service.create(evento)
            res.sendStatus(201)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { titulo, descricao, data, local, valor } = req.body
            const evento: EventoEditType = {
                titulo,
                descricao,
                data: data ? new Date(data) : undefined,
                local,
                valor: isNaN(Number(valor)) ? undefined : Number(valor)
            }
            await this.service.update(id, evento)
            res.sendStatus(200)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { tituloQuery } = req.query
            const titulo = tituloQuery ? String(tituloQuery) : undefined
            const eventos = await this.service.read(titulo)
            res.status(200).json(eventos)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.service.delete(id)
            res.sendStatus(204)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }
}

export default EventoController