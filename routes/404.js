const express = require('express');
const errorController = require('../controllers/404');
const errorRout = express.Router();

errorRout.get('*', errorController.get404);

module.exports = errorRout;