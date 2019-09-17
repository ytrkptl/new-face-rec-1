const Clarifai = require('clarifai')
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
  console.log(req);
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(404).json(`unable to work with API ${err}`))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}