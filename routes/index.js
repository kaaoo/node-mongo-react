var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Require controller modules.
var bot_controller = require('../controllers/botController');


/// BOT ROUTES ///

router.get('/bots/:id', bot_controller.bot);

router.get('/', bot_controller.bot_list);

// POST request for creating Bot.
router.post('/bot/create', bot_controller.bot_create_post);

// POST request to delete Bot.
router.delete('/bot/:id/delete', bot_controller.bot_delete_post);

// POST request to update Bot.
router.post('/bot/:id/update', bot_controller.bot_update_post);

// GET request for list of all Bot items.
router.get('/bots', bot_controller.bot_list);


module.exports = router;
