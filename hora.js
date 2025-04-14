const express = require('express')
const router = express.Router()
const app = express()

const PORTA = 3334

function mostraHora(request, response) {
    const data = new Date()
    const hora = data.toLocaleTimeString('pt-BR')
        response.send(hora)
    
}

function mostraPorta() {
    console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

router.get('/hora', mostraHora)
app.use(router)

app.listen(PORTA, mostraPorta)