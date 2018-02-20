var Bot = require('../models/bot');

exports.bot = function (req, res, next) {
    Bot.findById(req.params.id, function (err, bot) {
        if (err) { return next(err); }
        res.json({ bot })
    });
}
// Display list of all Bots.
exports.bot_list = function (req, res, next) {

    Bot.find()
        .exec(function (err, list_bots) {
            if (err) { return next(err); }
            //Successful
            res.json({ list_bots });
        });
};

// Handle Bot create on POST.
exports.bot_create_post = function (req, res) {
    var bot = new Bot(
        {
            name: req.body.name,
            description: req.body.description
        });

    bot.save(function (err, bot) {
        if (err) { return next(err); }
        res.json({ bot: bot })
    });
};

// Handle Bot delete on POST.
exports.bot_delete_post = function (req, res, next) {
    Bot.findByIdAndRemove(req.params.id, function deleteBot(err) {
        if (err) { return next(err); }

        res.json({})
    })
};

// Handle Bot update on POST.
exports.bot_update_post = function (req, res, next) {

    var bot = new Bot(
        {
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id
        });

    Bot.findByIdAndUpdate(req.params.id, bot, {}, function (err, bot) {
        if (err) { return next(err); }
        res.json({ bot: bot })
    });
};