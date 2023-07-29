const { allInfo, getGamesId } = require('../controllers/gamesControllers');


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
    getGamesIdHandler
};