import express from 'express'
import { authorizedAdmin, isAthenticated } from '../middlewares/auth.js'
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

router.route('/createordercod').post(isAthenticated,placeOrderCod)
router.route('/createorderonline').post(isAthenticated,placeOrderOnline)
router.route('/paymentverification').post(isAthenticated,paymentVerification)

router.route('/myorders').get(isAthenticated, getMyOrders)
router.route('/order/:id').get(isAthenticated, getOrderDetails)

//add authorized admin middleware
router.route('/admin/orders').get(isAthenticated, authorizedAdmin, getAdminOrders)
router.route('/admin/order/:id').get(isAthenticated, authorizedAdmin, processOrder)

export default router