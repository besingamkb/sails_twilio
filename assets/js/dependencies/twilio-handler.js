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
    // connection.accept();
    console.log(connection);

    window.connection = connection;

    $('span.from').text(connection.parameters.From);
    $('div#incoming_div').show();
    // $('p#status').html('Call in progress...');
});

// Register an event handler for when a call ends for any reason
Twilio.Device.disconnect(function(connection) {
    $('#outbound_call').show();
});

// Diconnected
Twilio.Device.disconnect(function (connection) {
    $('div#incoming_div').hide();
});

// cancel
Twilio.Device.cancel(function (connection) {
    $('div#incoming_div').hide();
});

// Add a click event for the button, which will hang up the current
// call when clicked:
$('#hangup').click(function() {
    Twilio.Device.disconnectAll();

    $('#status').text('Call Ended');

    setTimeout(function() {
        $('#status').text('');
    }, 1000);
});

$('#outbound_call').click(function(e) {
    var params = {
        "To": $('#number').val()
    };

    $('#outbound_call').hide();

    $('#status').text("Calling " + params.To);
    Twilio.Device.connect(params);
    e.preventDefault();
});

$('#incoming_accept').click(function(e) {

    window.connection.accept();
    $('#incoming_accept').hide();
    e.preventDefault();
});