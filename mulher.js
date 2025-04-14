const express = require("express")  
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Karla Beatriz Nunes',
        imagem: 'https://github.com/beatriznuns.png',
        minibio: 'Engenheira de Software'
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)

