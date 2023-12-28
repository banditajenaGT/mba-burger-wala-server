import express from 'express'
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js'
import {
    getAdminOrders,
    getMyOrders,
    getOrderDetails,
    paymentVerification,
    placeOrderCod,
    placeOrderOnline,
    processOrder
} from '../controllers/order.js'

const router = express.Router()

router.route('/createordercod').post(isAuthenticated,placeOrderCod)
router.route('/createorderonline').post(isAuthenticated,placeOrderOnline)
router.route('/paymentverification').post(isAuthenticated,paymentVerification)

router.route('/myorders').get(isAuthenticated, getMyOrders)
router.route('/order/:id').get(isAuthenticated, getOrderDetails)

//add authorized admin middleware
router.route('/admin/orders').get(isAuthenticated, authorizedAdmin, getAdminOrders)
router.route('/admin/order/:id').get(isAuthenticated, authorizedAdmin, processOrder)

export default router