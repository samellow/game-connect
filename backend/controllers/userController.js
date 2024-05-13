import User from "../models/userModel.js"


export const getUsersForSidebar =async(req,res)=>{
    try {
        const loggedInUserId =  req.user._id

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getGamers = async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users.map(user => ({id: user._id, username: user.username})))
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error fetching users"})
    }
}