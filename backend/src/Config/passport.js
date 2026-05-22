const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../Models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

passport.use(

    new GoogleStrategy({

        clientID: process.env.GOOGLE_CLIENT_ID,

        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        callbackURL: "/api/auth/google/callback"

    },

    async (accessToken, refreshToken, profile, done) => {

        try {
            let user = await User.findOne({
                email: profile.emails[0].value
            });

            if (!user) {

    const hashedPassword = await bcrypt.hash("google-oauth-user", 10);

    user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: hashedPassword,
        role: "CANDIDATE"
    });

}

            // create jwt token
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            return done(null, { user, token });

        } catch (error) {

            return done(error, null);

        }

    })

);