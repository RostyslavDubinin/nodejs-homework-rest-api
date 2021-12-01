const User = require('./schemas/user');
const gravatar = require('gravatar');
const { uuid } = require('uuidv4');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findById = async (id) => {
  return User.findOne({ _id:id })
};

const create = async ({ email, password }) => {
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const verificationToken = uuid();
  const user = new User({ email, avatarURL, verificationToken });
  user.setPassword(password);
  await user.save();

  const msg = {
    to: email,
    from: 'rostyslavdubinin@gmail.com',
    subject: 'Registration confirm',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}">Click it to confirm a registration</a>`,
  };
  return sgMail.send(msg);

};

const updateToken = async (id, token) => {
  return User.updateOne({ _id:id },{ token });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
};