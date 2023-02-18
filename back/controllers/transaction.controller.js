import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const getTransaction = async (req, res) => {
    const { id } = req.params;

    try{
        const transaction = await Transaction.findById(id);
        
        if(transaction === null){
            res.status(500).json({
                status: "fail",
                message: "Not exist this id(transaction)!"
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

        // let createdTransaction = await newTransaction.save().then(
        //     (res) => {
        //         User.findOneAndUpdate(req.user, {
        //             $push: { transactions: res._id }
        //         }, {new: true}),
        //         (err, updatedTransaction) => {
        //             if(err) console.log(err);
        //             console.log(updatedTransaction);
        //         }
        //     }
        // )
        // console.log("I'm in 34 line", createTransaction);
        
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
        if(transaction === null){
            res.status(500).json({
                status: "fail",
                message: "Not exist this id(transaction)!"
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
        );
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