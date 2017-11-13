// Initializes the `getmyip` service on path `/getmyip`
const createService = require('./getmyip.class.js');
const hooks = require('./getmyip.hooks');
const filters = require('./getmyip.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'getmyip',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/getmyip', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('getmyip');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
