const Contacts = require('../model/contacts');
const mongoose = require('mongoose');
const { HttpCode } = require('../helpers/constans');

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'such id does not exist',
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.id, userId);
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'such id does not exist',
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.id, userId);
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
};

const updateContact = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'such id does not exist',
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
      userId
    );
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
};

const updateStatusContact = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'such id does not exist',
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateStatusContact(
      req.params.id,
      req.body,
      userId
    );
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};