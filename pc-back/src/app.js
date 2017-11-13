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

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const dns = require('dns');
const {promisify} = require('util');

const dnsLookupAsync = promisify(dns.lookupService);

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
//app.configure(socketio());

// This is for socket.io, but I imagine it's similar.
app.configure(socketio(function (io) {
          io.on('connection', function (socket) {
                      Object.assign(socket.feathers, {headers: socket.handshake.headers});
                          str = socket.conn.remoteAddress;
                          str = str.substring(7);
                          socket.feathers.ip = str;

                          

                          socket.feathers.ipdnsP = dnsLookupAsync('10.11.44.221', 22);
                          //socket.feathers.ipdnsP.then( obj => console.log( "tralala: ", obj ) );


                          //        , (err, hostname, service) => {
                          //        console.log(hostname, service);
                          //        return hostname;
                          // });
          })}
));

app.use(function(req, res, next) {
        req.feathers.ip = req.ip;
        next();
})

app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);

module.exports = app;
