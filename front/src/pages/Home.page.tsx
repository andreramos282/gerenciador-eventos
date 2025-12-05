import { useEffect, useState } from "react"
import css from "../styles/pages/home.module.css"
import getRequest from "../functions/getRequest"
import EventoType from "../types/evento.type"
import postRequest from "../functions/postRequest"
import EventoEditType from "../types/eventoEdit.type"
import putRequest from "../functions/putRequest"
import deleteRequest from "../functions/deleteRequest"

function HomePage() {
    const [eventos, setEventos] = useState<EventoType[]>([])
    const [titulo, setTitulo] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [data, setData] = useState<string>("")
    const [local, setLocal] = useState<string>("")
    const [valor, setValor] = useState<string>("0")

    const url = "https://zany-giggle-pjg557q9xgv626vqr-3001.app.github.dev/"

    async function getEventos() {
        const eventos = await getRequest<EventoType[]>(url)
        if (typeof (eventos) != "string") {
            setEventos(eventos)
        } else {
            console.error("Erro ao buscar eventos")
        }
    }

    async function postEventos() {
        const hasTitulo = titulo !== ""
        const hasData = data !== ""
        const hasLocal = local !== ""
        const hasValor = valor !== ""

        if (!hasTitulo || !hasData || !hasLocal || !hasValor) {
            console.log(titulo, data, local, valor)
            console.error("Valores nulos!")
            return
        }

        const evento: EventoType = {
            titulo,
            descricao,
            data: new Date(data),
            local,
            valor: Number(valor)
        }

        await postRequest(url, evento)
        window.location.reload()
    }

    async function editEventos(evento: EventoType) {
        const newEvento = {
            titulo: window.prompt("Titulo", evento.titulo) || undefined,
            descricao: window.prompt("Descrição", evento.descricao) || undefined,
            data: window.prompt("Data", new Date(evento.data).toISOString().split('T')[0]) ? new Date(window.prompt("Data", new Date(evento.data).toISOString().split('T')[0]) as string) : undefined,
            local: window.prompt("Local", evento.local) || undefined,
            valor: window.prompt("Valor", evento.valor.toString()) ? Number(window.prompt("Valor", evento.valor.toString())) : undefined
        }
        await putRequest(url + evento._id, newEvento)
        window.location.reload()
    }

    async function deleteEvento(evento: EventoType) {
        await deleteRequest(url + evento._id)
        window.location.reload()
    }

    useEffect(() => {
        getEventos()
    }, [])

    return (
        <main className={css.main}>
            <h1>Hello World!</h1>

            <input placeholder="Titulo*" type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
            <input placeholder="Descrição" type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <input placeholder="" type="date" value={data} onChange={e => setData(e.target.value)} />
            <input placeholder="Local" type="text" value={local} onChange={e => setLocal(e.target.value)} />
            <input placeholder="" type="number" value={valor} onChange={e => setValor(e.target.value)} />
            <button onClick={postEventos}>Criar</button>

            <hr />

            {eventos.map((e, index) => {
                return (
                    <div key={index}>
                        <br />
                        {e.titulo} <br />
                        {e.descricao} <br />
                        {e.local} <br />
                        {e.valor} <br />
                        {new Date(e.data).toLocaleDateString()} <br />
                        <button onClick={() => editEventos(e)}>edit</button>
                        <button onClick={() => deleteEvento(e)}>remove</button>
                    </div>
                )
            })}
        </main>
    )
}

export default HomePage