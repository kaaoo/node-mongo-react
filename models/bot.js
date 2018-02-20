var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BotSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    description: {type: String, required: false}
  }
);

// Virtual for bot's URL
BotSchema
.virtual('url')
.get(function () {
  return '/bots/' + this._id;
});

//Export model
module.exports = mongoose.model('Bot', BotSchema);