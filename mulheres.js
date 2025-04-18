const express = require("express") // aqui estou iniciado o express
const router = express.Router() // aqui estou configurando a primeira rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa API no frontend
const conectabancodeDados = require('./bancodeDados'); // aqui estou ligando ao arquivo banco de dados

conectabancodeDados() // estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciado o app
app.use(express.json())
app.use(cors())

const porta = 3334 // aqui estou criando a porta

//GET
async function mostraMulheres(request, response){
  try {
      const mulheresVindasDoBancoDeDados = await Mulher.find()
      response.json(mulheresVindasDoBancoDeDados)
  }catch (erro)  {
        console.log(erro)
  }
 }

//POST
async function criaMulher(request, response) {
   const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
   })

   try {
    // Tenta salvar a nova mulher no banco de dados
    const mulherCriada = await novaMulher.save()
    // Retorna a mulher criada com status 201 (Criado)
    response.status(201).json(mulherCriada)
   } catch (erro) {
    //Se ocorrer algum erro, exibe no console
    console.log (erro);
    //Retorna um erro 500 (Erro do servidor) com a mensagem do erro
    response.status (500).json({ message: 'Erro ao criar mulher', error: erro.message});
   }

}

//PATCH
async function corrigeMulher(request, response) {
      try {
       const mulherEncontrada = await Mulher.findById(request.params.id)
       
       if (request.body.nome) { 
        mulherEncontrada.nome = request.body.nome
      }
        
      if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
      }
      
      if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
      }
      if (request.body.citacao){
        mulherEncontrada.citacao = request.body.citacao
      }

      const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

      response.json(mulherAtualizadaNoBancoDeDados)

  } catch (erro) {
        console.log(erro)
      }
    }
//DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({messagem: 'Mulher deletada com sucesso!'})
  
  } catch(erro) {
    console.log(erro)
  }
}

//ROTAS

app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET /MULHERES
app.use(router.post('/mulheres', criaMulher)) //configurei rota POST /MULHERES
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei a rota PATCH /MULHERES
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei a rota DELETE /MULHERES

//PORTA
function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta