const axios = require('axios'); 
const { Videogames, Genres } = require('../db'); 
const { API_KEY } = process.env;


// PARA CREAR VIDEOGAMES.
const createGamesController = async (name, description, platforms, background_image, released, rating) => {
    const newGame = await Videogames.create({name, description, platforms,background_image, released, rating});

    if(!name || !description || !platforms || !background_image || !released || !rating) {
        throw new Error('All fields are required');
    }

    return newGame;  
};  


// PARA TRAER INFO POR ID.
const getGamesId = async (id) => {
    if(isNaN(id)) {
        const gameDb = await Videogames.findByPk(id, {
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        return gameDb;
    }
    
    const peticion = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data; 
    console.log('PETICION', peticion);
    const infoApi = peticion; 

    const infoGame = {
        id: infoApi.id,
        name: infoApi.name,
        description: infoApi.description,
        platforms: infoApi.parent_platforms,
        background_image: infoApi.background_image,
        released: infoApi.released,
        rating: infoApi.rating,
        genres: infoApi.genres
    };

    return infoGame;
    /*const getGameById = peticion.map((info) => {
        return {
            id: info.id,
            name: info.name,
            description: info.description,
            platforms: info.platforms,
            background_image: info.background_image,
            released: info.released,
            rating: info.rating 
        };
    });*/
   
    //return getGameById
    //if(!getGameById) throw new Error(`The game with the id: ${id} was not found`);
};


// PARA TRAER INFO DE LA API.

const getGamesApi = async () => {
    let pageGame = []; 
    const url1 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)).data;
    const url2 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)).data;
    const url3 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)).data;
    const url4 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)).data;
    const url5 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)).data;

    pageGame = url1.results.concat(
        url2.results,
        url3.results,
        url4.results,
        url5.results 
    );

    const allGames = pageGame.map((game) => {
        return {
            id: game.id,
            name: game.name,
            platforms: game.parent_platforms,
            rating: game.rating,
            released: game.released 
        };
    });

    return allGames; 
};

/*const getGamesApi = async () => {
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
 */


// PARA TRAER INFO DE LA DB.
const getGamesDb =  async () => {
    const games = await Videogames.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
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
    getGamesId,
    createGamesController
};