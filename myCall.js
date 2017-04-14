/**
 * @file Defines Translates functions for Spark
 * @author guillain (guillain@gmail.com)
 * @license GPL-3.0
 */

// Load config
var config = require('./config');

// OutboundCall
exports.outboundCall = function (bot, trigger) {
  var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
  twilio.calls.create({
    url: config.twilio.url,
    to: config.twilio.myPhoneNb,
    from: config.twilio.pilotPhoneNb
  }, function(err, call) {
    console.log('OutboundCall:'+call.sid);
  });
  bot.say('Call done');
};

// Order commands
exports.orderCmdCall = function (bot, trigger) {
  var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
  twilio.calls.create({
    url: config.twilio.url,
    to: config.twilio.myPhoneNb,
    from: config.twilio.pilotPhoneNb,
    record: 1
  }, function(err, call) {
    console.log('OrderCmdCall:'+call.sid);
  });
  bot.say('Call done');
};

// InboundCall
exports.inboundCall = function (bot, trigger) {
  var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
  http = require('http');

  http.createServer(function (req, res) {
    console.log(req);
    var twilio = require('twilio'), http = require('http');
    var resp = new twilio.TwimlResponse();
    resp.say({voice:'woman'}, config.twilio.inboundCallMsg);
    resp.say({voice:'woman'}, config.twilio.requestCmdMsg);
    res.writeHead(200, {
      'Content-Type':'text/xml'
    });
    res.end(resp.toString());
    console.log('InboundCall');
  }).listen(config.twilio.portInCall);

  tosay  = 'Ready to get the call on the phone number '+config.twilio.pilotPhoneNb+'\n\n';
  tosay += 'Visit '+config.url+':'+config.twilio.portInCall+' in your browser to see your TwiML document! \n';

  //var transcription = twilio.GetTranscription("TR8c61027b709ffb038236612dc5af8723");    
  //console.log(transcription.TranscriptionText);

  bot.say(tosay);
};
