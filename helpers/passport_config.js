const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/Users');

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(
  new GoogleStrategy({
   clientID: '1054606897485-qgeolesvcs284viauiipkkcciem0ftl8.apps.googleusercontent.com',
   clientSecret: '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',
   callbackURL: "/google/callback", 
   proxy: true,
  },
    async function(req, accessToken, refreshToken, profile, done) {
      const useremail = profile.emails[0].value;
      try{
        const result = await UserModel.findOne({email: useremail});
        if(result) {
          return done(null, result);
        }
        else {
          return done(null, false, {message: 'This user is not authenticated! Try with another account'});
        }
      } 
      catch(e) {
       console.log(e.message); 
          return done(e);
      }
    }
  )
);