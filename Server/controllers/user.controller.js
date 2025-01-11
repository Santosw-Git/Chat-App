import User from "../model/user.model.js";

const getUserForSiderBar = async (req,res)=>{
    const user_Id = req.user._id;

    let filteredUsers = await User.find({_id :{$ne:user_Id}});

    console.log("all users: " + filteredUsers);

    return res.status(200).json({Users: filteredUsers});
    
}

export {
    getUserForSiderBar,
}