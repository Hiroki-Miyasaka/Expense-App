import User from "../models/user.model.js";

export const getMe = async (req, res) => {
    const id = req.user;
    console.log("get id");

    try{
        let user = await User.findById(id).populate("transaction");

        res.status(200).json({
            status: "Success",
            user
        })
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            error
        })
    }
}

export const updateInformation = async (req, res) => {
    const id = req.user;
    console.log("lin24 data", id);

    const data = req.body;
    console.log("lin27 data", data);
    
    if(data.email || data.password){
        res.status(400).json({
            status: "fail",
            message: "You can't update your email and password"
        })
    }

    try{
        let user = await User.findByIdAndUpdate({_id: id}, data, {new: true});

        res.status(200).json({
            status: "Success",
            message: "User information updated successfully!",
            user
        })
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }

}