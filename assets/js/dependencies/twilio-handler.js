/**
 * Created by mark on 12/21/16.
 */
// Set up the Twilio "Device" (think of it as the browser's phone) with
// our server-generated capability token, which will be inserted by the
// EJS template system:
Twilio.Device.setup(setup_token);

// Register an event handler to be called when there is an incoming
// call:
Twilio.Device.incoming(function(connection) {
    //For demo purposed, automatically accept the call
    connection.accept();
    $('p#status').html('Call in progress...');
});

// Register an event handler for when a call ends for any reason
Twilio.Device.disconnect(function(connection) {
    $('p#status').html('Awaiting incoming call...');
});

// Add a click event for the button, which will hang up the current
// call when clicked:
$('#hangup').click(function() {
    Twilio.Device.disconnectAll();
});

$('#call').click(function(e) {

    e.preventDefault();
});