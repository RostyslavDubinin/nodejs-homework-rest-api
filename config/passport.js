const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../model/users');
require('dotenv').config();
const secret = process.env.SECRET;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);

      if (!user) {
        return done(new Error('Not authorized'));
      }

      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
)