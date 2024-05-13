import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import gameResultsRoutes from './routes/gameResults.js'
import leaderBoardRoutes from './routes/leaderBoardRoute.js'
import gamesForUser from './routes/gamesForUser.js'
import tournamentRoutes from './routes/tournamentRoutes.js';
import tournamentResultsRoutes from './routes/tournamentResultsRoutes.js'
import tournamentFixturesRoutes from './routes/fixturesRoutes.js'
import tournamentRankingRoutes from './routes/tournamentRankingRoutes.js'

import connectToMongoDB from './db/connectToMongoDb.js';
import { app, server } from './socket/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000


//middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes )
app.use('/api/games', gameResultsRoutes)
app.use('/api/ranking',leaderBoardRoutes)
app.use('/api/gamesFor', gamesForUser)
app.use('/api/tournament', tournamentRoutes)
app.use('/api/tournamentResults', tournamentResultsRoutes)
app.use('/api/tournamentFixtures', tournamentFixturesRoutes)
app.use('/api/tournamentRanking', tournamentRankingRoutes)



app.get('/', (req,res)=>{
    res.send('Hello there')
})
 

server.listen(PORT,()=>{
    connectToMongoDB()
    console.log('server is running on ' + PORT)
})