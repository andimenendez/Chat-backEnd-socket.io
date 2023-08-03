import express  from 'express';
import morgan from 'morgan';
import http from 'http';
import {Server as SocketServer} from 'socket.io'
import cors from 'cors';
import { PORT } from './config.js';
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server ,{
    cors:{
        origin:'http://localhost:5173',
    }
})

app.use(cors())
app.use(morgan("dev"));

io.on('connection', socket =>{
    const username = socket.handshake.query.username;
    console.log(username,"connected");
    socket.on('message',(message) =>{
        socket.broadcast.emit('message',{
            body:message,
            from:username
        });
        console.log(message);
    })
});


server.listen(PORT, () =>{
    console.log('Server is Listening on port', PORT);
})
