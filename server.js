import express  from 'express';
import morgan from 'morgan';
import http from 'http';
import {Server as SocketServer} from 'socket.io'

import { PORT } from './config.js';
import cors from 'cors';

const app = express();
const server = http.createServer(app)
const io = new SocketServer(server ,{
    cors:{
        origin:'*',
    }
})

app.use(cors())
app.use(morgan("dev"));

io.on('connection', socket =>{
    const username = socket.handshake.query.username;
    socket.on('message',(message) =>{
        socket.broadcast.emit('message',{
            body:message,
            from:username
        });
    })
});


server.listen(PORT, () =>{
    console.log('Server is Listening on port', PORT);
})
