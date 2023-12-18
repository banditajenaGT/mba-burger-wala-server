import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { User } from '../models/User.js'

export const connectPassport = () => {
    passport.use(new Strategy({
        clientID: process.env.CLIEINT_ID,
        clientSecret: process.env.CLIEINT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async function (accessToken, refreshToken, profile, done) {

        //database
        const user = await User.findOne({
            googleId: profile.id
        })
        if (!user) {
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value
            })
            return done(null, newUser)
        } else {
            return done(null, user)
        }
    }
    )
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user)
    })
}