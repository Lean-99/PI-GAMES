const { Router } = require('express');
const { getGenderHandler } = require('../handlers/genresHandler');

const genresRouter = Router(); 

genresRouter
.get('/', getGenderHandler); 



module.exports = genresRouter; 