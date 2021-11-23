const express = require('express');
const router = express.Router();
const { validateContact, validateBody, validateStatus, } = require('./validation');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router.get('/', guard, listContacts);

router.post('/', guard, validateContact, addContact);

router.get('/:id', guard, getContactById);

router.delete('/:id', guard, removeContact);

router.put('/:id', guard, validateBody, updateContact);

router.patch('/:id/favorite', guard, validateStatus, updateStatusContact);

module.exports = router;
