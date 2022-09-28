//criação do server
//expor a porta da aplicação
'use strict'

const http = require('http')
const app = require('../src/app')

//definir a porta
const port = searchPort(process.env.PORT || '3001')

const server = http.createServer(app)
server.listen(port)
// server.on('error')
// server.on('listening', )
console.log(`Api executada na porta ${port}`)


function searchPort(val){
    const port = parseInt(val);

    if(isNaN(port))
        return val;
    if(port >= 0)
        return port;
    return;
}

