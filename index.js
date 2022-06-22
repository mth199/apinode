// config inicial
require('dotenv').config()
const express = require ('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')


// forma de ler JSON / middlewares
app.use(
express.urlencoded({
    extended: true,
    }),
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rotal inicial / endpoint
app.get('/', (req, res) => {
//mostrar req

res.json({message: 'Oi Express!'})
})


// entregar uma porta

mongoose
.connect(
   process.env.DB
)
.then(() => {
    console.log('Conectamos ao mongoDB!')
    app.listen(3000)
    })
.catch((err) => console.log(err))

app.listen(3000)
