import express from 'express'
import passport from 'passport'
import { contact, getAdminStats, getAdminUsers, logout, myProfile } from '../controllers/user.js'
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"]
}))

router.get("/login", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL
}))

router.get("/me", isAuthenticated, myProfile)
router.post("/contact", contact)
router.delete("/logout", logout)

//admin middleware
router.get("/admin/users", isAuthenticated, authorizedAdmin, getAdminUsers)
router.get("/admin/stats", isAuthenticated, authorizedAdmin, getAdminStats)


export default router