#! /usr/bin/env node

// To run this script run - node populatedb mongodb://your_username:your_password@your_dabase_url
console.log('This script populates some test bot. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Bot = require('./models/bot')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var bots = []

function botCreate(name, description, cb) {
  bot_detail = {name:name , description: description }
  
  var bot = new Bot(bot_detail, cb);
       
  bot.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Bot: ' + bot);
    bots.push(bot)
    cb(null, bot)
  }  );
}


function createBots(cb) {
    async.parallel([
        function(callback) {
          botCreate('Bot1', 'This is the first bot', callback);
        },
        function(callback) {
          botCreate('Bot 2', 'The second one', callback);
        },
        function(callback) {
          botCreate('Bot 3', 'Guess what?', callback);
        },
        function(callback) {
          botCreate('Bot 4', 'That\'s enough', callback);
        },
        function(callback) {
          botCreate('Bot 5', 'Or not?', callback);
        },
        function(callback) {
          botCreate('Bot 6', 'This is the last one' , callback);
        }
        ],
        // optional callback
        cb);
}



async.series([
    createBots
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('bot: '+ bots);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



