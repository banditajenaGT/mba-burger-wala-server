import { Schema, model } from 'mongoose'

const schema = new Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        cty: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
    },
    orderItems: {
        cheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        vegCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        doubleCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
    },
    user: {
        // type: Schema.ObjectId,
        type: String,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    paymentInfo: {
        type: Schema.ObjectId,
        ref: "Payment"
    },
    paidAt:Date,
    itemsPrice:{
        type:Number,
        default:0
    },
    taxCharges:{
        type:Number,
        default:0
    },
    shippingCharges:{
        type:Number,
        default:0
    },
    totalAmount:{
        type:Number,
        default:0
    },
    orderStatus:{
        type:String,
        enum:["Preparing","Shipped","Delivered"],
        default:"Preparing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Order = model("Order", schema)