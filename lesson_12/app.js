// Require packages and set the port
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();

var logger = require('morgan');
app.use(logger('dev'));


app.set('view engine', 'pug');


let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);



// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
