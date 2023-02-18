import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const getTransaction = async (req, res) => {
    const { id } = req.params;

    try{
        const transaction = await Transaction.findById(id);

        if(!transaction){
            res.status(404).json({
                status:"not found",
                message: "Not exist this transaction"
            })
        }

        res.status(200).json({
            status: "success",
            transaction
        })
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}

export const createTransaction = async (req, res) => {
    const userId = req.user;
    const transaction = req.body;
    // console.log(transaction);
    if(!transaction.title || !transaction.amount){
        return res.status(400).json({
            status: "fail",
            message: "Please provide required fields!"
        })
    }

    try{

        console.log(transaction);
        const newTransaction = new Transaction(transaction);
        console.log("I'm in 19 line", newTransaction);

        let createdTransaction = await Transaction.create(newTransaction);

        // const savedTransaction = await newTransaction.save();
        // const updatedUser = await User.findOneAndUpdate(
        //     req.user,
        //     { $push: { transactions: savedTransaction._id } },
        //     { new: true }).exec();

        // return res.status(201).json({
        //     updatedUser
        // });
        
        let user = await User.findOneAndUpdate(userId, {
            $push: { transactions: createdTransaction._id }
        }, {new: true});

        console.log(user);

        res.status(201).json({
            // user,
            createdTransaction
        })
        
        
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }
}

export const updateTransaction = async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    
    const transactionData = req.body;
    // console.log(transactionData);

    try{
        const transaction = await Transaction.findByIdAndUpdate({_id: id}, transactionData, {new: true});
        if(!transaction){ 
            res.status(404).json({
                status:"not found",
                message: "Not exist this transaction"
            })
        }

        
        // console.log(transaction);
        res.status(200).json({
            status: "Success",
            message: "Update transaction is successfull!",
            transaction
        })
    } catch (err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            err
        })
    }
}

export const deleteTransaction = async (req, res) => {
    const userId = req.user;
    const { id } = req.params;
    

    try{
        await Transaction.findByIdAndRemove(id).then(
            (res) => {
                User.findByIdAndUpdate(userId,
                    {$pull: {transactions: res.id}}, {new: true}, (err, reply) => {
                        if(err) console.log(err);
                        console.log(reply);
                    })
            }

        ).catch(err => {
            res.status(404).json({
                status:"fail",
                err: err.message
            })
        });
        res.status(200).json({
            status: "Success",
            message: "Transaction deleted successfully!"
        })
    } catch(err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}