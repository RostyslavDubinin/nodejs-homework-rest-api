const User = require('./schemas/user');
const gravatar = require('gravatar');

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findById = async (id) => {
  return User.findOne({ _id:id })
};

const create = async ({ email, password }) => {
  const avatarURL = gravatar.url(email);
  const user = new User({ email, avatarURL });
  user.setPassword(password);
  return user.save();
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