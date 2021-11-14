const Contacts = require('./schemas/contact');

const listContacts = async () => {
  const result = await Contacts.find();
  return result;
};

const getContactById = async id => {
  const result = await Contacts.findOne({_id: id})
  return result
};

const removeContact = async id => {
  const result = await Contacts.findByIdAndRemove({_id: id})
  return result
};

const addContact = async body => {
  const result = await Contacts.create(body)
  return result
};

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate({ _id: id }, {...body}, {new: true})
  return result
};

const updateStatusContact = async (id, body) => {
  const { favorite } = body
  const result = await Contacts.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
