import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const createTransaction = async (req, res) => {

    const transaction = req.body;

    if(!transaction.title || !transaction.amount){
        return res.status(400).json({
            status: "fail",
            message: "Please provide required fields!"
        })
    }

    try{
        const newTransaction = new Transaction(transaction);
        console.log(newTransaction);

        let transaction = await Transaction.create(newTransaction);

        let user = await User.findOneAndUpdate(req.user, {
            $push: { transactions: transaction._id }
        }, {new: true});

        console.log(user);

        res.status(201).json({
            user,
        })
        
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}