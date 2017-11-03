const assert = require('assert');
const app = require('../../src/app');

describe('\'pulse\' service', () => {
  it('registered the service', () => {
    const service = app.service('pulse');

    assert.ok(service, 'Registered the service');
  });
});
