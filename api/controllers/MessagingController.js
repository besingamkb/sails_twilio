/**
 * MessagingControllerController
 *
 * @description :: Server-side logic for managing Messagingcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    outbound: function(req, res) {

        if (!req.param('to')) {
            return res.json(202, {
                message: "`to` is required."
            });
        }

        if (!req.param('message')) {
            return res.json(202, {
                message: "`message` is required."
            });
        }

        var message = client.messages.create({
            to: req.param('to'),
            from: sails.config.twilio.number,
            body: req.param('message')
        }, function(err, data) {
            console.log(data);

            Communications.create({
                sid: data.sid,
                direction: 1,
                from: sails.config.twilio.number,
                to: req.param('to'),
                message: req.param('message'),
                duration: 0
            }).exec(function (err, comm) {

                sails.log(comm);
                sails.log('successfully save');
                sails.log(err);
                return res.ok();
            });
        });

        console.log(message);
        return res.json(202, {
            message: "message sent!"
        });
    },

    inbound: function(req, res) {
        sails.log(req.allParams());

        Communications.create({
            sid: req.param('MessageSid'),
            direction: 0,
            from: req.param('From'),
            to: req.param('To'),
            message: req.param('Body'),
            duration: 0
        }).exec(function (err, comm) {
            sails.log(comm);
            sails.log('successfully save');
            sails.log(err);
            return res.ok();
        });
    },

    fallback: function(req, res) {
        // TODO
    }
};

