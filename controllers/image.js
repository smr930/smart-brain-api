const Clarifai = require('clarifai');

// Clarifai API configuration
const { REACT_APP_CLARIFAI_API_KEY } = process.env;
const clarifai = new Clarifai.App({
    apiKey: REACT_APP_CLARIFAI_API_KEY,
});
const handleImageApi = (req, res) => {
    clarifai.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {
            res.json(entries[0]);
        })
        .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleImage,
    handleImageApi,
};
