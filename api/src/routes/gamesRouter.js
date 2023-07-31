const { Router } = require('express'); 
const { getGamesHandler, getGamesIdHandler, createGamesHandler } = require('../handlers/videoGamesHandler');

const gamesRouter = Router(); 

gamesRouter
.get('/', getGamesHandler)
.get('/:id', getGamesIdHandler) 
.post('/', createGamesHandler); 


module.exports = gamesRouter; 