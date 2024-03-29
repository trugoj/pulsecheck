'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const data = hook.data

    // Override the original data
    hook.data = {
      data,
      // Set the user id
      user: user,
      userId: user._id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
