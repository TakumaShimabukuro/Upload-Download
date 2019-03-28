var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var upload = require('./app/config/multer.config.js');
const expressSession = require('express-session');

app.use(expressSession({
    secret: 'dlsakfhuefbb',
    resave: false,
    saveUninitialized: false
}));

global.__basedir = __dirname;
message = '';

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
}); 

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

app.use(express.static('resources'));

var path = __basedir + '/views/';

app.get('/', (req, res) => {
    message = '';
    res.render('index',{msg: ''});
});

require('./app/routers/file.router.js')(app, router, upload);
require('./app/routers/user.router.js')(app, router);

app.get('*',(req, res) => {
    res.sendFile(path + '404.html');
});


// Create a Server
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port); 
});