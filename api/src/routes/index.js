const { Router } = require('express');
const gamesRouter = require('./gamesRouter'); 
const genresRouter = require('./genresRouter'); 

const mainRouter = Router();

mainRouter
.use('/videogames', gamesRouter)
.use('/genres', genresRouter); 


module.exports = mainRouter;
