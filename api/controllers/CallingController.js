/**
 * CallingControllerController
 *
 * @description :: Server-side logic for managing Callingcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var account_sid = sails.config.twilio.account_sid;
var auth_token = sails.config.twilio.auth_token;

var twilio = require('twilio');
var client = twilio(account_sid, auth_token);

module.exports = {
	inbound: function(req, res) {
        // Create a TwiML response
        var resp = new twilio.TwimlResponse();

        resp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and sails.js');

        //Render the TwiML document using "toString"
        res.writeHead(200, {
            'Content-Type':'text/xml'
        });

        Communications.create({
            sid: 0,
            direction: 0,
            from: req.param('From'),
            to: req.param('To'),
            message: "this is an inbound call",
            duration: 0
        }).exec(function (err, comm) {
            sails.log(comm);
            sails.log('successfully save');
            sails.log(err);
            return res.ok();
        });

        res.end(resp.toString());
    },
    outbound: function(req, res) {

        if (!req.param('to')) {
            return res.json({
                message: 'number is required'
            });
        }

        client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml",
            to: req.param('to'),
            from: sails.config.twilio.number
        }, function(err, call) {
            sails.log(err);
        });

        Communications.create({
            sid: 0,
            direction: 1,
            from: sails.config.twilio.number,
            to: req.param('to'),
            message: "this is an outbound call",
            duration: 0
        }).exec(function (err, comm) {
            sails.log(comm);
            sails.log('successfully save');
            sails.log(err);
            return res.ok();
        });
    },

    fallback: function(req, res) {

    },

    status: function(req, res) {

    }
};

