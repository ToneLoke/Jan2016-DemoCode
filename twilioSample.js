var
  config = require('./config'),
  client = require('twilio')(config.accountSid, config.authToken)

module.exports.sendSms = function (to, message) {
  console.log('======SENDING SMS TO====', to)
  client.messages.create({
    body: message,
    to: to,
    from: config.sendingNumber
  //  mediaUrl: imageUrl
  }, function (err, data) {
    if (err) {
      console.error('Could not notify administrator')
      console.error(err)
    } else {
      console.log('Administrator notified')
    }
  })
}
// ====================== //
// =====Patient Methods===== //
patientSchema.pre('save', function (next) {
  // 'this' refers to the user being saved
  // console.log('++++++Patient Model pre-save Running+++++++', this)
  // if (!this.isModified('password')) return next()
  // this.password = bcrypt.hashSync(this.password, 8)
  var messageToSend = newPatientAlert(this)
  twilioClient.sendSms('+15044731959', messageToSend)
  next()
})
// ====================== //
// Alert functions
function newPatientAlert (patient) {
  console.log('======SENDING ALERT======', patient)
  return 'You have a new member! Name: ' + patient.fname + ' ' + patient.lname + 'Verify them here:'
}
