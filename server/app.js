import express from 'express'
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan';
import 'express-async-errors';
import tweetRouter from './router/tweets.js'
import { validationResult } from 'express-validator';
import authRouter from './router/auth.js'
import { config } from './config.js';
import { Server } from 'socket.io';
import { initSocket } from './connection/socket.js'
import { db } from './db/database.js';
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());


app.use('/tweets', tweetRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})

app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
})

db.getConnection().then(connection => console.log(connection))
const server = app.listen(config.host.port);
initSocket(server);
// const socketIO = new Server(server, {
//     cors:{
//         origin: '*',
//     }
// })



// socketIO.on('connection', (socket) => {
//     console.log('Client is here!')
//     socketIO.emit('dwitter', 'Hello');
//     socketIO.emit('dwitter', 'Hello')
// })