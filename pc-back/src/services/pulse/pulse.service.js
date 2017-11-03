// Initializes the `pulse` service on path `/pulse`
const createService = require('feathers-nedb');
const createModel = require('../../models/pulse.model');
const hooks = require('./pulse.hooks');
const filters = require('./pulse.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'pulse',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pulse', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pulse');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
