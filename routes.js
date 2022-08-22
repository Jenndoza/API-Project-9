'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const router = express.Router();

//const {model} = require("./models")
const {User,Course} = require("./models")

router.use(express.json())

//Get router
router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });




module.exports= router