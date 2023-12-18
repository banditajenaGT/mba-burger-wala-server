import ErrorHandler from '../utils/ErrorHandler.js'

export const isAthenticated = (req, res, next) => {
    const token = req.cookies["connect.sid"]

    if(!token){
        return next(new ErrorHandler("Not Logged In",401))
    }
    next()
}

export const authorizedAdmin = (req, res, next) => {
    if(req.user.role!=="admin"){
        return next(new ErrorHandler("Only Admins Allowed",405))
    }
    next()
}