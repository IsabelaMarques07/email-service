//criação da rota
'use strict'

const express = require('express')
const router = new express.Router();

//endpoint
router.get('/', (req, res, next)=>{
    res.status(200).send({
        "nome":"Isabela",
        "idade": 19
    })
});

module.exports = router;
