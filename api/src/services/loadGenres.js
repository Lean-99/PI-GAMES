const axios = require('axios'); 
const { Genres } = require('../db'); 
const { API_KEY } = process.env;


const loadGenresDb = async () => {
    const api =  (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data;
    const infoApi = api.results.map( async obj => {
        await Genres.findOrCreate({
            where: {
                id: obj.id,
                name: obj.name
            }
        });
    });
    
    console.log('DB CARGADA CON LOS GENEROS ✔️');
    return infoApi;
};



module.exports = loadGenresDb;
