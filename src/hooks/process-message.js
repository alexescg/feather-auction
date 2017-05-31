// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
'use strict';
const mongoose = require('mongoose');
module.exports = function() {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    const to = hook.data.to;
    // The actual message text
    const text = hook.data.text
      // Messages can't be longer than 400 characters
      .substring(0, 400)
      // Do some basic HTML escaping
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Override the original data
    hook.data = {
      text,
      // Set the user id
      user: user._id,
      to: mongoose.Types.ObjectId(to._id),
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };
    console.log(hook.data);

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
