import express from "express";
import dotenv from 'dotenv'
import { connectdatabase } from "./config/database.js";
import { connectPassport } from './utils/Provider.js'
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import session from 'express-session'
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import Razorpay from "razorpay";
import cors from 'cors'

dotenv.config({ path: "./config/config.env" })

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

connectdatabase()
connectPassport()

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.enable("trust proxy")

//Middlewares
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none"
    }
}))
app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)

app.get('/', (req, res) => {
    res.send("<h1>Hey! Im Bandita<h1/>")
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`server is listening at http://localhost:${process.env.PORT}, IN ${process.env.NODE_ENV} MODE`)
})