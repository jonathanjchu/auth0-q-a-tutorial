//import dependencies
const express = require('express'),
      mongoose = require("mongoose"),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      helmet = require('helmet'),
      morgan = require('morgan'),
      DB_NAME = "q_a";

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


// the database
require('./server/utils/mongoose')(DB_NAME)
require('./server/utils/routes')(app)

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});