  
const express = require('express');
const mougoose = require('mongoose')
const routes = require('./routes');
const path = require('path')
const cors = require('cors')
const httpserver = express();
const server = require('http').Server(httpserver)
const io = require('socket.io')(server)
const connectedUsers = {};

io.on('connection', socket => {
    connectedUsers[user] = socket.id
    console.log('novo', socket.id)
})

mougoose.connect('mongodb+srv://root:pitoco1569@cluster0-m2l22.mongodb.net/agenda?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

httpserver.use((req,res,next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers

    return next()
})

httpserver.use(cors())
httpserver.use(express.static(path.resolve(__dirname, 'public')))
httpserver.use(express.json())
httpserver.use(routes);

server.listen(process.env.PORT || 3333);