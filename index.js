require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 3001

const api = express()
api.use(express.json())
api.use(cors({
    origin: "*"
}))

async function connect() {
    await mongoose.connect("mongodb+srv://adm:locura43@cluster0.trrfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    console.log("Banco de dados conectado com sucesso")
}
connect()


const escalaSchema = new mongoose.Schema({
    nome: String,
    turno: Number,
    folga: String,
    domingo: Boolean,
})

const escalaModel = mongoose.model("Escala", escalaSchema)


api.get("/", (req, res) => {
    res.json({ mensagem: "Ótima semana de trabalho" })
})
api.get("/funcionarios", async(req, res) => {
    const resultado = await escalaModel.find({})
    res.json(resultado)
})
api.post("/funcionarios", async(req, res) => {
    const resultado = await escalaModel.create(req.body)
    res.json({ mensagem: "Funcionário cadastrado com sucesso!" })
})

api.listen(PORT, () => {
    console.log("API Ligada na porta " + PORT)
})