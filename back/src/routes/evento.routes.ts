import { Router } from "express";
import EventoController from "../controllers/evento.controller";

class EventoRoutes {
    private controller: EventoController
    private router: Router = Router()

    private url: string = "/"
    private url_with_id: string = "/:id"

    constructor() {
        this.controller = new EventoController()

        this.router.post(
            this.url,
            this.controller.create.bind(this.controller)
        )

        this.router.put(
            this.url_with_id,
            this.controller.update.bind(this.controller)
        )

        this.router.get(
            this.url,
            this.controller.read.bind(this.controller)
        )

        this.router.delete(
            this.url_with_id,
            this.controller.delete.bind(this.controller)
        )
    }

    public getRouter() {
        return this.router
    }
}

const eventoRoutes = new EventoRoutes().getRouter()
export default eventoRoutes