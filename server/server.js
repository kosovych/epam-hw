// initialize global variable with our path
global.ABSPATH = __dirname;
global.INCPATH = ABSPATH + '/libs';

// helps to establish the right ways
const path = require('path');
// the framework itself - the shell over the node JS
const express = require('express');
// create our application
const app = express();
// our common config
const config = require( INCPATH + '/config' );
// log is a function. which is called with the current model to which
const log = require( INCPATH + '/log')(module);
// it is connected
const cors = require('cors');// https://github.com/expressjs/cors
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
const router = require('./middleware/api/list');

// const apiConfig = require(ABSPATH + '/api');
// app.use ->  this is middleware
app.use(cors());
// app.use('/api', apiConfig);
// reading static files
app.use(express.static(__dirname));
// initialize json parser
app.use(express.json());
// pars url
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);

// getting static file
app.get('/', function(req, res) {
  res.sendFile(path.resolve( __dirname, 'index.html' ));
});


// listen our post, 3000
app.listen(config.get('port'), function() {
  log.info('Server start running on port ' + config.get('port'));
});
