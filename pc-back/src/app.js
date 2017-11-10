const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// This is for socket.io, but I imagine it's similar.
app.configure(socketio(function (io) {
   io.on('connection', function (socket) {
       console.log("whatsup?");
       Object.assign(socket.feathers, {headers: socket.handshake.headers});
           socket.feathers.ip = socket.conn.remoteAddress;
           socket.feathers.dataABC = "Hello World";
             });
             }));

app.use(function(req, res, next) {
            req.feathers.data123 = 'Hello world';
                next();
                  });
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

app.configure(middleware);
// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

//app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
app.hooks(appHooks);
app.use(notFound());
app.use(handler());

module.exports = app;
