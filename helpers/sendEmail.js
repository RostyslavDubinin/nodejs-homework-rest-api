const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async(data) => {
  const email = { ...data, from: 'rostyslavdubinin@gmail.com' }
  await sgMail.send(email)
}

module.exports = sendEmail