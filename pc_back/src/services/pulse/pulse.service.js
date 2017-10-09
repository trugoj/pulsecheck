// Initializes the `pulse` service on path `/pulse`
const createService = require('feathers-mongodb');
const hooks = require('./pulse.hooks');
const filters = require('./pulse.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/pulse', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pulse');

  mongoClient.then(db => {
    service.Model = db.collection('pulse');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
