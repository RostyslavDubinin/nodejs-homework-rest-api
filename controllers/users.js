const jwt = require('jsonwebtoken');
const {
  findByEmail,
  findById,
  create,
  updateToken,
} = require('../model/users');
const { HttpCode } = require('../helpers/constans');
require('dotenv').config();
const secret = process.env.SECRET;

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email already use',
      });
    }
    const newUser = await create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (!user || !user.verify || !user.comparePassword(password)) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong, or email is not verified',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, secret, { expiresIn: '2h' });
    await updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await updateToken(id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const currentUser = await findById(id);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  } catch (err) {
    next(err)
  }
};

module.exports = { signup, login, logout, currentUser };