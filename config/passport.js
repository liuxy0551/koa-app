const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    return done(null, jwt_payload)
}));
}
