import mongoose from "mongoose"
import app from "./app"

const port = 3001
const MONGODB_URI = "mongodb+srv://root:root@fatec.typea.mongodb.net/?retryWrites=true&w=majority&appName=fatec"

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch(err => console.log("Erro ao conectar ao MongoDB", err))

app.listen(port, '0.0.0.0', () => {
    console.log(`✅ | Servidor rodando na porta http://0.0.0.0:${port}`)
})