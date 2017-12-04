const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const getmyip = require('./getmyip/getmyip.service.js');
const vote = require('./vote/vote.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(messages);
  app.configure(users);
  app.configure(getmyip);
  app.configure(vote);
};
