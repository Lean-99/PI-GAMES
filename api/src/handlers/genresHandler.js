const { getGenderController } = require('../controllers/genresController');


const getGenderHandler = async (req, res) => {
    try {
        const response = await getGenderController();
        res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
};


module.exports = {
    getGenderHandler
};