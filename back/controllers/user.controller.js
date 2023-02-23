import User from "../models/user.model.js";

export const getMe = async (req, res) => {
    const id = req.user;

    try{
        let user = await User.findById(id).populate("transactions");

        res.status(200).json({
            status: "Success",
            user
        })
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            err
        })
    }
}

export const updateInformation = async (req, res) => {
    const id = req.user;
    const data = req.body;

    
    if(data.password){
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