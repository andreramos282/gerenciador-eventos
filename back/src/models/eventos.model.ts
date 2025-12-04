import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    data: { type: Date, required: true },
    local: { type: String, required: true },
    valor: { type: Number, required: true }
})

const EventoModel = mongoose.model("evento", EventoSchema)

export default EventoModel