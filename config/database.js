import mongoose from "mongoose";

export const connectdatabase=async()=>{
    const {connection}= await mongoose.connect(process.env.MONGO_URI)

    console.log(`Mongo DB connected to: ${connection.host}`)
}