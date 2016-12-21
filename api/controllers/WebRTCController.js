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
		
		res.view('webrtc', {
			token: capability.generate()
		});
	}
};

