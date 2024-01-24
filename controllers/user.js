import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import nodeMailer from "nodemailer";

export const myProfile = asyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const logout = asyncError(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
  });
  res.clearCookie("connect.sid", {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? false : "none",
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});

export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

export const getAdminStats = asyncError(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const orders = await Order.find({});

  const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.totalAmount;
  });

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipped: shippedOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
});

export const contact = asyncError(async (req, res, next) => {
  const { name, email, text } = req.body;

  const userMessage = `Hey !! I'm ${name}, \n ${text}`;

  const sendMail = async ({ userMessage, email }) => {
    const transport = nodeMailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
      service: process.env.SMPT_SERVICE,
    });
    await transport.sendMail({
      from: email,
      to: process.env.SMPT_USER,
      subject: "Contact Request",
      text: userMessage,
    });
  };

  await sendMail({ userMessage, email });

  res.status(200).json({ success: true, message: "Message sent successfully" });
});
