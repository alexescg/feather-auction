// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  // const mongoose =

  const messages = new mongooseClient.Schema({
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users'
    },
    to: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'users'
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  return mongooseClient.model('messages', messages);
};
