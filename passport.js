// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;




// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(new SpotifyStrategy({
//   clientID: "6e6168bb4f424095b42f948f1e303b69",
//   clientSecret: "d0083b4ff5b743f5888468fe02c2ba9c",
//   callbackURL: "http://localhost:5000/auth/spotify/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }
// ));