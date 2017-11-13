const assert = require('assert');
const app = require('../../src/app');

describe('\'getmyip\' service', () => {
  it('registered the service', () => {
    const service = app.service('getmyip');

    assert.ok(service, 'Registered the service');
  });
});
