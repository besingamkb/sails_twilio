/**
 * WebRTCController
 *
 * @description :: Server-side logic for managing Webrtcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var account_sid = sails.config.twilio.account_sid;
var auth_token = sails.config.twilio.auth_token;

var twilio = require('twilio');

module.exports = {
	index: function(req, res) {
		var capability = new twilio.Capability(account_sid, auth_token);

        // Give the capability generator permission to accept incoming
        // calls to the ID 2 this is hardcoded for now
        capability.allowClientIncoming(2);

        // Give the capability generator permission to make outbound calls,
        // Using the following TwiML app to request call handling instructions:
        capability.allowClientOutgoing(sails.config.twilio.app_sid);

		sails.log(capability.generate());
		res.view('webrtc', {
			token: capability.generate()
		});
	}
};

