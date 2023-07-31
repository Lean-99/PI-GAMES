const { Genres } = require('../db'); 

const getGenderController =  async () => {
    const getGenres = await Genres.findAll({
        attributes: ['name']
    });

    return getGenres; 
}; 




module.exports = {
    getGenderController
}; 