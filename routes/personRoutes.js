const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) =>{

    //req.body
        
        try {
            const { name, nickname, approved} = req.body

                        const person = {
                            name,
                            nickname,
                            approved,
                        }
    
            //criando dados
            await Person.create(person)
    
            res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
    
            } catch (error) {
                res.status(500).json({error: error})
    }
    })

    //Read - leitura de dados
    router.get('/', async (req, res) => {
        try{

            const people = await Person.find()

            res.status(200).json(people)
            } catch (error) {
                res.status(500).json({error: error})
                }
                })

                router.get('/:id', async (req, res) => {
                const{id} = req.params
                 
                try {

                        const person = await Person.findOne({_id: id})

                        if(!person) {
                            res.status(422).json ({message: 'O usuário não foi encontrado!'})
                            return
                            }

                        res.status(200).json(person)
                        } catch (error) {
                        res.status(500).json({error: error})
                        }

                    })

                    //update - atualização de dados (PUT, PATCH)
                    router.patch('/:id', async (req, res) => {

                        const id = req.params.id 
                        const { name, nickname, approved} = req.body

                        const person = {
                            name,
                            nickname,
                            approved,
                        }

                        try{

                            const updatedPerson = await Person.updateOne({_id: id}, person)

                            if(updatedPerson.matchedCount === 0){
                                res.status(422).json ({message: 'O usuário não foi encontrado!'})
                                return
                             
                                }


                            res.status(200).json(person)
                            } catch(error) {
                                res.status(500).json({error: error})
                            }
                            })

                            //Delete - deletar dados
                            router.delete('/:id' , async(req, res) => {
                                const id = req.params.id

                                const person = await Person.findOne({_id: id})

                        if(!person) {
                            res.status(422).json ({message: 'O usuário não foi encontrado!'})
                            return
                            }

                            try {

                                await Person.deleteOne({_id: id})
                                res.status(200).json({message: 'Usuário removido com sucesso'})
                              
                            } catch(error) {
                                    res.status(500).json({ error: error})
                                    }
                                    })



    module.exports = router