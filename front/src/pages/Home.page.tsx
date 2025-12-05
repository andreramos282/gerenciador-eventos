import { useEffect, useState } from "react"
import css from "../styles/pages/home.module.css"
import getRequest from "../functions/getRequest"
import EventoType from "../types/evento.type"

function HomePage() {
    const [eventos, setEventos] = useState<EventoType[]>([])
    const url = "https://zany-giggle-pjg557q9xgv626vqr-3001.app.github.dev/"

    async function getEventos() {
        const eventos = await getRequest<EventoType[]>(url)
        if (typeof (eventos) != "string") {
            setEventos(eventos)
        } else {
            console.error("Erro ao buscar eventos")
        }
    }

    useEffect(() => {
        getEventos()
    }, [])

    return (
        <main className={css.main}>
            <h1>Hello World!</h1>

            {eventos.map((e, index) => {
                return (
                    <div key={index}>
                        {e.titulo}
                    </div>
                )
            })}
        </main>
    )
}

export default HomePage