const { NotFound } = require('http-errors')
const User = require('../model/schemas/user');
const sendEmail = require('../helpers/sendEmail')

const verify = async(req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null })

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful'
  })
}

const verifyAgain = async(req, res) => {
  const { email } = req.body
  if (!email) {
    res.json({
      code: 400,
      message: 'Missing required field email'
    })
    return
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.json({
      code: 400,
      message: 'User not found'
    })
    return
  }
  if (user.verify) {
    res.json({
      code: 400,
      message: 'Verification has already been passed'
    })
    return
  }
  const registrationMail = {
    to: email,
    subject: 'Registration confirm',
    html: `<a href = "http://localhost:3000/api/users/verify/${user.verificationToken}">Click it to confirm a registration</a>`
  }
  sendEmail(registrationMail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = { verify, verifyAgain };