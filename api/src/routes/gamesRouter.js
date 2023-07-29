const { Router } = require('express'); 
const { getGamesHandler, getGamesIdHandler } = require('../handlers/videoGamesHandler');

const gamesRouter = Router(); 

gamesRouter
.get('/', getGamesHandler)
.get('/:id', getGamesIdHandler) 


module.exports = gamesRouter; 