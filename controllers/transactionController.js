const transactionModel = require('../models/transactionModel');
const axios = require('axios');

const KORA_API = process.env.KORA_API_SECRET

exports.initializePayment = async (req, res) => {
    try {
        const { amount, paymentMethod, userId, orderId } = req.body;

        if (!amount || !paymentMethod || !userId || !orderId ) {
            return res.status(400).json({
                message: "Amount, payment method, userId and orderId are required",
            });
        }

        const ref = `QuickChow-${Date.now()}-${Math.floor(Math.random()*1000)}`

        const paymentData = {
            amount,
            currency: "NGN",
            reference: ref,
            customer: {
              name: req.body.name,
              email: req.body.email
            },
          };

        const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', paymentData,{
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${KORA_API}`
            }
        });

        const transaction = new transactionModel({
            userId,
            orderId,
            amount,
            paymentMethod,
            korapayReference: ref,
            paymentStatus: "pending"
        });

        await transaction.save();

        res.status(201).json({
            message: "Payment initiallized Successfully",
            data: {
                reference: response?.data?.data?.reference,
                url: response?.data?.data?.checkout_url
            }
        });
        
    } catch (error) {
        console.log("Payment Initialization Error:", error.response?.data || error.message);

        res.status(500).json({
            message: error.message
        })
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.query;
        console.log("Ref: ", reference);

        const response = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            headers: {
                Authorization: `Bearer ${KORA_API}`,
            },
        });

        const transaction = await transactionModel.findOne({
            korapayReference: reference,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        if (response?.data?.data?.status === "success") {
            transaction.paymentStatus = "successful";
            
            if (transaction.orderId) {
                await orderModel.findByIdAndUpdate(transaction.orderId, { status: "paid" });
            }
        } else {
            transaction.paymentStatus = "failed";
        }

        await transaction.save();

        res.status(200).json({
            message: "Transaction verification completed",
            data: {
                paymentStatus: transaction.paymentStatus,
                reference: transaction.korapayReference,
            },
        });

    } catch (error) {
        console.error("Verify Payment Error:", error.response?.data || error.message);
        res.status(500).json({
            message: error.response?.data || error.message,
        });
    }
};
