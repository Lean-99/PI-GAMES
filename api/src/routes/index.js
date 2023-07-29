const { Router } = require('express');
const gamesRouter = require('./gamesRouter'); 


const mainRouter = Router();

mainRouter
.use('/videogames', gamesRouter);  


module.exports = mainRouter;
