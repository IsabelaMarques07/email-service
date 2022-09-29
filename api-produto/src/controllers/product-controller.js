const mongoose = require('mongoose');
const repository = require('../repositories/product-repository');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.get = async(req, res, next)=>{
    const data = await repository.getProduct();
    res.status(200).send(data);
}

exports.post = async(req, res, next)=>{
    try {
        await repository.create(req.body);

        await fetch('http://localhost:8080/send-email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "emailFrom": "isabela.fiap0710@gmail.com",
                "emailTo": "isabela.fiap0710@gmail.com",
                "subject": "Cadastro de produto com sucesso",
                "text": `Nome: ${req.body.title}\n Descrição: ${req.body.description}\n Valor: R$ ${req.body.price}\n ${req.body.active? 'Disponível em estoque': 'Indisponível no estoque'}`
              }),
            redirect: 'follow'
        });

        res.status(201).send({message: "Criado com sucesso!"});
    } catch (error) {
        res.status(400).send({message: 'erro ao cadastrar produto'})
    }
   
}
exports.put = async(req, res, next)=>{
    const id = req.params.id;
    const body = req.body;
    await repository.put(id, body);

    res.status(200).send({message: 'Atualizado com sucesso!'})
}

exports.getById = async(req, res, next)=>{
    const id = req.params.id;
    const data = await repository.getById(id);
    if(data == null){
        res.status(404).send();
    }
    res.status(200).send(data)
}

exports.delete = async(req, res, next)=>{
    const id = req.params.id;
    await repository.delete(id);
    res.status(200).send({message: 'Desabilitado com sucesso!'});
}