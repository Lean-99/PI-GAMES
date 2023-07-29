const axios = require('axios'); 
const { Videogame, Genres } = require('../db'); 
const { API_KEY } = process.env;


// PARA TRAER INFO POR ID.
const getGamesId = async (id) => {
    if(isNaN(id)) {
        const gameDb = await Videogame.findByPk(id);
        return gameDb;
    }

    const gameApi = await getGamesApi(); 
    //console.log(id);
    const gameId = gameApi.find(obj => obj.id == id); 

    if(!gameId) throw new Error(`The game with the id: ${id} was not found`);

    return gameId; 
};


// PARA TRAER INFO DE LA API.
const getGamesApi = async () => {
    const peticion =  (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
    const apiInfo = peticion.results.map((info) => {
        return {
            id: info.id,
            name: info.name,
            description: info.description,
            platforms: info.parent_platforms,
            background_image: info.background_image,
            released: info.released,
            rating: info.rating 
        };
    });

    return apiInfo; 
};


// PARA TRAER INFO DE LA DB.
const getGamesDb =  async () => {
    const games = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name', 'id']
        }
    }); 

    return games; 
}; 


// PARA RETORNAR TODA LA INFO (DB Y API).
const allInfo = async (name) => {
    const gamesApi = await getGamesApi();
    const gamesDb = await getGamesDb(); 
    const allData = [...gamesApi, ...gamesDb];

    if(name) {
        let filterGames = allData.filter((games) => 
        games.name.toLowerCase().includes(name.toLowerCase()));

        if(!filterGames.length) throw new Error(`The game with the name: ${name}, was not found`);

        return filterGames; 
    }
    
    return allData; 
}; 
 


module.exports = {
    allInfo,
    getGamesId
};