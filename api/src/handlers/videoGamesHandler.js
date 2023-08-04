const { allInfo, getGamesId, createGamesController } = require('../controllers/gamesControllers');


const createGamesHandler = async (req, res) => {
    const { name, description, platforms, image, released, rating } = req.body; 
    
    try {
        const response = await createGamesController(name, description, platforms, image, released, rating); 
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 


const getGamesHandler = async (req, res) => {
    const { name } = req.query; 

    try {
        if(name) {
            const response = await allInfo(name);
            return res.status(200).json(response); 
        }

        const response = await allInfo();
        res.status(200).json(response); 
    } catch (error) {
        res.status(404).json({error: error.message}); 
    }
};


const getGamesIdHandler = async (req, res) => {
    const { id } = req.params; 

    try {
        const response = await getGamesId(id); 
        res.status(200).json(response); 
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};



module.exports = {
    getGamesHandler,
    getGamesIdHandler,
    createGamesHandler
};